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

  statusMessage.style.cssText = 'font-size: 2rem;';

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    // const target = event.target;
    // проверка на валидность ***
    request(form);
  });

  const showModal = (title, msg = '') => {
    thankTitle.textContent = title;
    thankDescr.textContent = msg;
    openPopup(popupThank);
    console.log('show');
  };

  const hideModal = () => {
    setTimeout(() => {
      closePopup(popupThank);
    }, 3000);
    console.log('hide');
  };
};
export default sendForm;
