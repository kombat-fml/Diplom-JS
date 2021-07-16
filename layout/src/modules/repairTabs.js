const repairTabs = () => {
  const section = document.querySelector('.repair-types');

  const removeActiveClass = (parentEl) => {
    [...parentEl.children].forEach(item => item.classList.remove('active'));
  }

  const changeSlider = (id) => {
    const curentSlider = section.querySelector(`.types-repair${id}`);
    removeActiveClass(section.querySelector('.repair-types-slider'));
    curentSlider.classList.add('active');
    if (!curentSlider.querySelector(`.active`)) {
      changeSlide(curentSlider);
    }
    changeCounter(curentSlider);
  }

  const currentSlide = (slider) => {
    for (let i = 0; i < slider.children.length; i++) {
      if (slider.children[i].classList.contains('active')) return i;
    }
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

  const changeCounter = (slider) => {
    const currSlide = currentSlide(slider),
      countSlides = slider.children.length,
      contentCurrent = section.querySelector('.slider-counter-content__current'),
      contentTotal = section.querySelector('.slider-counter-content__total');
    contentCurrent.textContent = currSlide + 1;
    contentTotal.textContent = countSlides;
  }


  section.addEventListener('click', (event) => {
    const target = event.target;
    if (!target.matches('.active') && target.matches('.repair-types-nav__item')) {
      removeActiveClass(target.parentElement);
      target.classList.add('active');
      changeSlider(target.dataset.tab);
    }

    if (target.closest('#repair-types-arrow_left')) {
      changeSlide(section.querySelector('.types-repair.active'), -1);
      changeCounter(section.querySelector('.types-repair.active'));
    }
    if (target.closest('#repair-types-arrow_right')) {
      changeSlide(section.querySelector('.types-repair.active'), 1);
      changeCounter(section.querySelector('.types-repair.active'));
    }

    if (target.closest('#nav-arrow-repair-right_base')) {
      changeSlide(document.querySelector('.nav-list-repair'), 1);
      changeSlider(currentSlide(document.querySelector('.nav-list-repair'))+1);
    }
    if (target.closest('#nav-arrow-repair-left_base')) {
      changeSlide(document.querySelector('.nav-list-repair'), -1);
      changeSlider(currentSlide(document.querySelector('.nav-list-repair'))+1);
    }
  })

  changeSlider(1);
}

export default repairTabs;