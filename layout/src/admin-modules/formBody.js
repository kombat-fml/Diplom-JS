const formBody = () => {
  const body = {};
  body.type = document.getElementById('type').value || '';
  body.name = document.getElementById('name').value || '';
  body.units = document.getElementById('units').value || '';
  body.cost = document.getElementById('cost').value || '';
  return body;
}

export default formBody;