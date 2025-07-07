const pendingList = document.getElementById("pendingList");
const completedList = document.getElementById("completedList");
const taskInput = document.getElementById("taskInput");

let tasks = [];

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return alert("Please enter a task!");

  const task = {
    id: Date.now(),
    text,
    completed: false,
    createdAt: new Date().toLocaleString(),
    completedAt: null
  };

  tasks.push(task);
  taskInput.value = "";
  renderTasks();
}

function renderTasks() {
  pendingList.innerHTML = "";
  completedList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <strong>${task.text}</strong>
        <div class="date">Created: ${task.createdAt}</div>
        ${task.completed ? `<div class="date">Completed: ${task.completedAt}</div>` : ""}
      </div>
      <div class="actions">
        <button onclick="editTask(${task.id})">✏️</button>
        <button onclick="deleteTask(${task.id})">🗑️</button>
        ${
          !task.completed
            ? `<button onclick="completeTask(${task.id})">✅</button>`
            : `<button onclick="undoTask(${task.id})">↩️</button>`
        }
      </div>
    `;

    if (task.completed) {
      completedList.appendChild(li);
    } else {
      pendingList.appendChild(li);
    }
  });
}

function completeTask(id) {
  const task = tasks.find(t => t.id === id);
  task.completed = true;
  task.completedAt = new Date().toLocaleString();
  renderTasks();
}

function undoTask(id) {
  const task = tasks.find(t => t.id === id);
  task.completed = false;
  task.completedAt = null;
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  renderTasks();
}

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  const newText = prompt("Edit your task:", task.text);
  if (newText) {
    task.text = newText.trim();
    renderTasks();
  }
}
