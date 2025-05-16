const taskString = localStorage.getItem("tasks");
let tasks = [];

let empty = document.querySelector(".epmty");
console.log (empty)
const section = document.querySelector("section");

if (taskString) {
  tasks = JSON.parse(taskString);
  
  empty.style.display = "none";
  console.log("wir haben das gelesen")
  
  //   updateProgressBar();
  //   printTasks();
} else {empty.style.display = "block";
   
}

let newTasks = 0;
let processTasks = 0;
let completedTasks = 0;

tasks.forEach((task) => {
  if (task.status === "new") newTasks++;
});
tasks.forEach((task) => {
  if (task.status === "in process") processTasks++;
});
tasks.forEach((task) => {
  if (task.status === "completed") completedTasks++;
});

let statistic = document.querySelector(".task-statistics");

let newSpan = document.createElement("span");
newSpan.textContent = `New - ${newTasks}, `;
newSpan.style.color = "#557c3b";

let processSpan = document.createElement("span");
processSpan.textContent = ` in Process - ${processTasks}, `;
processSpan.style.color = "#b67c01";

let completedSpan = document.createElement("span");
completedSpan.textContent = ` Completed - ${completedTasks}`;
completedSpan.style.color = "#634f53";
statistic.append(newSpan, processSpan, completedSpan);

const page1 = document.querySelector(".container-h1");
const start = document.getElementById("start");
const main = document.querySelector("main");

start.addEventListener("click", () => {
  page1.style.display = "none";
  main.style.display = "block";
});

// progress Bar
function updateProgressBar() {
  let value = 0;
  tasks.forEach((task) => {
    if (task.status === "completed") value++;
  });
  value = (value * 100) / tasks.length;
  const bar = document.querySelector(".progress-bar");
  bar.style.width = value + "%";
  let text = document.querySelector(".progress-text");
  text.textContent = `Completed ${Math.round(value)}%`;
}
// print Tasks
function printTasks() {
  section.innerText = "";
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    const container = document.createElement("div");
    const name = document.createElement("div");
    const action = document.createElement("div");
    const status = document.createElement("button");
    const edit = document.createElement("button");
    const del = document.createElement("button");

    container.style.cssText = `
    width:100%;
    min-height: 40px;
    margin-top:10px;
    background-color: var(--background-light-transparent);
    display:flex;
    justify-content: space-between;
    border: 1px solid var(--light-color);
    border-radius: 5px;
    align-items: center;
    
    `;

    action.style.cssText = `
    display:flex;
    justify-content: space-between;
    width:240px
    `;

    edit.textContent = "🖊️ ";
    edit.style.cssText = `
    border: 1px solid var(--light-color);
    border-radius: 5px;
    padding:0 5px;
    margin: 0 20px
    
    `;

    name.textContent = task.name;
    name.style.cssText = `
    padding: 0 10px;
    color: var(--main-color); 
    width: 300px
    `;
    status.textContent = task.status;
    status.style.width = "90px";
    status.style.textAlign = "center";
    status.style.border = "1px solid var(--light-color)";
    status.style.padding = "5px";
    status.style.borderRadius = "5px";

    if (task.status === "new") {
      status.style.color = "green";
      status.style.fontWeight = "bold";
    }
    if (task.status === "completed") {
      status.style.color = "red";
      name.style.textDecoration = "line-through";
      edit.style.display = "none";
    }
    status.onclick = function () {
      if (status.textContent === "new") {
        task.status = "in process";
        renderTask();
      }
      if (status.textContent === "in process") {
        task.status = "completed";
        renderTask();
      }
      if (status.textContent === "completed") {
        task.status = "in process";
        renderTask();
      }
    };
    edit.onclick = () => {
      let text = prompt(`Edit task - "${task.name}"`).trim();
      if (text) {
        task.name = text;
        renderTask();
      }
    };

    del.textContent = "🗑️ ";
    del.style.cssText = `
   border: 1px solid var(--light-color);
    border-radius: 5px;
    padding:0 3px;
    margin: 0 20px 0 0;
    
    `;

    del.onclick = () => {
      tasks.splice(i, 1);
      renderTask();
    };

    action.append(status, edit, del);
    container.append(name, action);
    section.appendChild(container);
  }
  //Zitaten

  let inspirations = [
    " A goal without a plan is just a wish. ",
    "Good planning replaces chance with intention.",
    "Success is the sum of small efforts repeated day in and day out.",
    "Plan your work and work your plan.",
    "Don’t put off until tomorrow what you can do today.",
    "The key to success is setting goals and taking steps toward them every day.",
    "Order is half of life. Planning is the other half.",
    "Success has two letters: DO",
    "You don’t have to be great to start, but you have to start to be great.",
    "The best preparation for tomorrow is doing your best today.",
  ];

  let inspiration = document.querySelector(".inspiraton");
  inspiration.textContent =
    inspirations[Math.floor(Math.random() * inspirations.length)];
}

updateProgressBar();
printTasks();

// edd new task
function renderTask() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  updateProgressBar();
  printTasks();
}

const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const submit = document.getElementById("add-task");
const error = document.querySelector(".error");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let newTask = {
    name: input.value.trim(),
    status: "new",
  };

  if (newTask.name !== "") {
    error.style.display = "none";
    tasks.push(newTask);
    input.value = "";
    renderTask();
  } else {
    error.style.display = "block";
  }
});
