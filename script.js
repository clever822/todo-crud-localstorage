const form = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const clearAllBtn = document.getElementById("clearAll");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editIndex = null;

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const card = document.createElement("div");
    card.className = "task-card";
    card.style.backgroundColor = task.color;

    card.innerHTML = `
      <h3>${task.name}</h3>
      <p><strong>Type:</strong> ${task.type}</p>
      <p>${task.description}</p>
      <div class="task-card-buttons">
        <button onclick="editTask(${index})">✏️ Edit</button>
        <button onclick="deleteTask(${index})">🗑️ Delete</button>
      </div>
    `;

    taskList.appendChild(card);
  });
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("taskName").value;
  const type = document.getElementById("taskType").value;
  const description = document.getElementById("taskDescription").value;
  const color = document.getElementById("taskColor").value;

  const task = { name, type, description, color };

  if (editIndex !== null) {
    tasks[editIndex] = task;
    editIndex = null;
  } else {
    tasks.push(task);
  }

  saveTasks();
  form.reset();
});

window.editTask = function (index) {
  const task = tasks[index];
  document.getElementById("taskName").value = task.name;
  document.getElementById("taskType").value = task.type;
  document.getElementById("taskDescription").value = task.description;
  document.getElementById("taskColor").value = task.color;
  editIndex = index;
};

window.deleteTask = function (index) {
  tasks.splice(index, 1);
  saveTasks();
};

clearAllBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all tasks?")) {
    tasks = [];
    saveTasks();
  }
});

renderTasks();
