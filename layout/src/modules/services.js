const services = () => {
  const navListPopupRepair = document.querySelector('.nav-list-popup-repair'),
    contentTable = document.querySelector('.popup-repair-types-content-table'),
    popupSection = document.querySelector('.popup-dialog-repair-types');

  let repairTypes = new Set(),
    repairArr = [];

  fetch('../crm-backend/db.json')
    .then(response => {
      if (response.status !== 200) {
        throw new Error('status network not 200!');
      }
      return response.json();
    })
    .then(data => rendering(data))
    .catch((error) => console.error('Ошибка запроса: ', error));

  const changeTableTitle = (text) => {
    const tableTitle = document.getElementById('switch-inner');
    tableTitle.textContent = text;
  }

  const renderNavList = () => {
    [...repairTypes].forEach((item, index) => {
      const btn = document.createElement('button');
      btn.className = 'button_o popup-repair-types-nav__item';
      btn.textContent = item;
      if (index === 0) {
        btn.classList.add('active');
        changeTableTitle(item);
      }
      navListPopupRepair.append(btn);
      renderContentTable(repairArr.filter(repairArr => repairArr.type === item));
    })
    contentTable.children[0].classList.add('active');
  }

  const renderContentTable = (currArr) => {
    const table = document.createElement('table');
    table.classList.add('popup-repair-types-content-table__list');
    const tbody = document.createElement('tbody');

    currArr.forEach(({name, units, cost}, index) => {
      const tr = document.createElement('tr');
      tr.className = 'mobile-row showHide';
      tr.innerHTML =
      `
        <td class="repair-types-name">${name}</td>
        <td class="mobile-col-title tablet-hide desktop-hide">Ед.измерения</td>
        <td class="mobile-col-title tablet-hide desktop-hide">Цена за ед.</td>
        <td class="repair-types-value">${units}</sup></td>
        <td class="repair-types-value">${cost} руб.</td>
      `;
      tbody.append(tr);
    })
    table.append(tbody);
    contentTable.append(table);
  }

  const rendering = (data) => {
    repairArr = data;
    data.forEach(item => repairTypes.add(item.type));
    renderNavList();
    initTabs();
  }

  const initTabs = () => {
    const removeActiveClass = (parentEl) => {
      [...parentEl.children].forEach(item => item.classList.remove('active'));
    }

    const currentSlide = (slider) => {
      for (let i = 0; i < slider.children.length; i++) {
        if (slider.children[i].classList.contains('active')) return i;
      }
    }

    const changeSlide = (direction = 0) => {
      const currSlide = currentSlide(navListPopupRepair),
        countSlides = navListPopupRepair.children.length;

      removeActiveClass(navListPopupRepair);
      removeActiveClass(contentTable);
      switch (true) {
        case (direction === -1 && currSlide === 0): {
          navListPopupRepair.children[countSlides - 1].classList.add('active');
          changeTableTitle(navListPopupRepair.children[countSlides - 1].textContent);
          contentTable.children[countSlides - 1].classList.add('active');
          break;
        }
        case (direction === 1 && currSlide === countSlides - 1): {
          navListPopupRepair.children[0].classList.add('active');
          changeTableTitle(navListPopupRepair.children[0].textContent);
          contentTable.children[0].classList.add('active');
          break;
        }
        default: {
          navListPopupRepair.children[currSlide + direction].classList.add('active');
          changeTableTitle(navListPopupRepair.children[currSlide + direction].textContent);
          contentTable.children[currSlide + direction].classList.add('active');
        }
      }

    }

    popupSection.addEventListener('click', (event) => {
      const target = event.target;

      if (!target.matches('.active') && target.matches('.popup-repair-types-nav__item')) {
        removeActiveClass(navListPopupRepair);
        removeActiveClass(contentTable);
        target.classList.add('active');
        changeTableTitle(target.textContent);
        contentTable.children[currentSlide(navListPopupRepair)].classList.add('active')
      }

      if (target.closest('#nav-arrow-popup-repair_left')) changeSlide(-1);
      if (target.closest('#nav-arrow-popup-repair_right')) changeSlide(1);

    })
  }
}


export default services;