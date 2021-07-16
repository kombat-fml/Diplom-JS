const checkInputs = () => {
  const inputs = document.querySelectorAll('.input'),
  buttonAction = document.querySelector('.button-ui_firm');
  if ([...inputs].every(input => input.value.trim() !== '')) {
    buttonAction.disabled = false;
  } else {
    buttonAction.disabled = true;
  }
}
export default checkInputs;