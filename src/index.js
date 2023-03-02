import './style.css';
import DataCollection from './modules/subClass.js';

const dataCollection = new DataCollection();
dataCollection.load();
dataCollection.displayToDoList();

const getInputValue = (id) => {
  const inputField = document.querySelector(id);
  const inputValue = inputField.value;
  inputField.value = '';
  return inputValue;
};

const enterBtn = document.querySelector('.enterBtn');
enterBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const inputValue = getInputValue('#inputField');
  dataCollection.setDataInLocal(inputValue);
  dataCollection.displayToDoList();
});

const clearBtn = document.querySelector('.clearCompleted');
clearBtn.addEventListener('click', () => {
  const checks = document.querySelectorAll('input[type=checkbox]');
  const updateItem = [];
  checks.forEach((checkbox, i) => {
    if (checkbox.checked) {
      dataCollection.data.forEach((item, index) => {
        item.index = index;
      });
      updateItem.push(i);
    }
  });
  const updateList = dataCollection.data.filter((item, i) => !updateItem.includes(i));
  updateList.forEach((item, index) => {
    item.index = index;
  });
  dataCollection.data = updateList;
  localStorage.setItem('toDoList', JSON.stringify(updateList));
  dataCollection.displayToDoList();
});

document.querySelector('.fa-refresh').addEventListener('click', () => {
  window.location.reload();
  document.querySelector('.fa-refresh').classList.add('refresh');
});
