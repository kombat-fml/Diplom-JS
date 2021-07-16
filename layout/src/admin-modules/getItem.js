import fillForm from "./fillForm";

const getItem = (id) => {
  fetch(`http://localhost:3000/api/items/${id}`)
    .then(response => {
      if (response.status !== 200) {
        throw new Error('status network not 200!');
      }
      return response.json();
    })
    .then(data => {
      fillForm(data);
    })
    .catch((error) => console.error('Ошибка запроса: ', error));
}

export default getItem;