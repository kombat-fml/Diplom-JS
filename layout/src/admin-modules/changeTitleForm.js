const changeTitleForm = (type) => {
  const title = document.querySelector('.modal__header');
  title.dataset.type = type;
  if (type === 'add') {
    title.textContent = "Добавление новой услуги";
  } else if (type === 'edit') {
    title.textContent = "Изменение услуги";
  }
}

export default changeTitleForm;