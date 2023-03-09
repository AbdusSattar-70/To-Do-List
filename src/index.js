import './style.css';
import Data from './modules/class.js';

const data = new Data();
data.retrieveFromLocal();
data.pushData();
data.displayOnUI();

const clearBtn = document.querySelector('.clearCompleted');
clearBtn.addEventListener('click', () => {
  const checks = document.querySelectorAll('.checkbox');
  const updateItem = [];
  checks.forEach((checkbox, i) => {
    if (checkbox.checked) {
      data.data.forEach((item, index) => {
        item.index = index;
      });
      updateItem.push(i);
    }
  });
  const updateList = data.data.filter((item, i) => !updateItem.includes(i));
  updateList.forEach((item, index) => {
    item.index = index;
  });
  /* update data array when any item delete */
  data.data = updateList;
  localStorage.setItem('list', JSON.stringify(updateList));
  data.displayOnUI();
});

document.querySelector('.fa-refresh').addEventListener('click', () => {
  window.location.reload();
  document.querySelector('.fa-refresh').classList.add('refresh');
});
