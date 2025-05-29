class RechargeWidget extends HTMLElement {
  constructor() {
      super();
      this.product;
      this.productID;
      this.session;
      this.variantID;
      this.widget;
      this.widgetTemplate;
      this.nextShipment;
      this.dropdownSelect = this.querySelector('dropdown-select');
      this.ulList = this.dropdownSelect.querySelector('ul[role="listbox"]');
  }

  connectedCallback() {
      this.initializeWidget();
  }

  async initializeWidget () {
      await this.login();

      const section = this.closest('[data-section]');
      const sectionId = section?.getAttribute('data-section');
      const scriptId = `ProductJson-shopify-${sectionId}`;
      const jsonScript = document.getElementById(scriptId);

      if (jsonScript && jsonScript.textContent?.trim()) {
        try {
          this.shopifyVariants = JSON.parse(jsonScript.textContent);
        } catch (err) {
          this.shopifyVariants = [];
        }
      } else {
        this.shopifyVariants = [];
      }

      this.productID = this.querySelector('.widget')?.getAttribute('data-product-id');
      this.variantID = Number(this.querySelector('.widget')?.getAttribute('data-variant-id'));

      this.widget = await recharge.cdn.getCDNWidgetSettings(this.productID);

      this.product = await recharge.cdn.getCDNProduct(this.productID);

      this.setVariables(document.querySelector(':root'));

      this.widgetTemplate = document.querySelector('.widget__template-radio');

      switch(this.widget.widget_template_type) {
          case 'radio_group':
              this.widgetTemplate.classList.add('radio-group');
              break;
          case 'button_group':
              this.widgetTemplate.classList.add('button-group');
              break;
          case 'checkbox':
              this.widgetTemplate = document.querySelector('.widget__template-checkbox');
              break;
      }

      this.renderWidget();

      if (this.session) {
          this.getNextShipment();
      }
  }

  async login() {
      this.session = await recharge.auth.loginShopifyAppProxy();
  }

  async getNextShipment() {
      const subscriptionsObj = await recharge.subscription.listSubscriptions(this.session);
      const subscriptions = subscriptionsObj.subscriptions;

      let nextShipmentDate = null,
          sub = null;

      subscriptions.forEach((subscription) => {
        if (subscription.next_charge_scheduled_at) {
          const shipmentDate = new Date(subscription.next_charge_scheduled_at);
          if (!nextShipmentDate || shipmentDate < nextShipmentDate) {
              nextShipmentDate = shipmentDate;
              sub = subscription;
          }
        }
      });

      if (nextShipmentDate != null && sub != null) {
          this.renderNextShipment(sub);
      }
  }

  async renderNextShipment(sub) {
      const nextShipmentEl = document.createElement('div');
      const nextDate = window.moment(sub.next_charge_scheduled_at).format('MMMM Do, YYYY');
      nextShipmentEl.classList.add('next-shipment');
      nextShipmentEl.innerHTML += `
          <button class="next-shipment__add button button--primary" data-subscription-id="${sub.id}">Add to next shipment</button>
          <span class="next-shipment__title">Your next shipment is scheduled for ${nextDate}.</span>
      `;

      document.querySelector('.product-form').appendChild(nextShipmentEl);
      document.querySelector('.next-shipment__add').addEventListener('click', this.addToNextShipment.bind(this, sub));

      const nextShipmentObj = await recharge.subscription
  }

  async addToNextShipment(sub) {
      const variantId = document.querySelector('.product__info-container').getAttribute('data-product-variant'),
          productId = document.querySelector('.product__info-container').getAttribute('data-product-id'),
          quantity = sub.quantity + 1;

      if (variantId === sub.external_variant_id.ecommerce && productId === sub.external_product_id.ecommerce) {
          await recharge.subscription.updateSubscription(this.session, sub.id, { quantity: quantity });
      } else {
          await recharge.subscription.createSubscription(this.session, {
              address_id: sub.address_id,
              charge_interval_frequency: sub.charge_interval_frequency,
              next_charge_scheduled_at: sub.next_charge_scheduled_at,
              order_interval_frequency: sub.order_interval_frequency,
              order_interval_unit: sub.order_interval_unit,
              quantity: 1,
              external_variant_id: {
                  ecommerce: variantId
              },
              external_product_id: {
                  ecommerce: productId
              }
          });
      }

      window.location = '/account'
  }

  async renderWidget() {

      let widgetTemplate = this.widgetTemplate,
          variantID = this.variantID,
          widget = this.widget,
          prod = this.product,
          sellingVariant = this.product.variants.find(obj => obj.id === variantID),
          sellingPlan = '',
          priceEl,
          price = sellingVariant.prices.unit_price,
          compareAtPrice = sellingVariant.prices.compare_at_price,
          subscribePrice = sellingVariant.prices.discounted_price;

      const shopifyVariant = this.shopifyVariants.find(v => String(v.id) === String(variantID));
      const hasSellingPlans = shopifyVariant?.selling_plan_allocations?.length > 0;

      if (!hasSellingPlans) {
        document.querySelector('.widget').classList.add('visually-hidden');
      }

      if (this.widget.select_subscription_first) {
          sellingPlan = sellingVariant.selling_plan_allocations[0].selling_plan_id;
          price = subscribePrice;
      }

      if (compareAtPrice) {
          priceEl = document.querySelector('.price__sale .price-item.price-item--sale');
      } else {
          priceEl = document.querySelector('.price__regular .price-item.price-item--regular')
      }

      let sellingPlanInput = document.createElement('input');
      sellingPlanInput.classList.add('selling-plan-input')
      sellingPlanInput.name = 'selling_plan';
      sellingPlanInput.type = 'hidden';
      sellingPlanInput.value = sellingPlan;
      document.querySelector('.product-form form').appendChild(sellingPlanInput)

      if (widget.widget_template_type != 'checkbox') {
          if (!prod.is_subscription_only) {
              switch(widget.select_subscription_first) {
                  case true:
                      this.renderSubscriptionRadio(sellingVariant, widgetTemplate);
                      this.renderOneTimeRadio(sellingVariant, widgetTemplate);
                      break;
                  case false:
                      this.renderOneTimeRadio(sellingVariant, widgetTemplate);
                      this.renderSubscriptionRadio(sellingVariant, widgetTemplate);
                      break;
              }
          } else {
              this.renderSubscriptionRadio(sellingVariant, widgetTemplate);
          }
          document.querySelector('input[name="id"]').addEventListener('change', this.updateRadioWidget.bind(this, widgetTemplate));
      } else {
          this.renderSubscriptionCheckbox(sellingVariant, widgetTemplate);
          document.querySelector('.product-variant-id').addEventListener('change', this.updateCheckboxWidget.bind(this, widgetTemplate));
      }

      this.updatePrice(price, subscribePrice, compareAtPrice);

      if (widget.show_subscription_details) {
          this.renderDetails();
      }

      document.querySelector('.widget').classList.remove('hidden');
  }

  getSellingVariant(variantID) {
      let sellingVariant

      this.product.variants.forEach(function (variant) {
          if (variant.id === variantID) {
              sellingVariant = variant
          }
      })

      return sellingVariant
  }

  setVariables(root) {
      root.style.setProperty('--rc-text-color', this.widget.font_color);
      root.style.setProperty('--rc-active-color', this.widget.active_color);
      root.style.setProperty('--rc-background-color', this.widget.background_color);
      root.style.setProperty('--rc-tooltip-background', this.widget.popup_background_color);
      root.style.setProperty('--rc-tooltip-text', this.widget.popup_text_color);
      root.style.setProperty('--rc-tooltip-icon-color', this.widget.widget_icon);
      root.style.setProperty('--rc-widget-link-color', this.widget.popup_link_color);
  }

  renderSubscriptionRadio(sellingVariant) {
      let widget = this.widget,
          prod = this.product,
          widgetTemplate = this.widgetTemplate,
          subscribeText = widget.subscribe_without_discount_message,
          price = sellingVariant.prices.unit_price,
          discountedPrice = sellingVariant.prices.discounted_price,
          compareAtPrice = sellingVariant.prices.compare_at_price,
          discount = (price > discountedPrice),
          subscribePrice = price,
          _this = this;

      if (discount) {
          subscribePrice = discountedPrice;
          subscribeText = widget.subscribe_message;
          widgetTemplate.querySelector('.subscription-radio .option-discount').innerText = prod.selling_plan_groups[0].selling_plans[0].price_adjustments_value + '%'
      }

      widgetTemplate.querySelector('.subscription-radio .option-text').innerHTML = subscribeText;
      widgetTemplate.querySelector('.subscription-radio .option-price').innerText = '$' + subscribePrice;

      const compareAtEl = widgetTemplate.querySelector('.subscription-radio .option-compare-price');
      if (compareAtPrice && compareAtPrice > subscribePrice) {
          compareAtEl.innerText = '$' + compareAtPrice;
          compareAtEl.classList.remove('hidden');
      } else {
          compareAtEl.classList.add('hidden');
      }

      if (widget.widget_template_type === 'radio_group' || widget.widget_template_type === 'button_group') {
          widgetTemplate.appendChild(widgetTemplate.querySelector('.widget__selling-plans'));
          widgetTemplate.querySelector('.widget__selling-plans-dropdown__label').classList.remove('visually-hidden')
      }

      // if the widget is set to select the subscription radio by default, add the active class and check the radio button
      if (widget.select_subscription_first) {
          widgetTemplate.querySelector('.subscription-radio').classList.add('widget-option--active');
          widgetTemplate.querySelector('.subscription-radio .widget__radio-input').checked = true;

          if (widget.widget_template_type === 'radio_group' || widget.widget_template_type === 'button_group') {
              widgetTemplate.querySelector('.widget__selling-plans').style.display = 'block';
          }

          document.querySelector('.widget').setAttribute('data-selected', 'subscription')
          document.querySelector('.price-item.price-item--regular').innerText = '$' + subscribePrice;
      }

      // loop through the variant selling plan allocations selling plans and add them to the dropdown
      sellingVariant.selling_plan_allocations.forEach(function (item,index) {
          let option = document.createElement('option'),
              planGroup = prod.selling_plan_groups.find(obj => obj.selling_plan_group_id == item.selling_plan_group_id),
              plan = planGroup.selling_plans.find(obj => obj.selling_plan_id == item.selling_plan_id),
              discount = plan.price_adjustments_value + '%';

          // attach necessary data to the option
          option.value = plan.selling_plan_id;
          option.innerText = plan.selling_plan_name;
          option.setAttribute('data-discount', discount);
          option.setAttribute('data-price', item.discounted_price);

          // append the option to the dropdown
          _this.dropdownSelect.querySelector('select').appendChild(option);

          // Custom ones

          let li = document.createElement('li');
          li.setAttribute('data-value', plan.selling_plan_id);
          li.innerText = plan.selling_plan_name;
          li.setAttribute("data-index", index);
          let isSelected = index === 0 ? true : false;
          li.setAttribute('aria-selected', isSelected);
          li.setAttribute('role', 'option');

          if(index === 0) {

          }

          _this.ulList.appendChild(li);

      });

      _this.dropdownSelect.options = this.querySelectorAll('[role="option"]');
      _this.dropdownSelect.setupListeners();

      if (widget.widget_template_type === 'radio_group') {
          widgetTemplate.appendChild(widgetTemplate.querySelector('.widget__selling-plans'));
      }



      _this.dropdownSelect.querySelector('select').addEventListener('change', function () {
        const isSubscriptionSelected = document.querySelector('.widget').getAttribute('data-selected') === 'subscription';
        if (isSubscriptionSelected) {
          document.querySelector('.product-form form .selling-plan-input').value = this.value;
        }
      })

      widgetTemplate.querySelector('.subscription-radio .widget__radio-input').addEventListener('change', this.handleSubscriptionChange.bind(this))

      if (this.product.selling_plan_groups[0].selling_plans.length > 1) {
          widgetTemplate.querySelector('.widget__selling-plans').classList.remove('hidden');
      }

      widgetTemplate.classList.remove('hidden');
  }

  handleSubscriptionChange(ev) {
      if (ev.target.checked) {
          let widgetTemplate = this.widgetTemplate,
              sellingVariant = this.getSellingVariant(Number(document.querySelector('.product-variant-id').value)),
              price = sellingVariant.prices.unit_price,
              compareAtPrice = sellingVariant.prices.compare_at_price,
              subscribePrice = sellingVariant.prices.discounted_price,
              sellingPlan,
              sellingPlanInput = document.querySelector('.product-form form .selling-plan-input');

          if (this.widget.select_subscription_first) {
              sellingPlan = sellingVariant.selling_plan_allocations[0].selling_plan_id;
              price = sellingVariant.prices.discounted_price
          }

          widgetTemplate.querySelector('.widget__radio.widget-option--active').classList.remove('widget-option--active');
          widgetTemplate.querySelector('.widget__radio.subscription-radio').classList.add('widget-option--active');
          sellingPlanInput.value = widgetTemplate.querySelector('.dropdown-select select').value;

          document.querySelector('.widget').setAttribute('data-selected', 'subscription')

          this.updatePrice(price, subscribePrice, compareAtPrice);

          if(this.widget.widget_template_type === 'radio_group' || this.widget.widget_template_type === 'button_group') {
              widgetTemplate.querySelector('.widget__selling-plans').style.display = 'block';
          }
      }
  }

  renderOneTimeRadio(sellingVariant, widgetTemplate) {
      let widget = this.widget,
          price = sellingVariant.prices.unit_price,
          oneTimeText = widget.onetime_message;

      widgetTemplate.querySelector('.one-time-radio .option-text').innerHTML = oneTimeText;
      const compareAtEl = widgetTemplate.querySelector('.one-time-radio .option-compare-price');
      if (sellingVariant.prices.compare_at_price && sellingVariant.prices.compare_at_price > price) {
          compareAtEl.innerText = '$' + sellingVariant.prices.compare_at_price;
          compareAtEl.classList.remove('hidden');
      } else {
          compareAtEl.classList.add('hidden');
      }
      widgetTemplate.querySelector('.one-time-radio .option-price').innerText = '$' + price;

      if (!widget.select_subscription_first) {
          widgetTemplate.querySelector('.one-time-radio').classList.add('widget-option--active');
          widgetTemplate.querySelector('.one-time-radio .widget__radio-input').checked = true;
          document.querySelector('.widget').setAttribute('data-selected', 'one-time');
      }

      widgetTemplate.querySelector('.one-time-radio .widget__radio-input').addEventListener('change', this.handleOneTimeChange.bind(this))
  }

  handleOneTimeChange(ev) {
      if (ev.target.checked) {
          let widget = this.widget,
              widgetTemplate = this.widgetTemplate,
              sellingVariant = this.getSellingVariant(Number(document.querySelector('.product-variant-id').value)),
              price = sellingVariant.prices.unit_price,
              compareAtPrice = sellingVariant.prices.compare_at_price,
              sellingPlanInput = document.querySelector('.product-form form .selling-plan-input');

          sellingPlanInput.value = '';
          document.querySelector('.widget').setAttribute('data-selected', 'one-time')
          widgetTemplate.querySelector('.widget__radio.widget-option--active').classList.remove('widget-option--active');
          widgetTemplate.querySelector('.widget__radio.one-time-radio').classList.add('widget-option--active');

          this.updatePrice(price, null, compareAtPrice);

          if(widget.widget_template_type === 'radio_group' || widget.widget_template_type === 'button_group') {
              widgetTemplate.querySelector('.widget__selling-plans').classList.add('hidden');
          }
      }
  }

  updateRadioWidget() {
      let prod = this.product,
          variantID = Number(document.querySelector('.product-variant-id').value),
          sellingVariant = this.getSellingVariant(variantID),
          priceContainer = document.querySelector('.price'),
          price = sellingVariant.prices.unit_price,
          subscribePrice = sellingVariant.prices.discounted_price,
          compareAtPrice = sellingVariant.prices.compare_at_price,
          widgetTemplate = this.widgetTemplate,
          subCompareAtEl = widgetTemplate.querySelector('.subscription-radio .option-compare-price'),
          subscriptionRadio = widgetTemplate.querySelector('.subscription-radio .widget__radio-input'),
          oneTimeRadio = widgetTemplate.querySelector('.one-time-radio .widget__radio-input'),
          sellingPlanInput = document.querySelector('.product-form form .selling-plan-input'),
          sellingPlanSelect = this.querySelector('.selling-plan-group__select');

        const shopifyVariant = this.shopifyVariants.find(v => v.id === variantID);
        const hasSellingPlans = shopifyVariant?.selling_plan_allocations?.length > 0;

        if (!hasSellingPlans) {
            document.querySelector('.widget').classList.add('visually-hidden');
            document.querySelector('.product-form form .selling-plan-input').value = '';
            return;
        } else {
            document.querySelector('.widget').classList.remove('visually-hidden');
        }

        

      if (priceContainer) {
        priceContainer.classList.add('recharge-price-modifier');
      }

      sellingPlanSelect.innerHTML = ''

      sellingVariant.selling_plan_allocations.forEach(function (item, i) {
          let option = document.createElement('option'),
              planGroup =  prod.selling_plan_groups.find((obj) => obj.selling_plan_group_id == item.selling_plan_group_id),
              plan = planGroup.selling_plans.find((obj) => obj.selling_plan_id == item.selling_plan_id),
              discount = plan.price_adjustments_value + '%';

          if (i === 0) {
              subscribePrice = item.discounted_price;
              widgetTemplate.querySelector('.subscription-radio .option-price').innerHTML = '$' + subscribePrice;
          }

          option.value = plan.selling_plan_id;
          option.innerText = plan.selling_plan_name;
          option.setAttribute('data-discount', discount);
          option.setAttribute('data-price', subscribePrice);

          sellingPlanSelect.appendChild(option);
      })

      if (!prod.is_subscription_only) {
          widgetTemplate.querySelector('.one-time-radio .option-price').innerHTML = '$' + sellingVariant.prices.unit_price;
          switch (document.querySelector('.widget').getAttribute('data-selected')) {
              case 'subscription':
                  sellingPlanInput.value = sellingPlanSelect.value;
                  break;
              case 'one-time':
                  sellingPlanInput.value = '';
                  break;
          }
      } else {
          sellingPlanInput.value = sellingPlanSelect.value;
      }

      subscriptionRadio.removeEventListener('change', this.handleSubscriptionChange.bind(this))
      subscriptionRadio.addEventListener('change', this.handleSubscriptionChange.bind(this))

      if (!prod.is_subscription_only) {
          oneTimeRadio.removeEventListener('change', this.handleOneTimeChange.bind(this))
          oneTimeRadio.addEventListener('change', this.handleOneTimeChange.bind(this))
      }

      this.updatePrice(price, subscribePrice, compareAtPrice);

        if (sellingVariant.prices.compare_at_price && sellingVariant.prices.compare_at_price > sellingVariant.prices.discounted_price) {
        subCompareAtEl.innerText = '$' + sellingVariant.prices.compare_at_price;
        subCompareAtEl.classList.remove('hidden');
        } else {
        subCompareAtEl.classList.add('hidden');
        }

  }

  updatePrice(price, subscribePrice, compareAtPrice) {
    const selected = document.querySelector('.widget').getAttribute('data-selected');
    const addButtonPriceEl = document.querySelector('.product-form__submit--price');

    let newPrice;

    if (selected === 'one-time') {
      newPrice = price;
    } else if (selected === 'subscription') {
      newPrice = subscribePrice;
    }

    if (selected === 'one-time' && compareAtPrice && compareAtPrice > price) {
      addButtonPriceEl.innerHTML = `<span>$${newPrice}&nbsp;</span><span><s>$${compareAtPrice}</s></span>`;
    } else if (selected === 'subscription' && compareAtPrice && compareAtPrice > subscribePrice) {
      addButtonPriceEl.innerHTML = `<span>$${newPrice}&nbsp;</span><span><s>$${compareAtPrice}</s></span>`;
    }  else  {
      addButtonPriceEl.innerHTML = `$${newPrice}`;
    }
    
  }

  renderDetails() {
      if (this.widget.show_subscription_details) {
          let learnMore = document.querySelector('.widget .learn-more');

          document.querySelector('.widget__subscription-details__text').innerText = this.widget.subscription_details_verbiage;
          document.querySelector('.how-it-works__title').innerHTML = this.widget.how_it_works;

          if (this.widget.show_learnmore) {
              learnMore.classList.remove('hidden');
              learnMore.href = this.widget.learnmore_url;
              learnMore.innerText = this.widget.learnmore_verbiage;
          }

          document.querySelector('.widget__subscription-details').classList.remove('hidden');
          document.querySelector('.widget__tooltip-footer').classList.remove('hidden');
      }
  }
}
customElements.define('recharge-widget', RechargeWidget);