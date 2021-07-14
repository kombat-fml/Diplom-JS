import SliderCarousel from "./sliderCarousel";
import { openPopup } from "./popups";

const portfolio = () => {
  const portfolioSection = document.querySelector('.portfolio-slider-wrap'),
    portfolioSlider = document.querySelector('.portfolio-slider-wrapper'),
    arrowLeft = document.getElementById('portfolio-arrow_left'),
    arrowRight = document.getElementById('portfolio-arrow_right');

  let counter = 0,
    step = 352,
    currentSlide = 0,
    maxSlides = 0;

  const activateArrows = () => {
    if (currentSlide === 0) {
      arrowLeft.classList.remove('active');
    } else {
      arrowLeft.classList.add('active');
    }

    if (currentSlide === maxSlides) {
      arrowRight.classList.remove('active');
    } else {
      arrowRight.classList.add('active');
    }
  }

  const changeSlide = (direction) => {
    const countSlides = portfolioSlider.children.length;
    currentSlide += direction;
    activateArrows();
    portfolioSlider.style.transform = `translateX(-${currentSlide * step}px)`
  }

  const culcMaxSlides = () => {
    maxSlides = Math.ceil((step * portfolioSlider.children.length - portfolioSlider.offsetWidth) / step);
    if (innerWidth > 900) maxSlides--;
  }

  const resize = () => {
    window.addEventListener('resize', () => {
      currentSlide = 0;
      changeSlide(0);
      culcMaxSlides();
    })
  }

  portfolioSection.addEventListener('click', event => {
    const target = event.target;

    if (target.classList.contains('portfolio-slider__slide-frame')) {
      openPopup(document.querySelector('.popup-portfolio'));

    }

    if (target.closest('#portfolio-arrow_left')) changeSlide(-1);
    if (target.closest('#portfolio-arrow_right')) changeSlide(1);
  })
  culcMaxSlides();
  activateArrows();
  resize();
}

export default portfolio;