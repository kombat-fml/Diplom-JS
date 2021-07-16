import { openPopup } from "./popups";

const documents = () => {
  const section = document.querySelector('.transparency'),
    slider = document.querySelector('.transparency-slider');

  const removeActiveClass = (parentEl) => {
    [...parentEl.children].forEach(item => item.classList.remove('active'));
  }

  const currentSlide = (slider) => {
    for (let i = 0; i < slider.children.length; i++) {
      if (slider.children[i].classList.contains('active')) return i;
    }
  }

  const changeCounter = (slider) => {
    const sliderWrap = document.querySelector('.popup-transparency-slider-wrap'),
      currSlide = currentSlide(slider),
      countSlides = slider.children.length,
      contentCurrent = sliderWrap.querySelector('.slider-counter-content__current'),
      contentTotal = sliderWrap.querySelector('.slider-counter-content__total');
    contentCurrent.textContent = currSlide + 1;
    contentTotal.textContent = countSlides;
  }

  const changeSlide = (slider, direction = 0) => {
    if (direction === 0) {
      slider.children[0].classList.add('active');
    }
    const currSlide = currentSlide(slider),
      countSlides = slider.children.length;

    removeActiveClass(slider);

    switch (true) {
      case (direction === -1 && currSlide === 0): {
        slider.children[countSlides - 1].classList.add('active');
        break;
      }
      case (direction === 1 && currSlide === countSlides - 1): {
        slider.children[0].classList.add('active');
        break;
      }
      default: {
        slider.children[currSlide + direction].classList.add('active');
      }
    }
  }
  changeSlide(slider);

  section.addEventListener('click', event => {
    const target = event.target;

    if (target.closest('.transparency-item__img')) {
      const modalSlider = document.querySelector('.popup-transparency-slider'),
        id = target.closest('.transparency-item').dataset.id;
      removeActiveClass(modalSlider);
      modalSlider.children[id].classList.add('active');
      changeCounter(modalSlider);
      openPopup(document.querySelector('.popup-transparency'));
    }

    if (target.closest('#transparency-arrow_left')) changeSlide(slider, -1);
    if (target.closest('#transparency-arrow_right')) changeSlide(slider, 1);
  })

}

export default documents;