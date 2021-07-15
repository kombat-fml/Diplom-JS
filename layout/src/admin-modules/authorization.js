import testData from './testData';

const authorization = () => {
  const form = document.querySelector('form'),
    inputName = document.getElementById('name'),
    inputPassword = document.getElementById('password'),
    submitBtn = document.getElementById('submit');

  const setCockie = () => {
    document.cookie = `login=${inputName.value}`;
    document.cookie = `password=${inputPassword.value}`;
  }

  const showError = (element, text) => {
    element.nextElementSibling.textContent = text;
  }

  const checkData = (value, name) => {
    if (name === "login" && value === testData[name]) return true;
    if (name === "password" && value === testData[name]) return true;
  }

  const checkInputs = () => {
    if (inputName.value && inputPassword.value) {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  }
  const redirect = () => {
    console.log(window);
    window.location = window.location.href + "table.html";
  }

  const checkCookie = () => {
    const cookieData = document.cookie.split('; ');
    if (checkData(cookieData[0].split('=')[1], cookieData[0].split('=')[0]) && checkData(cookieData[1].split('=')[1], cookieData[1].split('=')[0]) ) {
      redirect();
    }
  }
  checkCookie();
  checkInputs();

  form.addEventListener('input', checkInputs)

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let flag = 0;

    if (!checkData(inputName.value, 'login')) {
      showError(inputName, 'Не верное имя');
    } else {
      showError(inputName, '');
      flag = 1;
    }
    if (!checkData(inputPassword.value, 'password')) {
      showError(inputPassword, 'Не верный пароль');
      flag = 0;
    } else {
      showError(inputPassword, '');
      flag = flag && 1;
    }

    if (flag) {
      setCockie();
      redirect();
    } else {
      form.reset();
    }
  })

}

export default authorization;