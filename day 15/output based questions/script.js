const TodoInput = document.getElementById('todoInput');
const TodoButton = document.getElementById('todoBtn');
const TodoList = document.getElementById('todoList');

TodoButton.addEventListener('click', () => {
  const TodoText = TodoInput.value;
  
  if (TodoText === '') {
    alert('Please enter a task'); // Ensure input is not empty
    return;
  }

  const todoItem = document.createElement('li');
  todoItem.innerText = TodoText;

  const deleteButton = document.createElement('button')
  deleteButton.innerText = 'Delete';

  deleteButton.addEventListener('click', () => {
    TodoList.removeChild(todoItem);
  })

  todoItem.appendChild(deleteButton);
  TodoList.appendChild(todoItem);

  TodoInput.value = ''
});
