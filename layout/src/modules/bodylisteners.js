import { closeAllPopups, closePopup } from "./popups"

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
  })
}

export default bodyListeners;