import { openPopup } from "./popups";

const portfolio = () => {
  const portfolioSection = document.querySelector('.portfolio-slider-wrap'),
    portfolioSlider = document.querySelector('.portfolio-slider-wrapper'),
    arrowLeft = document.getElementById('portfolio-arrow_left'),
    arrowRight = document.getElementById('portfolio-arrow_right');

  let step = 352,
    activeSlide = 0,
    maxSlides = 0;

  const removeActiveClass = (parentEl) => {
    [...parentEl.children].forEach(item => item.classList.remove('active'));
  }

  const activateArrows = () => {
    if (activeSlide === 0) {
      arrowLeft.classList.remove('active');
    } else {
      arrowLeft.classList.add('active');
    }

    if (activeSlide === maxSlides) {
      arrowRight.classList.remove('active');
    } else {
      arrowRight.classList.add('active');
    }
  }

  const changeSlide = (direction) => {
    const countSlides = portfolioSlider.children.length;
    activeSlide += direction;
    activateArrows();
    portfolioSlider.style.transform = `translateX(-${activeSlide * step}px)`
  }

  const culcMaxSlides = () => {
    maxSlides = Math.ceil((step * portfolioSlider.children.length - portfolioSlider.offsetWidth) / step);
    if (innerWidth > 900) maxSlides--;
  }

  const resize = () => {
    window.addEventListener('resize', () => {
      activeSlide = 0;
      changeSlide(0);
      culcMaxSlides();
    })
  }

  const currentSlide = (slider) => {
    for (let i = 0; i < slider.children.length; i++) {
      if (slider.children[i].classList.contains('active')) return i;
    }
  }

  const changeCounter = (slider) => {
    const sliderWrap = document.querySelector('.popup-portfolio-slider-wrap'),
      currSlide = currentSlide(slider),
      countSlides = slider.children.length,
      contentCurrent = sliderWrap.querySelector('.slider-counter-content__current'),
      contentTotal = sliderWrap.querySelector('.slider-counter-content__total');
    contentCurrent.textContent = currSlide + 1;
    contentTotal.textContent = countSlides;
  }

  portfolioSection.addEventListener('click', event => {
    const target = event.target;

    if (target.closest('.portfolio-slider__slide-frame')) {
      const modalSlider = document.querySelector('.popup-portfolio-slider'),
        textWrapper = document.querySelector('.popup-portfolio-text-wrapper'),
        id = target.closest('.portfolio-slider__slide-frame').dataset.index;
      removeActiveClass(modalSlider);
      removeActiveClass(textWrapper);
      modalSlider.children[id].classList.add('active');
      textWrapper.children[id].classList.add('active');
      changeCounter(modalSlider);
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