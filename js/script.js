// Cache DOM elements
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");
const clearCompletedButton = document.getElementById("clearCompletedButton");
const completedTaskList = document.getElementById("completedTaskList");

// Add event listeners
addButton.addEventListener("click", handleAddButtonClick);
taskList.addEventListener("click", handleTaskListClick);
completedTaskList.addEventListener("click", handleCompletedTaskListClick);
clearCompletedButton.addEventListener("click", handleClearCompletedButtonClick);

// Event handlers
function handleAddButtonClick() {
    const task = taskInput.value.trim();

    if (task !== "") {
        addPendingTask(task);
        taskInput.value = "";
        updateCounter();
    }
}

function handleTaskListClick(e) {
    if (e.target.classList.contains("delete-btn")) {
        const taskItem = e.target.parentElement;
        const isCompleted = taskItem.classList.contains("completed");

        if (isCompleted) {
            taskItem.parentNode.removeChild(taskItem);
        } else {
            taskItem.classList.toggle("completed");
            moveCompletedTask(taskItem);
        }

        updateCounter();
    }
}

function handleCompletedTaskListClick(e) {
    if (e.target.classList.contains("delete-btn")) {
        const taskItem = e.target.parentElement;
        taskItem.parentNode.removeChild(taskItem);
        updateCounter();
    }
}

function handleClearCompletedButtonClick() {
    const completedTasks = completedTaskList.getElementsByClassName("completed");

    while (completedTasks.length > 0) {
        completedTasks[0].parentNode.removeChild(completedTasks[0]);
    }

    updateCounter();
}

// Helper functions
function addPendingTask(task) {
    const li = document.createElement("li");
    li.innerHTML = `
    <span>${task}</span>
    <span class="delete-btn">X</span>
  `;

    taskList.appendChild(li);
    updateCounter();
}

function moveCompletedTask(taskItem) {
    taskItem.parentNode.removeChild(taskItem);
    completedTaskList.appendChild(taskItem);
}

function updateCounter() {
    const pendingTasks = taskList.querySelectorAll("li:not(.completed)");
    counter.textContent = `${pendingTasks.length} task(s) pending`;
}
