import returnScrollWidth from './scrollWidth';

export const closeAllPopups = () => {
  const popup = document.querySelectorAll('.popup');
  popup.forEach(item => {
      item.classList.remove('active');
  })
  scrollOn();
}

export const openPopup = (popup) => {
  popup.classList.add('active');
  scrollOff();
}

export const closePopup = (popup) => {
  popup.classList.remove('active');
  scrollOn();
}

export const scrollOn = () => {
  document.body.style.overflowY = 'auto';
  document.body.style.paddingRight = '';
}

export const scrollOff = () => {
  document.body.style.overflowY = 'hidden';
  document.body.style.paddingRight = returnScrollWidth() + 'px';
}

