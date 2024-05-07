(function() {
  const buttons = document.querySelectorAll('.featured-collections__button');
  const sliders =  document.querySelectorAll('.featured-collections__slider');
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      sliders.forEach((slider, sliderIndex) => {
        if (sliderIndex === index) {
          slider.style.display = 'block';
          const mySwiper = slider.querySelector('.swiper');
          if (mySwiper) {
            mySwiper.swiper.update();
            mySwiper.swiper.attachEvents();
            mySwiper.swiper.updateSize();
            mySwiper.swiper.updateSlides();
          }
          // window.matchHeights();
        } else {
          slider.style.display = 'none';
        }
      });
      buttons.forEach((button, buttonIndex) => {
        if (buttonIndex === index) {
          button.classList.add('is-active');
        } else {
          button.classList.remove('is-active');
        }
      });
    });
  });
})();