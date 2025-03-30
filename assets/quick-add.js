class QuickAddDrawer extends HTMLElement {
  constructor() {
    super();
    this.selectedVariantId = null;
    this.addEventListener('keyup', (evt) => {
      if (evt.code === 'Escape') {
        this.close();
      }
    });
    this.querySelector('#QuickAddDrawer-Overlay').addEventListener('click', () => {
      this.close();
    });
    this.querySelector('.drawer__close').addEventListener('click', () => {
      this.close();
    });
    this.openButtons = document.querySelectorAll('.quick-add__open');
    this.contentEl = this.querySelector('.quick-add__inner');

    this.openButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        const dataUrl = button.getAttribute('data-url');
        const productId = parseFloat(button.getAttribute('data-product-id'));
        this.renderContents(dataUrl, productId);
      });
    });

    document.addEventListener('product:::addedToCart', (event) => {
      this.close();
    });
  }

  open(triggeredBy) {
    if (triggeredBy) {
      this.setActiveElement(triggeredBy);
    }

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

  renderContents(url, id) {
    
    const selectedRadio = this.querySelector('input[type="radio"]:checked');
    if (selectedRadio) {
      this.selectedVariantId = selectedRadio.value;
    }

    fetch(url)
      .then((response) => response.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        this.contentEl.innerHTML = html;

        setTimeout(() => {
          this.open();

          if (this.selectedVariantId) {
            const radioToCheck = this.contentEl.querySelector(`input[type="radio"][value="${this.selectedVariantId}"]`);
            if (radioToCheck) {
              radioToCheck.checked = true;
            }
          }
        }, 50);
      })
      .catch((error) => {
        console.warn('Error fetching content:', error);
      });
  }

  setActiveElement(element) {
    this.activeElement = element;
  }
}

customElements.define('quick-add-drawer', QuickAddDrawer);

class QuickAddVariantPicker extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    
    const radios = this.querySelectorAll('input[type="radio"]');
    radios.forEach((radio) => {
      radio.addEventListener('change', (event) => {
        this.onVariantChange(event);
      });
    });
  }

  onVariantChange(event) {
    const selectedVariantId = event.target.value;
  
    const productHandle = this.getAttribute('data-product-handle');
    if (!productHandle) {
      console.warn('Product handle not found.');
      return;
    }
  
    const productVariantInput = document.querySelector('.product-variant-id');
    if (productVariantInput) {
      productVariantInput.value = selectedVariantId;
      
      const quickAddDrawer = document.querySelector('quick-add-drawer');
      if (quickAddDrawer) {
        const newUrl = `/products/${productHandle}?variant=${selectedVariantId}&view=quick-add`;
        
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