import { closeAllPopups } from "./popups"

const bodyListeners = () => {
  document.body.addEventListener('keydown', event => {
    const key = event.key;
    if (key === 'Escape') {
      closeAllPopups();
    }
  })

  document.body.addEventListener('click', event => {
    const target = event.target;
    if (target.closest('.popup') && !target.closest('.popup-wrapper')) {
      closeAllPopups();
    };
  })
}

export default bodyListeners;