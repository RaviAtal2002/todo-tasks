// DOM Elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const taskCount = document.getElementById('task-count');
const clearBtn = document.getElementById('clear-btn');

// Load tasks from LocalStorage or use default tasks
let tasks = JSON.parse(localStorage.getItem('todos')) || [
  { text: 'Buy groceries', completed: false },
  { text: 'Finish homework', completed: true }
];

// Save tasks to LocalStorage and update the view
function saveAndRender() {
  localStorage.setItem('todos', JSON.stringify(tasks));
  render();
}

// Display tasks on screen
function render() {
  todoList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = `todo-item ${task.completed ? 'completed' : ''}`;

    li.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
      <span class="todo-text" onclick="toggleTask(${index})">${task.text}</span>
      <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
    `;

    todoList.appendChild(li);
  });

  // Update remaining tasks count
  const remaining = tasks.filter(t => !t.completed).length;
  taskCount.textContent = `${remaining} task${remaining === 1 ? '' : 's'} left`;
}

// Add a new task
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();

  if (text !== '') {
    tasks.push({ text: text, completed: false });
    todoInput.value = '';
    saveAndRender();
  }
});

// Toggle task completed state
window.toggleTask = function(index) {
  tasks[index].completed = !tasks[index].completed;
  saveAndRender();
};

// Delete a single task
window.deleteTask = function(index) {
  tasks.splice(index, 1);
  saveAndRender();
};

// Clear all tasks
clearBtn.addEventListener('click', () => {
  tasks = [];
  saveAndRender();
});

// Initial run
render();
