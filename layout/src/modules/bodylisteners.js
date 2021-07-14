import { closeAllPopups, closePopup, openPopup } from "./popups";

const bodyListeners = () => {
  document.body.addEventListener('keydown', event => {
    const key = event.key;
    if (key === 'Escape') {
      closeAllPopups();
    }
  })

  document.body.addEventListener('click', event => {
    const target = event.target;
    if (target.closest('.popup') && !target.closest('.popup-wrapper')) closePopup(target.closest('.popup'));

    if (target.closest('.menu-link')) closePopup(target.closest('.popup'));

    if (target.closest('.close')) closePopup(target.closest('.popup'));

    if (target.closest('.all-services')) {
      event.preventDefault();
      closeAllPopups();
      openPopup(document.querySelector('.popup-repair-types'));
    }

    if (target.closest('.menu__icon')) openPopup(document.querySelector('.popup-menu'));

    if (target.matches('.link-privacy')) openPopup(document.querySelector('.popup-privacy'));

    if (target.matches('.button_wide')) openPopup(document.querySelector('.popup-consultation'));

  })
}

export default bodyListeners;