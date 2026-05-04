// Estado interno
let tasks = [];

// Elementos del DOM
const input = document.getElementById("taskInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("taskList");
const error = document.getElementById("error");

const totalEl = document.getElementById("total");
const completedEl = document.getElementById("completed");
const pendingEl = document.getElementById("pending");

// Evento agregar tarea
button.addEventListener("click", addTask);

// Función agregar tarea
function addTask() {
  const text = input.value.trim();

  // Validaciones
  if (text === "") {
    showError("La tarea no puede estar vacía");
    return;
  }

  if (text.length > 50) {
    showError("Máximo 50 caracteres");
    return;
  }

  // Crear tarea (JSON)
  const task = {
    id: tasks.length,
    text: text,
    completed: false,
    date: new Date().toLocaleString() // Bonus
  };

  tasks.push(task);

  input.value = "";
  error.textContent = "";

  render();
}

// Mostrar error
function showError(msg) {
  error.textContent = msg;
}

// Renderizar lista
function render() {
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.className = task.completed ? "completed" : "pending";

    const span = document.createElement("span");
    span.textContent = `${task.text} (${task.date})`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", function () {
      toggleTask(index);
    });

    li.appendChild(span);
    li.appendChild(checkbox);
    list.appendChild(li);
  });

  updateCounters();
}

// Cambiar estado de tarea
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  render();
}

// Actualizar contadores
function updateCounters() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  totalEl.textContent = total;
  completedEl.textContent = completed;
  pendingEl.textContent = pending;
}