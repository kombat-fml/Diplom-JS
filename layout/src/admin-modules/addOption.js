const addOption = (value) => {
  const option = document.createElement('option'),
  select = document.getElementById('typeItem')
  option.value = value;
  option.textContent = value;
  select.append(option);
}

export default addOption;