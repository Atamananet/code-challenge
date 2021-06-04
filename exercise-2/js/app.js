(() => {
  const taskInput = document.querySelector('#new-task');
  const addButton = document.querySelector('button');
  const incompleteTasksHolder = document.querySelector('#incomplete-tasks');
  const completedTasksHolder = document.querySelector('#completed-tasks');

  const createNewTaskElement = (taskString, arr) => {
    const listItem = document.createElement('li');
    const checkBox = document.createElement('input');
    const label = document.createElement('label');
    const editInput = document.createElement('input');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    checkBox.type = 'checkbox';

    label.innerText = taskString;
    label.prepend(checkBox);

    editInput.type = 'text';
    editButton.innerText = 'Edit';
    editButton.className = 'edit';

    deleteButton.innerText = 'Delete';
    deleteButton.className = 'delete';

    listItem.prepend(label, editInput, editButton, deleteButton);

    return listItem;
  };

  const addTask = function () {
    const listItemName = taskInput.value;

    if (!listItemName) {
      taskInput.placeholder = 'Add some task name';
      return;
    }

    const newTask = createNewTaskElement(listItemName);
    incompleteTasksHolder.append(newTask);

    bindTaskEvents(newTask);

    taskInput.value = '';
    taskInput.placeholder = "";
  };

  const editTask = (el) => () => {
    const editInput = el.querySelector('input[type=text]');
    const label = el.querySelector('label');
    const button = el.querySelector('button');

    const containsClass = el.classList.contains('editMode');
    if (containsClass) {
      const checkBox = label.children[0];
      label.innerText = editInput.value;
      label.prepend(checkBox);
      button.innerText = 'Edit';
    } else {
      editInput.value = label.innerText;
      button.innerText = 'Save';
    }

    el.classList.toggle('editMode');
  };

  const deleteTask = (el) => () => {
    el.remove();
  };

  const toggleCompletion = (el) => (e) => {
    console.log(e.currentTarget);
    if (e.target.checked) {
      completedTasksHolder.append(el);
    } else {
      incompleteTasksHolder.append(el);
    }
  };

  const bindTaskEvents = function (taskListItem) {
    const checkBox = taskListItem.querySelector('input[type=checkbox]');
    const editButton = taskListItem.querySelector('button.edit');
    const deleteButton = taskListItem.querySelector('button.delete');

    editButton.addEventListener('click', editTask(taskListItem));
    deleteButton.addEventListener('click', deleteTask(taskListItem));
    checkBox.addEventListener('click', toggleCompletion(taskListItem));
  };

  addButton.addEventListener('click', addTask);

  [...incompleteTasksHolder.children].forEach((incompleteTask) => {
    bindTaskEvents(incompleteTask);
  });

  [...completedTasksHolder.children].forEach((completedTask) => {
    bindTaskEvents(completedTask);
  })
})();
