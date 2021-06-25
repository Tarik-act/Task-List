// Variables : define ui variable

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-task");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listener
loadEventListener();

// Load all event listener

function loadEventListener() {
  // DOM loaded with page
  document.addEventListener("DOMContentLoaded", getTask);
  // Add task event
  form.addEventListener("submit", addTask);
  // remove li
  taskList.addEventListener("click", removeTask);
  // clear task list
  clearBtn.addEventListener("click", clearTask);
  // filter
  filter.addEventListener("keyup", filterTask);
}
// get Task
function getTask() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task) {
    // Create a element
    const li = document.createElement("li");
    //   Add a class
    li.className = "collection-item";
    // Create textNode and append in li
    li.appendChild(document.createTextNode(task));

    // create a link

    const link = document.createElement("a");
    // Add a class
    link.className = "delete-item secondary-content";

    link.innerHTML = '<i class="fa fa-remove"></i>';
    // link append to li
    li.appendChild(link);
    // li append to ul
    taskList.appendChild(li);
  });
}
// Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  }
  // Create a element
  const li = document.createElement("li");
  //   Add a class
  li.className = "collection-item";
  // Create textNode and append in li
  li.appendChild(document.createTextNode(taskInput.value));

  // create a link

  const link = document.createElement("a");
  // Add a class
  link.className = "delete-item secondary-content";

  link.innerHTML = '<i class="fa fa-remove"></i>';
  // link append to li
  li.appendChild(link);
  // li append to ul
  taskList.appendChild(li);
  console.log(li);
  storeTaskToLocalStorage(taskInput.value);
  taskInput.value = "";
  e.preventDefault();
}

// store in local storage

function storeTaskToLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure?")) {
      e.target.parentElement.parentElement.remove();

      removeTaskToLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// remove task from the local storage

function removeTaskToLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// clear task

function clearTask() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  // clear task
  clearTaskFromLocalStorage();
}

// clear task from local storage
function clearTaskFromLocalStorage() {
  localStorage.clear();
}

// filter Task

function filterTask(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
