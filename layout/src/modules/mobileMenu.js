import { scrollOff } from './popups'
const mobileMenu = () => {
  const menu = document.querySelector('.popup-menu'),
    menuIcon = document.querySelector('.menu__icon');

  menuIcon.addEventListener('click', () => {
    menu.classList.add('active');
    scrollOff();
  });
};

export default mobileMenu;
