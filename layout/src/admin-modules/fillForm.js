import checkInputs from "./checkInputs";

const fillForm = ({id, type, name, units, cost}) => {
  document.querySelector('.modal__header').dataset.id = id;
  document.getElementById('type').value = type;
  document.getElementById('name').value = name;
  document.getElementById('units').value = units;
  document.getElementById('cost').value = cost;
  checkInputs();
}

export default fillForm;