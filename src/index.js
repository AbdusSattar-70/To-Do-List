import './style.css';
import Main from './mainClass.js';

class DataCollection {
  constructor() {
    this.data = [];
  }

  getNextIndex = () => {
    let maxIndex = 0;
    this.data.forEach((toDoList) => {
      if (toDoList.index > maxIndex) {
        maxIndex = toDoList.index;
      }
    });
    return maxIndex + 1;
  }

     setDataInLocal = (inputValue) => {
       const completed = false;
       const index = this.getNextIndex();
       const task = inputValue;
       const info = new Main(task, index, completed);
       this.data.push(info);
       this.save();
     };

       displayToDoList = () => {
         let items = '';
         this.data.forEach((toDoList) => {
           items += `
       <div class="textareaContainer">
          <input type="checkbox" class="checkbox" name="completed" />
          <textarea disabled>${toDoList.task}</textarea>
          <i class="fa fa-ellipsis-v editBtn" ></i>
          <div class="controller">
          <i class="fa fa-save saveBtn"></i>
          <i class="fa fa-trash deleteBtn"></i>
          </div>
      </div>
       <hr>
      `;
         });
         document.querySelector('.displayListCont').innerHTML = items;
         this.DeleteListeners();
         this.EditListeners();
         this.SaveListeners();
         this.checkBox();
       };

        updateCompletedStatus = (index, completed) => {
          this.data[index].completed = completed;
          this.save();
        }

checkBox = () => {
  const checks = document.querySelectorAll('input[type=checkbox]');
  const inputs = document.querySelectorAll('.textareaContainer textarea');
  checks.forEach((ck, i) => {
    ck.addEventListener('change', () => {
      if (checks[i].checked) {
        inputs[i].style.textDecoration = 'line-through';
        inputs[i].style.color = 'grey';
        this.updateCompletedStatus(i, true);
      } else {
        inputs[i].style.textDecoration = 'none';
        inputs[i].style.color = 'black';
        this.updateCompletedStatus(i, false);
      }
    });
  });
}

 EditListeners=() => {
   const editBtn = document.querySelectorAll('.editBtn');
   const updateController = document.querySelectorAll('.controller');
   const inputs = document.querySelectorAll('.textareaContainer textarea');
   editBtn.forEach((eb, i) => {
     eb.addEventListener('click', () => {
       updateController[i].style.display = 'flex';
       editBtn[i].style.display = 'none';
       inputs[i].disabled = false;
     });
   });
 }

 /* update item when edit */
  updateItem = (task, i) => {
    this.data[i].task = task;
    this.save();
    this.displayToDoList();
  }

 SaveListeners=() => {
   const saveBtn = document.querySelectorAll('.saveBtn');
   const inputs = document.querySelectorAll('.textareaContainer textarea');
   saveBtn.forEach((sb, i) => {
     sb.addEventListener('click', () => {
       this.updateItem(inputs[i].value, i);
     });
   });
 }

         deleteItem= (i) => {
           this.data = this.data.filter((item, index) => index !== i);
           this.save();
           this.displayToDoList();
         }

     DeleteListeners= () => {
       const deleteBtn = document.querySelectorAll('.deleteBtn');
       deleteBtn.forEach((btn, i) => {
         btn.addEventListener('click', () => { this.deleteItem(i); });
       });
     }

        save = () => {
          localStorage.setItem('toDoList', JSON.stringify(this.data));
        }

    load = () => {
      const getDataFromLocal = JSON.parse(localStorage.getItem('toDoList')) || [];
      getDataFromLocal.forEach((toDoList) => {
        this.data.push(new Main(toDoList.task, toDoList.index, toDoList.completed));
      });
    }
}

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
      updateItem.push(i);
    }
  });
  const updateList = dataCollection.data.filter((item, i) => !updateItem.includes(i));
  dataCollection.data = updateList;
  localStorage.setItem('toDoList', JSON.stringify(updateList));
  dataCollection.displayToDoList();
});
