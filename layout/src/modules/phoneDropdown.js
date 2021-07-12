const phoneDropdown = () => {
  const button = document.querySelector('.header-contacts__arrow'),
    dropdown = document.querySelector('.header-contacts__phone-number-accord');

  button.addEventListener('click', () => {
    dropdown.classList.toggle('active');
    button.classList.toggle('active');
  })
}

export default phoneDropdown;