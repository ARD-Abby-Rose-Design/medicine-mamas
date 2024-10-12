class QuickAddDrawer extends HTMLElement {
  constructor() {
    super();
    this.selectedVariantId = null;
    console.log("QuickAddDrawer constructor called.");
    this.addEventListener('keyup', (evt) => {
      if (evt.code === 'Escape') {
        console.log('Escape key pressed, closing QuickAddDrawer.');
        this.close();
      }
    });
    this.querySelector('#QuickAddDrawer-Overlay').addEventListener('click', () => {
      console.log('Overlay clicked, closing QuickAddDrawer.');
      this.close();
    });
    this.querySelector('.drawer__close').addEventListener('click', () => {
      console.log('Close button clicked, closing QuickAddDrawer.');
      this.close();
    });
    this.openButtons = document.querySelectorAll('.quick-add__open');
    this.contentEl = this.querySelector('.quick-add__inner');

    this.openButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        const dataUrl = button.getAttribute('data-url');
        const productId = parseFloat(button.getAttribute('data-product-id'));
        console.log(`Opening QuickAddDrawer for product ID: ${productId}, URL: ${dataUrl}`);
        this.renderContents(dataUrl, productId);
      });
    });

    document.addEventListener('product:::addedToCart', (event) => {
      console.log('Product added to cart event triggered:', event);
      this.close();
    });
  }

  open(triggeredBy) {
    if (triggeredBy) {
      console.log('Triggered by:', triggeredBy);
      this.setActiveElement(triggeredBy);
    }

    setTimeout(() => {
      console.log('Opening QuickAddDrawer with animation.');
      this.classList.add('animate', 'active');
    });

    this.addEventListener(
      'transitionend',
      () => {
        const containerToTrapFocusOn = this.classList.contains('is-empty')
          ? this.querySelector('.drawer__inner-empty')
          : document.getElementById('QuickAddDrawer');
        const focusElement = this.querySelector('.drawer__inner') || this.querySelector('.drawer__close');
        console.log('Transition ended, trapping focus.');
        trapFocus(containerToTrapFocusOn, focusElement);
      },
      { once: true }
    );

    document.body.classList.add('overflow-hidden');
  }

  close() {
    console.log('Closing QuickAddDrawer.');
    this.classList.remove('active');
    removeTrapFocus(this.activeElement);
    document.body.classList.remove('overflow-hidden');
  }

  renderContents(url, id) {
    console.log(`Fetching content for URL: ${url}, Product ID: ${id}`);
    
    const selectedRadio = this.querySelector('input[type="radio"]:checked');
    if (selectedRadio) {
      this.selectedVariantId = selectedRadio.value;
      console.log(`Storing selected variant ID: ${this.selectedVariantId}`);
    }

    fetch(url)
      .then((response) => response.text())
      .then((html) => {
        console.log('Fetched HTML content:', html);
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        this.contentEl.innerHTML = html;

        setTimeout(() => {
          console.log('Setting up drawer content and opening it.');
          this.open();

          if (this.selectedVariantId) {
            const radioToCheck = this.contentEl.querySelector(`input[type="radio"][value="${this.selectedVariantId}"]`);
            if (radioToCheck) {
              radioToCheck.checked = true;
              console.log(`Re-checked variant ID: ${this.selectedVariantId}`);
            }
          }
        }, 50);
      })
      .catch((error) => {
        console.warn('Error fetching content:', error);
      });
  }

  setActiveElement(element) {
    console.log('Setting active element:', element);
    this.activeElement = element;
  }
}

customElements.define('quick-add-drawer', QuickAddDrawer);

class QuickAddVariantPicker extends HTMLElement {
  constructor() {
    super();
    console.log('QuickAddVariantPicker initialized');
  }

  connectedCallback() {
    console.log('QuickAddVariantPicker added to the DOM');
    
    const radios = this.querySelectorAll('input[type="radio"]');
    radios.forEach((radio) => {
      radio.addEventListener('change', (event) => {
        this.onVariantChange(event);
      });
    });
  }

  onVariantChange(event) {
    const selectedVariantId = event.target.value;
    console.log(`Selected variant ID: ${selectedVariantId}`);
  
    const productHandle = this.getAttribute('data-product-handle');
    if (!productHandle) {
      console.warn('Product handle not found.');
      return;
    }
  
    const productVariantInput = document.querySelector('.product-variant-id');
    if (productVariantInput) {
      productVariantInput.value = selectedVariantId;
      console.log(`Updated product-variant-id input value to: ${selectedVariantId}`);
      
      const quickAddDrawer = document.querySelector('quick-add-drawer');
      if (quickAddDrawer) {
        const newUrl = `/products/${productHandle}?variant=${selectedVariantId}&view=quick-add`;
        console.log(`Fetching new content for variant ${selectedVariantId} with URL: ${newUrl}`);
        
        quickAddDrawer.renderContents(newUrl, selectedVariantId);
      } else {
        console.warn('QuickAddDrawer not found.');
      }
    } else {
      console.warn('product-variant-id input not found.');
    }
  }

  disconnectedCallback() {
    console.log('QuickAddVariantPicker removed from the DOM');
  }
}

customElements.define('quick-add-variant-picker', QuickAddVariantPicker);