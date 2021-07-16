import { closePopup } from "../modules/popups";
import checkInputs from "./checkInputs";

const clearAndClose = () => {
  const inputs = document.querySelectorAll('.input');
  inputs.forEach(input => input.value = '');
  document.querySelector('.modal__header').dataset.id = '';
  checkInputs();
  closePopup(document.querySelector('.modal__overlay'))
}

export default clearAndClose;