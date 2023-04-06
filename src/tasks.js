import { modalClose } from "./modal-control";
import { tFormArr } from "./modal-control";

const tName = document.querySelector("#tname");
const tDesc = document.querySelector("#tdesc");
const tDate = document.querySelector("#tdate");
const tImportant = document.querySelector("#important");
const tProject = document.querySelector("#project-select");
const taskModal = document.querySelector(".tmodal");

export function log() {
  console.log(tName);
  console.log(taskArray);
}

export function createTask(tName, tDesc, tDate, tImportant, tProject) {
  return {
    tName: tName.value,
    tDesc: tDesc.value,
    tDate: tDate.value,
    tImportant: tImportant.value,
    tProject: tProject.value,
  };
}

const taskSubmitBtn = document.querySelector(".tsubmit");
const taskArray = [];

taskSubmitBtn.addEventListener("click", () => {
  const task = createTask(tName, tDesc, tDate, tImportant, tProject);
  taskArray.push(task);
  console.log(task, taskArray);
  modalClose(taskModal, tFormArr);
});
