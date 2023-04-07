import { modalClose } from "./modal-control";
import { modalOpen } from "./modal-control";
import { projectArray } from "./project";
import { renderTask } from "./render";
// Get all elements in task creation form
const tName = document.querySelector("#tname");
const tDesc = document.querySelector("#tdesc");
const tDate = document.querySelector("#tdate");
const tImportant = document.querySelector("#important");
const tProject = document.querySelector("#project-select");

// Get the task modal element and the form within it
const taskModal = document.querySelector(".tmodal");
const tForm = document.querySelector(".tmodal-content");

// Takes all elements within the task form and puts them into an array
const tFormArr = tForm.elements;

// Select element inside the task creation form for selecting a project
const projectSelect = document.querySelector("#project-select");

export function log() {
  console.log(tName);
  console.log(taskArray);
}

// Creates an object for a task
function createTask(tName, tDesc, tDate, tImportant, tProject) {
  return {
    name: tName.value,
    desc: tDesc.value,
    date: tDate.value,
    important: tImportant.checked,
    project: tProject.value,
    rendered: false,
  };
}

const taskSubmitBtn = document.querySelector(".tsubmit");
const taskArray = [];
const task = {
  name: "Example",
  desc: "Example",
  date: "Example",
  important: true,
  project: "Example",
  rendered: false,
};
taskArray.push(task);

taskSubmitBtn.addEventListener("click", () => {
  const task = createTask(tName, tDesc, tDate, tImportant, tProject);
  taskArray.push(task);
  console.log(task, taskArray);
  renderTask(taskArray);
  modalClose(taskModal, tFormArr);
});

const taskMdlOpen = document.querySelector(".task-button");

taskMdlOpen.addEventListener("click", (e) => {
  modalOpen(taskModal);
  projectOptions();
});

window.addEventListener("click", (e) => {
  if (e.target === taskModal && e.target !== tForm) {
    console.log(e);
    modalClose(taskModal, tFormArr);
  } else {
    return;
  }
});

// Takes all existing projects and puts them into project selection in task form
const projectOptions = () => {
  for (let i = 0; i < projectArray.length; i++) {
    if (projectArray[i].renderedOption === false) {
      const projectOption = document.createElement("option");
      projectOption.value = `${projectArray[i].name}`;
      projectOption.textContent = `${projectArray[i].name}`;
      projectSelect.appendChild(projectOption);
      projectArray[i].renderedOption = true;
    }
  }
};

renderTask(taskArray);
