class QuickAddDrawer extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('keyup', (evt) => evt.code === 'Escape' && this.close());
    this.querySelector('#QuickAddDrawer-Overlay').addEventListener('click', this.close.bind(this));
    this.querySelector('.drawer__close').addEventListener('click', this.close.bind(this));
    this.openButtons = document.querySelectorAll('.quick-add__open');
    this.contentEl = this.querySelector('.quick-add__inner');
    this.openButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        this.renderContents(button.getAttribute('data-url'), parseFloat(button.getAttribute('data-product-id')));
        // this.open(button);
      });
    });
    document.addEventListener('product:::addedToCart', (event) => {
      console.log(event);
      this.close();
    });
  }

  open(triggeredBy) {
    if (triggeredBy) this.setActiveElement(triggeredBy);
    // here the animation doesn't seem to always get triggered. A timeout seem to help
    setTimeout(() => {
      this.classList.add('animate', 'active');
    });

    this.addEventListener(
      'transitionend',
      () => {
        const containerToTrapFocusOn = this.classList.contains('is-empty')
          ? this.querySelector('.drawer__inner-empty')
          : document.getElementById('QuickAddDrawer');
        const focusElement = this.querySelector('.drawer__inner') || this.querySelector('.drawer__close');
        trapFocus(containerToTrapFocusOn, focusElement);
      },
      { once: true }
    );

    document.body.classList.add('overflow-hidden');
  }

  close() {
    this.classList.remove('active');
    removeTrapFocus(this.activeElement);
    document.body.classList.remove('overflow-hidden');
  }

  renderContents(url,id) {
    fetch(url)
      .then((response) => response.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        this.contentEl.innerHTML = html;
        
        // const rechargeConfig = {
        //   productId: id, // Required
        //   injectionParent: 'form[action*="cart/add"]', // The node that will have the widget injected in
        //   injectionMethod: 'prepend', // How will the widget be injected 
        //   injectFn: (node, target) => {}, // Runs a custom injection function 
        //   selectors: {
        //     price: ['.my-price-selector'], // the selectors that will be updated based on subscription
        //     variant: ['.variant-selector'] // The variants to watch for to update the subscription prices
        //   }
        // };
        // window.ReChargeWidget.createWidget(rechargeConfig);
        // this.querySelector('recharge-widget').initializeWidget();
        

        setTimeout(() => {
          this.open();
        }, 50);
      })
      .catch((error) => {
        console.warn(error);
      });


    
  } 

  setActiveElement(element) {
    this.activeElement = element;
  }
}

customElements.define('quick-add-drawer', QuickAddDrawer);