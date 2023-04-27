import { modalClose } from "./modal-control";
import { modalOpen } from "./modal-control";
import { projectArray } from "./project";
import { renderTask } from "./render";
import { clearMainWindow } from "./render";
import { checkStorage } from "./project";
import { updateStorage } from "./project";

export const taskArray = JSON.parse(localStorage.getItem("tasks") || "[]");

// Get all elements in task creation form
const tName = document.querySelector("#tname");
const tDesc = document.querySelector("#tdesc");
const tDate = document.querySelector("#tdate");
const tImportant = document.querySelector("#important");
const tProject = document.querySelector("#project-select");
const tBackgroundClr = document.querySelector("#background-clr");
const tTextClr = document.querySelector("#text-clr");

// Get the task modal element and the form within it
const taskModal = document.querySelector(".tmodal");
const tForm = document.querySelector(".tmodal-content");

// Takes all elements within the task form and puts them into an array
const tFormArr = tForm.elements;

// Select element inside the task creation form for selecting a project
const projectSelect = document.querySelector("#project-select");

// Creates an object for a task
function createTask(tName, tDesc, tDate, tImportant, tProject) {
  return {
    name: tName.value,
    desc: tDesc.value,
    date: tDate.value,
    backgroundClr: tBackgroundClr.value,
    textClr: tTextClr.value,
    project: tProject.value,
    rendered: false,
  };
}

const task = {
  name: "Example",
  desc: "Example",
  date: "2023-04-27",
  backgroundClr: "#d0e0e3",
  textClr: "#000000",
  project: "Example",
  rendered: false,
};

checkStorage(taskArray, "tasks", task);

console.log(taskArray);

const taskSubmitBtn = document.querySelector(".tsubmit");

taskSubmitBtn.addEventListener("click", (e) => {
  if (tName.value === "" || tProject.value === "") {
    return;
  }
  const task = createTask(tName, tDesc, tDate, tImportant, tProject);
  addTaskArray(task);
  renderTask(taskArray);
  modalClose(taskModal, tFormArr);
  updateStorage(taskArray, "tasks");
});

const addTaskArray = (task) => {
  taskArray.push(task);
};

const taskMdlOpen = document.querySelector(".task-button");

taskMdlOpen.addEventListener("click", (e) => {
  modalOpen(taskModal);
  projectOptions();
  clearMainWindow();
});

window.addEventListener("click", (e) => {
  if (e.target === taskModal && e.target !== tForm) {
    modalClose(taskModal, tFormArr);
  } else {
    return;
  }
});

// Takes all existing projects and puts them into project selection in task form
const projectOptions = () => {
  const options = document.querySelectorAll("option");
  options.forEach((element) => element.remove());
  for (let i = 0; i < projectArray.length; i++) {
    const projectOption = document.createElement("option");
    projectOption.value = `${projectArray[i].name}`;
    projectOption.textContent = `${projectArray[i].name}`;
    projectSelect.appendChild(projectOption);
  }
};

export function deleteTask(elem) {
  for (let i = 0; i < taskArray.length; i++) {
    if (elem.target.dataset.cardToDelete === taskArray[i].name) {
      taskArray.splice(i, 1);
    }
  }
  for (let i = 0; i < projectArray.length; i++) {
    if (projectArray[i].tasks.includes(elem.target.dataset.cardToDelete)) {
      const index = projectArray[i].tasks.indexOf(
        elem.target.dataset.cardToDelete
      );
      projectArray[i].tasks.splice(index, 1);
    }
  }
  const taskNodeList = document.querySelectorAll(".task-card");
  for (let i = 0; i < taskNodeList.length; i++) {
    if (taskNodeList[i].dataset.task === elem.target.dataset.cardToDelete) {
      taskNodeList[i].remove();
    }
  }
  const sbTaskNodeList = document.querySelectorAll(".task-li");
  for (let i = 0; i < sbTaskNodeList.length; i++) {
    if (elem.target.dataset.cardToDelete === sbTaskNodeList[i].dataset.sbTask) {
      sbTaskNodeList[i].remove();
    }
  }
  updateStorage(taskArray, "tasks");
}

taskArray.forEach((element) => (element.rendered = false));

renderTask(taskArray);
