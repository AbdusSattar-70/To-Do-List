import './style.css';

const toDoList = [
  {
    description: 'Have to fix Car',
    completed: false,
    index: 0,
  },
  {
    description: 'Have to some shoping',
    completed: true,
    index: 1,
  },
  {
    description: 'Visit to the Doctor',
    completed: false,
    index: 2,
  },
];

const displayToDoList = () => {
  document.querySelector('.displayListCont').innerHTML = '';
  toDoList.forEach((item) => {
    document.querySelector('.displayListCont').innerHTML += `
 <div class="textareaContainer">
    <input type="checkbox" class="complete checkbox" name="completed" />
    <textarea disabled>${item.description}</textarea>
    <i class="fa fa-ellipsis-v editBtn"></i>
</div>
<div class="controller">
  <i class="fa fa-save saveBtn"></i>
  <i class="fa fa-times cancelBtn"></i>
  <i class="fa fa-trash deleteBtn"></i>
</div>
<hr>
`;
  });
};
displayToDoList();