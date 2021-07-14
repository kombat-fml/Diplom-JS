const reviews = () => {
  const slide = document.querySelectorAll('.reviews-slider__slide'),
    sliderDots = document.querySelector('.slider-dots-reviews'),
    slider = document.querySelector('#reviews');

  let currentSlide = 0,
    interval;

  const prevSlide = (elem, index, strClass) => {
    elem[index].classList.remove(strClass);
  };
  const nextSlide = (elem, index, strClass) => {
    elem[index].classList.add(strClass);
  };

  const autoPlaySlider = () => {
    prevSlide(slide, currentSlide, 'reviews-slide-active');
    prevSlide([...sliderDots.children], currentSlide, 'dot_active');
    currentSlide++;
    if (currentSlide >= slide.length) currentSlide = 0;
    nextSlide(slide, currentSlide, 'reviews-slide-active');
    nextSlide([...sliderDots.children], currentSlide, 'dot_active');
  };

  const startSlider = (time = 3000) => {
    interval = setInterval(autoPlaySlider, time);
  };
  const stopSlider = () => {
    clearInterval(interval);
  };

  slider.addEventListener('click', (event) => {
    event.preventDefault();
    let target = event.target;

    if (!target.closest('.slider-arrow') && !target.closest('.dot')) {
      return;
    }
    prevSlide(slide, currentSlide, 'reviews-slide-active');
    prevSlide([...sliderDots.children], currentSlide, 'dot_active');

    if (target.closest('#reviews-arrow_right')) {
      currentSlide++;
    } else if (target.closest('#reviews-arrow_left')) {
      currentSlide--;
    } else if (target.closest('.dot')) {
      [...sliderDots.children].forEach((elem, index) => {
        if (elem === target) {
          currentSlide = index;
        }
      });
    }
    if (currentSlide >= slide.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slide.length - 1;
    nextSlide(slide, currentSlide, 'reviews-slide-active');
    nextSlide([...sliderDots.children], currentSlide, 'dot_active');
  });

  slider.addEventListener('mouseover', (event) => {
    if (event.target.matches('.slider-arrow, .dot')) {
      stopSlider();
    }
  });
  slider.addEventListener('mouseout', (event) => {
    if (event.target.matches('.slider-arrow, .dot')) {
      startSlider(4000);
    }
  });

  startSlider(4000);
}

export default reviews;