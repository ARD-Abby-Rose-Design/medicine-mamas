class HorizontalScroller extends HTMLElement {
  constructor() {
    super();
    this.content = this.querySelector('[data-scroller-content]');
    this.previousButton = this.querySelector('[data-scroller-prev]');
    this.nextButton = this.querySelector('[data-scroller-next]');
    this.gap = 20;
    this.timeoutValue = 250;
    this.scrollStep = this.querySelector('.main-order__order-item').offsetWidth + this.gap;
    this.checkScrollButtons();
    this.previousButton.addEventListener('click', this.scrollBack.bind(this));
    this.nextButton.addEventListener('click', this.scrollForward.bind(this));
    this.content.addEventListener('scroll', this.checkScrollButtons.bind(this));
  }

  scrollBack() {
    this.content.scrollBy({
      left: -this.scrollStep,
      behavior: "smooth",
    });
    setTimeout(() => {
      this.checkScrollButtons();
    }, this.timeoutValue);
  }

  scrollForward() {
    this.content.scrollBy({
      left: this.scrollStep,
      behavior: "smooth",
    });
    setTimeout(() => {
      this.checkScrollButtons();
    }, this.timeoutValue);
  }


  checkScrollButtons() {
    if(this.content.scrollLeft <= 10) {
      this.previousButton.classList.add('disabled')
    } else {
      this.previousButton.classList.remove('disabled')
    }
    if(this.content.scrollLeft >= this.content.scrollWidth - this.content.clientWidth - 50) {
      this.nextButton.classList.add('disabled')
    } else {
      this.nextButton.classList.remove('disabled')
    }
  }

  
}

customElements.define('horizontal-scroller', HorizontalScroller);