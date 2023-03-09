export default class Data {
  constructor() {
    this.data = [];
  }

   setInLocal = () => {
     localStorage.setItem('list', JSON.stringify(this.data));
   };

 retrieveFromLocal = () => {
   const storedData = localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];
   this.data = storedData;
 };

 /* display on UI  */

 displayOnUI = () => {
   let items = '';
   this.data.forEach((toDoList) => {
     items += ` <div class="textareaContainer">
          <input type="checkbox" class="checkbox" name="completed" />
          <textarea disabled>${toDoList.task}</textarea>
          <i class="fa fa-ellipsis-v editBtn" ></i>
          <div class="controller">
          <i class="fa fa-save saveBtn"></i>
          <i class="fa fa-trash deleteBtn"></i>
          </div>
      </div>
       <hr> `;
   });
   document.querySelector('.displayListCont').innerHTML = items;
   this.editListener();
   this.saveListener();
   this.deleteListener();
   this.checkBox();
 };

 /* generate Index for every toDoList */
 generateIndex = () => this.data.length;

 /* push data from the input field in the data array  */
 pushData = () => {
   const form = document.querySelector('.form');
   const { inputField } = form.elements;
   form.addEventListener('submit', (e) => {
     e.preventDefault();
     const task = inputField.value;
     const index = this.generateIndex();
     const completed = false;
     /* create object for every toDoList */
     const info = { task, index, completed };
     this.data.push(info);
     /* set data in localStorage */
     this.setInLocal();
     form.reset();
     /* show update data on UI without reloading */
     this.displayOnUI();
   });
 };

 /* for the textarea  editable and show controllers(deleteBtn , saveBtn ) */
 editListener = () => {
   const textareas = document.querySelectorAll('textarea');
   const editBtns = document.querySelectorAll('.editBtn');
   const controllers = document.querySelectorAll('.controller');
   editBtns.forEach((editBtn, i) => {
     editBtn.addEventListener('click', () => {
       controllers[i].style.display = 'flex';
       editBtn.style.display = 'none';
       textareas[i].disabled = false;
     });
   });
 };

 /* for saving the textarea after editing */
 saveListener = () => {
   const textareas = document.querySelectorAll('textarea');
   const saveBtns = document.querySelectorAll('.saveBtn');
   saveBtns.forEach((saveBtn, i) => {
     saveBtn.addEventListener('click', () => {
       /* after editing reassign the selected textarea value/task in data array  */
       this.data[i].task = textareas[i].value;
       this.setInLocal();
       /* update UI and also disappear the controllers when call displayOnUI function */
       this.displayOnUI();
     });
   });
 };

 /* for deleting each item from data array */

 deleteListener = () => {
   const deleteBtns = document.querySelectorAll('.deleteBtn');
   deleteBtns.forEach((deleteBtn, i) => {
     deleteBtn.addEventListener('click', () => {
       /* After applying the filter method  get a filtered array,
    in which no item remains that we want to delete. Then reassign the data array. */
       const filteredArr = this.data.filter((singleObj) => singleObj.index !== i);
       this.data = filteredArr;
       /* after deleting update the index of the each object */
       this.data.forEach((singleObj, i) => {
         singleObj.index = i;
       });
       this.setInLocal();
       this.displayOnUI();
     });
   });
 };

 checkBox = () => {
   const checks = document.querySelectorAll('.checkbox');
   const inputs = document.querySelectorAll('textarea');
   checks.forEach((ck, i) => {
     const isCompleted = this.data[i].completed;
     if (isCompleted) {
       inputs[i].classList.add('completed');
       checks[i].setAttribute('checked', 'checked');
     }
     ck.addEventListener('change', () => {
       if (checks[i].checked) {
         inputs[i].classList.add('completed');
         this.data[i].completed = true;
         // updateCompletedStatus(i, true);
       } else {
         inputs[i].classList.remove('completed');
         this.data[i].completed = false;
         // updateCompletedStatus(i, false);
       }
       this.setInLocal();
     });
   });
 };
}