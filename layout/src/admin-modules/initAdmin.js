import { openPopup } from "../modules/popups";
import addOption from "./addOption";
import changeTitleForm from "./changeTitleForm";
import checkInputs from "./checkInputs";
import clearAndClose from "./clearAndClose";
import getItem from "./getItem";
import formBody from "./formBody";
import rendering from "./rendering";
import request from "./request";
import { addRow, clearTbody } from "./tbody";


const initAdmin = () => {
  const select = document.getElementById('typeItem');

  let repairTypes = new Set(),
    repairArr = [];

  const addSet = (elem) => {
    repairTypes.add(elem);
  }

  const fillSet = () => {
    repairTypes.clear();
    repairArr.forEach(item => addSet(item.type));
  }

  const fillOptions = () => {
    select.textContent = '';
    addOption('Все услуги');
    [...repairTypes].forEach(item => {
      addOption(item);
    })
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

  const removeActiveClass = (parentEl) => {
    [...parentEl.children].forEach(item => item.classList.remove('active'));
  }
  const activeDefaultSort = (parentEl) => {
    [...parentEl.children].forEach(item => item.dataset.sort = "ASC");
  }

  const logout = () => {
    const cookieData = document.cookie.split('; ');
    document.cookie = `${cookieData[0]}; max-age=-1`;
    document.cookie = `${cookieData[1]}; max-age=-1`;
    window.location = window.location.href.replace(/(?!\/)\w+\.\w+/, '');
  }

  const sortFunction = (key, order = "ASC") => {
    return function iinerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = (typeof a[key] === 'string')
        ? a[key].toLowerCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toLowerCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return ((order === 'DESC') ? (comparison * -1) : comparison);
    }
  }


  const sortTable = (th) => {
    const currentSort = th.dataset.sort;
    const activeSort = th.classList.contains('active') ? true : false;
    removeActiveClass(document.querySelector('thead').children[0]);
    activeDefaultSort(document.querySelector('thead').children[0]);
    if (activeSort) {
      th.dataset.sort = currentSort === "ASC" ? "DESC" : "ASC";
    }
    th.classList.add('active');
    repairArr.sort(sortFunction(th.dataset.key, th.dataset.sort));
    filterData();
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
        getItem(target.closest('.table__row').querySelector('.table__id').textContent);
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

      if (target.classList.contains('exit')) logout();

      if (target.closest('thead')) {
        if (target.closest('.table-th') && !target.closest('.th-cost') && !target.closest('.th-handler')) {
          sortTable(target.closest('.table-th'));
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