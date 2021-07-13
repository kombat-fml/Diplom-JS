import SliderCarousel from "./sliderCarousel";

const showPrompt = (popup, target) => {
  const heightToTop = target.getBoundingClientRect().top - 10,
    heightPopup = popup.offsetHeight;

  if (heightToTop < heightPopup ) {
    popup.style.bottom = `-${heightPopup + 10}px`;
    popup.classList.add('popup-bottom');
  } else {
    popup.classList.remove('popup-bottom');
    popup.style = '';
  }

  popup.closest('.row').style.zIndex = '19';
  popup.classList.add('active');
  popup.parentElement.classList.add('active');
}

const hidePrompt = (popup) => {
  popup.closest('.row').style.zIndex = '';
  popup.classList.remove('active');
  popup.parentElement.classList.remove('active');
}

const prompts = () => {
  const formulaItemIcon = document.querySelectorAll('.formula-item__icon');

  formulaItemIcon.forEach(item => {
    item.addEventListener('mouseover', function () {
      showPrompt(this.querySelector('.formula-item-popup'), this)
    });
    item.addEventListener('mouseout', function () {
      hidePrompt(this.querySelector('.formula-item-popup'))
    });
  })

  const promptSlider = new SliderCarousel({
    main: '.formula-slider-wrap',
    wrap: '.formula-slider',
    slidesToShow: 3,
    infinity: true,
    cloneSlides: true,
    cloneClass: 'formula-slider__slide-clone',
    activeClass: 'formula-slider__slide-active',
    prev: '#formula-arrow_left',
    next: '#formula-arrow_right',
    responsive: [{
      breakpoint: 1024,
      slidesToShow: 3
    },
    {
      breakpoint: 768,
      slidesToShow: 1
    }]
  });
  promptSlider.init();
}

export default prompts;
