export const addRow = ({id, type, name, units, cost}) => {
  const tbody = document.getElementById('tbody'),
    row = document.createElement('tr');
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

export const clearTbody = () => {
  const tbody = document.getElementById('tbody');
  tbody.textContent = '';
}