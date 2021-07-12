import { closeMenu, scrollOff } from './popups'
const mobileMenu = () => {
  const menu = document.querySelector('.popup-menu'),
    menuIcon = document.querySelector('.menu__icon'),
    closeMenuBtn = document.querySelector('.close-menu');

  menuIcon.addEventListener('click', () => {
    menu.classList.add('active');
    scrollOff();
  });
  closeMenuBtn.addEventListener('click', closeMenu);
};

export default mobileMenu;
