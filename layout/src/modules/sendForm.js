import { closePopup, openPopup } from './popups';

const sendForm = (formId) => {
  const popupThank = document.querySelector('.popup-thank'),
    thankTitle = document.querySelector('.popup-thank__title'),
    thankDescr = document.querySelector('.popup-thank__descr');

  const form = document.getElementById(formId);
  const statusMessage = document.createElement('div');

  const postData = (data) => {
    return fetch('server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  };

  const request = (form) => {
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    form.appendChild(statusMessage);
    postData(data)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('status network not 200!');
        }
        showModal('Спасибо за обращение!', 'Ожидайте звонка нашего специалиста. Будем рады помочь Вам!');
        form.reset();
        hideModal();
      })
      .catch((error) => {
        showModal('Ошибка отправки сообщения');
        console.error(error);
        hideModal();
      });
  };
  const checkPhone = (input) => {
    if (/^\+?[78]([-( )\d]){10,}$/.test(input.value)) {
      input.style.border = "none";
      return true;
    } else {
      input.style.border = "2px solid red";
      return false;
    }
  }
  const checkName = (input) => {
    if (/^\S{2,}$/gi.test(input.value)) {
      input.style.border = "none";
      return true;
    } else {
      input.style.border = "2px solid red";
      return false;
    }
  }
  const checkCheckBox = (input) => {
    if (input.checked) {
      input.style.border = "none";
      return true;
    } else {
      input.style.border = "2px solid red";
      return false;
    }
  }

  const validateInputs = (form) => {
    const inputs = [...form.elements].filter(item => item.tagName.toLowerCase() !== 'button' && item.type !== 'button');
    let valid = false;
    inputs.forEach(input => {
      input.value = input.value.trim();
      if (input.name === 'phone') valid = checkPhone(input);
      if (input.name === 'name') valid = checkName(input) && valid;
      if (input.getAttribute('type') === 'checkbox') valid = checkCheckBox(input) && valid;
    })
    return valid;
  }

  statusMessage.style.cssText = 'font-size: 2rem;';

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (validateInputs(form)) {
      request(form);
    }
  });

  form.addEventListener('blur', () => {
  });

  const showModal = (title, msg = '') => {
    thankTitle.textContent = title;
    thankDescr.textContent = msg;
    openPopup(popupThank);
  };

  const hideModal = () => {
    setTimeout(() => {
      closePopup(popupThank);
    }, 3000);
  };
};
export default sendForm;
