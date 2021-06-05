(() => {
  const taskInput = document.querySelector('#new-task');
  const addButton = document.querySelector('button');
  const incompleteTasksHolder = document.querySelector('#incomplete-tasks');
  const completedTasksHolder = document.querySelector('#completed-tasks');

  const serialize = () => {
    const getInnerText = (node) => node.children[0].innerText;
    
    const incompleteValues = [...incompleteTasksHolder.children].map(getInnerText);
    const completedValues = [...completedTasksHolder.children].map(getInnerText);

    const state = {
      incompleteValues,
      completedValues,
    };

    try {
      localStorage.setItem('state', JSON.stringify(state));
    } catch {
      console.log("Can't save state");
    }
  };

  const deserialize = () => {
    const storedState = localStorage.getItem('state');
    if (!storedState) {
      return;
    }

    const { incompleteValues, completedValues } = JSON.parse(storedState);

    incompleteTasksHolder.innerHTML = '';
    completedTasksHolder.innerHTML = '';

    incompleteValues.forEach((taskName) => {
      addTask(null, taskName);
    });

    completedValues.forEach((taskName) => {
      addTask(null, taskName, true);
    });
  };

  const createNewTaskElement = (taskString, isCompleted) => {
    const listItem = document.createElement('li');
    const checkBox = document.createElement('input');
    const label = document.createElement('label');
    const editInput = document.createElement('input');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    checkBox.type = 'checkbox';
    checkBox.checked = isCompleted;

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

  const addTask = (event, withName, isCompleted) => {
    const listItemName = withName || taskInput.value;

    if (!listItemName) {
      taskInput.placeholder = 'Add some task name';
      taskInput.focus();
      return;
    }

    const newTask = createNewTaskElement(listItemName, isCompleted);

    if (isCompleted) {
      completedTasksHolder.append(newTask);
    } else {
      incompleteTasksHolder.append(newTask);
    }

    bindTaskEvents(newTask);

    taskInput.value = '';
    taskInput.placeholder = '';
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

    editButton.onclick = editTask(taskListItem);
    deleteButton.onclick = deleteTask(taskListItem);
    checkBox.onclick = toggleCompletion(taskListItem);
  };

  addButton.addEventListener('click', addTask);

  document.addEventListener('DOMContentLoaded', () => {
    deserialize();
    setInterval(serialize, 1000);
  });
})();
