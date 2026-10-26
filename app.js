const taskInput = document.getElementById('new-task');
const newTaskButton = document.getElementById('add-button');
const incompleteTasksList = document.getElementById('incomplete-tasks');
const completedTasksList = document.getElementById('completed-tasks');

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement('li');

  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';

  const label = document.createElement('label');
  label.innerText = taskString;
  label.className = 'task';

  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'task';

  const editButton = document.createElement('button');
  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'edit';

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete';

  const deleteButtonImg = document.createElement('img');
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.alt = 'delete icon';

  deleteButton.appendChild(deleteButtonImg);

  listItem.append(checkBox, label, editInput, editButton, deleteButton);

  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  incompleteTasksList.appendChild(listItem);
  bindTaskEvents(listItem, moveTaskToCompleted);

  taskInput.value = '';
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editButton = listItem.querySelector('.edit');
  const isEditModeActive = listItem.classList.contains('editMode');

  if (isEditModeActive) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  listItem.classList.toggle('editMode');
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

const moveTaskToList = function (listItem, destinationList, checkboxChangeHandler) {
  destinationList.appendChild(listItem);
  bindTaskEvents(listItem, checkboxChangeHandler);
};

const moveTaskToCompleted = function () {
  const listItem = this.parentNode;
  moveTaskToList(listItem, completedTasksList, moveTaskToIncomplete);
};

const moveTaskToIncomplete = function () {
  const listItem = this.parentNode;
  moveTaskToList(listItem, incompleteTasksList, moveTaskToCompleted);
};

newTaskButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskListItem, checkboxChangeHandler) {
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkboxChangeHandler;
};

for (let i = 0; i < incompleteTasksList.children.length; i++) {
  bindTaskEvents(incompleteTasksList.children[i], moveTaskToCompleted);
}

for (let i = 0; i < completedTasksList.children.length; i++) {
  bindTaskEvents(completedTasksList.children[i], moveTaskToIncomplete);
}
