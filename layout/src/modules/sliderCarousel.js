class SliderCarousel {
  constructor({ main, addDefaultStyles = true, mainClass = 'glo-slider', wrap, wrapClass = 'glo-slider__wrap', itemClass = 'glo-slider__item', next, prev, infinity = false, position = 0, slidesToShow = 3, cloneSlides = false, cloneClass = 'glo-slider__item-cloned', activeClass = 'glo-slider__item-active', responsive = [] }) {
    if (!main || !wrap) {
      console.warn('slider-carousel: Необходимо 2 свойства, "main" и "wrap"!!!');
    }
    this.main = document.querySelector(main);
    this.wrap = document.querySelector(wrap);
    this.slides = document.querySelector(wrap).children;
    this.next = document.querySelector(next);
    this.prev = document.querySelector(prev);
    this.slidesToShow = slidesToShow;
    this.options = {
      position,
      infinity,
      mainClass,
      wrapClass,
      itemClass,
      cloneSlides,
      cloneClass,
      activeClass,
      addDefaultStyles,
      widthSlide: Math.floor(100 / this.slidesToShow),
    };
    this.responsive = responsive;
    this.currentCountSlides = this.slides.length;
  }

  init() {
    this.addGloClass();
    this.addStyle();
    if (this.options.infinity && this.options.cloneSlides) this.addCloneSlides();
    if (this.prev && this.next) {
      this.controlSlider();
    } else {
      this.addArrow();
      this.controlSlider();
    }
    this.changeACtiveSlide();
    if (this.responsive) {
      this.responseInit();
    }
  }

  addGloClass() {
    this.main.classList.add(this.options.mainClass);
    this.wrap.classList.add(this.options.wrapClass);
    for (const item of this.slides) {
      item.classList.add(this.options.itemClass);
    }
  }

  addCloneSlides() {
    const firstSlide = this.slides[0].cloneNode(true),
      lastSlide = this.slides[this.slides.length - 1].cloneNode(true);

    firstSlide.classList.add(this.options.cloneClass);
    lastSlide.classList.add(this.options.cloneClass);
    this.wrap.insertAdjacentElement('beforeend', firstSlide);
    this.wrap.insertAdjacentElement('afterbegin', lastSlide);
  }

  changeACtiveSlide() {
    for (let i = 0; i < this.slides.length; i++) {
      if (i !== this.options.position + 1) {
        this.slides[i].classList.remove(this.options.activeClass);
      } else {
        this.slides[i].classList.add(this.options.activeClass);
      }
    };
  }

  addStyle() {
    if (this.options.addDefaultStyles) {
      let style = document.getElementById(`${this.options.mainClass}-styles`);
      if (!style) {
        style = document.createElement('style');
        style.id = `${this.options.mainClass}-styles`;
      }
      style.textContent = `
        .${this.options.mainClass} {
          overflow: hidden;
        }
        .${this.options.wrapClass} {
          display: flex;
          align-items: center;
          transition: transform 0.5s;
          will-change: transform;
        }
        .${this.options.itemClass} {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 ${this.options.widthSlide}%;
          margin: 0;
        }
      `;

      document.head.appendChild(style);
    }
  }
  controlSlider() {
    this.prev.addEventListener('click', this.prevSlider.bind(this));
    this.next.addEventListener('click', this.nextSlider.bind(this));
  }

  prevSlider() {
    if (this.options.infinity || this.options.position > 0) {
      --this.options.position;
      if (this.options.position < 0) {
        this.options.position = this.currentCountSlides - this.slidesToShow;
      }
      this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
    }
    this.changeACtiveSlide();
  }

  nextSlider() {
    if (this.options.infinity || this.options.position < this.slides.length - this.slidesToShow) {
      ++this.options.position;
      if (this.options.position > this.currentCountSlides - this.slidesToShow) {
        this.options.position = 0;
      }
      this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
    }
    this.changeACtiveSlide();
  }

  addArrow() {
    this.prev = document.createElement('button');
    this.next = document.createElement('button');

    this.prev.className = 'glo-slider__prev';
    this.next.className = 'glo-slider__next';

    this.main.appendChild(this.prev);
    this.main.appendChild(this.next);

    const style = document.createElement('style');
    style.textContent = `
      .glo-slider__prev,
      .glo-slider__next {
        margin: 0 10px;
        border: 20px solid transparent;
        background: transparent;
      }
      .glo-slider__next {
        border-left-color: #19d5fe;
      }
      .glo-slider__prev {
        border-right-color: #19d5fe;
      }
      .glo-slider__prev:hover,
      .glo-slider__next:hover,
      .glo-slider__prev:focus,
      .glo-slider__next:focus {
        background: transparent;
        outline: none
      }
    `;
    document.head.appendChild(style);
  }

  responseInit() {
    const slidesToShowDefault = this.slidesToShow;
    const allResponse = this.responsive.map((item) => item.breakpoint);
    const maxResponse = Math.max(...allResponse);

    const checkResponse = () => {
      const widthWindow = document.documentElement.clientWidth;
      if (widthWindow < maxResponse) {
        for (let i = 0; i < allResponse.length; i++) {
          if (widthWindow < allResponse[i]) {
            this.slidesToShow = this.responsive[i].slidesToShow;
            this.options.widthSlide = Math.floor(100 / this.slidesToShow);
            this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
            this.addStyle();
            if (this.responsive[i].slidesToShow === 1) {
              this.currentCountSlides = this.slides.length - 2;
            } else {
              this.currentCountSlides = this.slides.length;
            }
          }
        }
      } else {
        this.slidesToShow = slidesToShowDefault;
        this.options.widthSlide = Math.floor(100 / this.slidesToShow);
        this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
        this.addStyle();
      }
      this.changeACtiveSlide();

    };

    checkResponse();

    window.addEventListener('resize', checkResponse);
  }
}

export default SliderCarousel;
