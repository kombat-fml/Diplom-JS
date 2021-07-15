const initAdmin = () => {
  const tbody = document.getElementById('tbody'),
    select = document.getElementById('typeItem');

  let repairTypes = new Set(),
    repairArr = [];

  const request = (url, method, body) => {
    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  }

  const rendering = (data) => {
    data.forEach(item => {
      repairTypes.add(item.type);
      addRow(item);
    });
  }

  const addOption = (value) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    select.append(option);
  }


  const fillOptions = () => {
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

  const addListeners = () => {
    document.body.addEventListener('click', (event) => {
      const target = event.target;
      // console.log(target);
    })

    select.addEventListener('change', filterData);
  }

  addOption('Все услуги');


  getAllServices();
  addListeners();



}

export default initAdmin;