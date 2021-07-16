import { openPopup, closeAllPopups, closePopup } from "../modules/popups";

const initAdmin = () => {
  const tbody = document.getElementById('tbody'),
    select = document.getElementById('typeItem'),
    buttonAction = document.querySelector('.button-ui_firm');

  let repairTypes = new Set(),
    repairArr = [];

  const checkInputs = () => {
    const inputs = document.querySelectorAll('.input');
    if ([...inputs].every(input => input.value.trim() !== '')) {
      buttonAction.disabled = false;
    } else {
      buttonAction.disabled = true;
    }
  }

  const request = (url, method, body) => {
    return fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  }

  const addSet = (elem) => {
    repairTypes.add(elem);
  }

  const fillSet = () => {
    repairTypes.clear();
    repairArr.forEach(item => addSet(item.type));
  }

  const rendering = (data) => {
    data.forEach(item => addRow(item));
  }

  const addOption = (value) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    select.append(option);
  }


  const fillOptions = () => {
    select.textContent = '';
    addOption('Все услуги');
    [...repairTypes].forEach(item => {
      addOption(item);
    })
  }

  const addRow = ({id, type, name, units, cost}) => {
    const row = document.createElement('tr');
    row.classList.add('table__row');
    row.innerHTML =
    `
      <td class="table__id table__cell">${id}</td>
      <td class="table-type table__cell">${type}</td>
      <td class="table-name table__cell">${name}</td>
      <td class="table-units table__cell">${units}</td>
      <td class="table-cost table__cell">${cost}</td>
      <td>
        <div class="table__actions table__cell">
          <button class="button action-change"><span class="svg_ui"><svg class="action-icon_change"><use xlink:href="./img/sprite.svg#change"></use></svg></span><span>Изменить</span>
          </button>
          <button class="button action-remove"><span class="svg_ui"><svg class="action-icon_remove"><use xlink:href="./img/sprite.svg#remove"></use></svg></span><span>Удалить</span>
          </button>
        </div>
      </td>
    `;
    tbody.append(row);
  }

  const clearTbody = () => {
    tbody.textContent = '';
  }

  const getAllServices = () => {
    fetch('http://localhost:3000/api/items')
      .then(response => {
        if (response.status !== 200) {
          throw new Error('status network not 200!');
        }
        return response.json();
      })
      .then(data => {
        repairArr = data;
        clearTbody();
        rendering(data);
        fillSet();
        fillOptions();
      })
      .catch((error) => console.error('Ошибка запроса: ', error));
  };

  const filterData = () => {
    clearTbody();
    if (select.value === 'Все услуги') {
      rendering(repairArr);
    } else {
      rendering(repairArr.filter(item => item.type === select.value));
    }
  }

  const clearAndClose = () => {
    const inputs = document.querySelectorAll('.input');
    inputs.forEach(input => input.value = '');
    document.querySelector('.modal__header').dataset.id = '';
    checkInputs();
    closePopup(document.querySelector('.modal__overlay'))
  }

  const changeTitleForm = (type) => {
    const title = document.querySelector('.modal__header');
    title.dataset.type = type;
    if (type === 'add') {
      title.textContent = "Добавление новой услуги";
    } else if (type === 'edit') {
      title.textContent = "Изменение услуги";
    }
  }

  const fillForm = (elem) => {
    document.querySelector('.modal__header').dataset.id = elem.querySelector('.table__id').textContent;
    document.getElementById('type').value = elem.querySelector('.table-type').textContent;
    document.getElementById('name').value = elem.querySelector('.table-name').textContent;
    document.getElementById('units').value = elem.querySelector('.table-units').textContent;
    document.getElementById('cost').value = elem.querySelector('.table-cost').textContent;
    checkInputs();
  }

  const processingData = (data) => {
    repairArr.push(data);
    const selectedFilter = select.value;
    addSet(data.type);
    fillOptions();
    select.value = selectedFilter;
    if (selectedFilter === data.type) addRow(data);
  }

  const changeRow = ({id, type, name, units, cost}) => {
    const currItem = repairArr[repairArr.findIndex(item => item.id === id)];
    const selectedFilter = select.value;
    currItem.type = type;
    currItem.name = name;
    currItem.units = units;
    currItem.cost = cost;
    fillSet();
    fillOptions();
    if (!repairTypes.has(selectedFilter)) {
      select.value = 'Все услуги';
    } else {
      select.value = selectedFilter;
    }
  }

  const formBody = () => {
    const body = {};
    body.type = document.getElementById('type').value || '';
    body.name = document.getElementById('name').value || '';
    body.units = document.getElementById('units').value || '';
    body.cost = document.getElementById('cost').value || '';
    return body;
  }

  const addNewItem = () => {
    request('http://localhost:3000/api/items', 'POST', formBody())
      .then(response => {
        if (response.status !== 201) {
          throw new Error('status network not 201!');
        }
        return response.json();
      })
      .then(data => {
        processingData(data);
        clearAndClose();
      })
      .catch((error) => console.error('Ошибка запроса: ', error));
  }

  const editItem = () => {
    const id = document.querySelector('.modal__header').dataset.id;
    request(`http://localhost:3000/api/items/${id}`, 'PATCH', formBody())
      .then(response => {
        if (response.status !== 200) {
          throw new Error('status network not 200!');
        }
        return response.json();
      })
      .then(data => {
        changeRow(data);
        filterData();
        clearAndClose();
      })
      .catch((error) => console.error('Ошибка запроса: ', error));;
  }

  const buildAfterDelete = (id) => {
    const selectedFilter = select.value;
    repairArr.splice(repairArr.findIndex(item => item.id === id), 1);
    fillSet();
    fillOptions();
    if (!repairTypes.has(selectedFilter)) {
      select.value = 'Все услуги';
      filterData();
    } else {
      select.value = selectedFilter;
    }
  }

  const deleteItem = (id) => {
    fetch(`http://localhost:3000/api/items/${id}`, {
        method: 'DELETE'
      }).then(response => {
        if (response.status !== 200) {
          throw new Error('status network not 200!');
        }
        return response.json();
      })
      .then(() => {
        buildAfterDelete(id);
      })
      .catch((error) => console.error('Ошибка запроса: ', error));
  }

  const addListeners = () => {

    document.querySelector('form').addEventListener('input', checkInputs);
    document.getElementById('cost').addEventListener('input', function () {
      this.value = this.value.replace(/[^\d]*/g, '');
    })

    document.body.addEventListener('keydown', event => {
      if (event.key === 'Escape') clearAndClose();
    })

    document.body.addEventListener('click', (event) => {
      const target = event.target;

      if ((target.closest('.modal__overlay') && !target.closest('.modal')) || target.closest('.button__close')){
        clearAndClose();
      }

      if (target.closest('.btn-addItem')) {
        openPopup(document.getElementById('modal'));
        changeTitleForm('add');
      }


      if (target.closest('.action-change')) {
        openPopup(document.getElementById('modal'));
        changeTitleForm('edit');
        fillForm(target.closest('.table__row'));
      }

      if (target.closest('.action-remove')) {
        deleteItem(target.closest('.table__row').children[0].textContent);
        target.closest('.table__row').remove();
      }

      if (target.closest('form')) {
        event.preventDefault();
        if (target.closest('.cancel-button')) {
          clearAndClose();
        }
        if (target.closest('.button-ui_firm')) {
          if (document.querySelector('.modal__header').dataset.type === 'add') {
            addNewItem();
          }
          if (document.querySelector('.modal__header').dataset.type === 'edit') {
            editItem();
          }
        }
      }
    })

    select.addEventListener('change', filterData);
  }

  getAllServices();
  addListeners();
  checkInputs();
}

export default initAdmin;