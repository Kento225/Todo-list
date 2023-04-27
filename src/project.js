import { modalClose } from "./modal-control";
import { modalOpen } from "./modal-control";
import { renderProjectSb } from "./render";
import { taskArray } from "./tasks";
import { clearMainWindow } from "./render";
import { mainScreen } from "./render";

export function checkStorage(array, name, item) {
  if (!localStorage.getItem(name)) {
    console.log("works");
    array.push(item);
    localStorage.setItem(name, JSON.stringify(array));
  }
}

export function updateStorage(array, name) {
  localStorage.removeItem(name);
  localStorage.setItem(name, JSON.stringify(array));
}

// Get all elements in project creation form
export const pName = document.querySelector("#pname");
const pDesc = document.querySelector("#pdesc");
const projectSubmitBtn = document.querySelector(".psubmit");

const projectMdlOpen = document.querySelector(".project-button");
// Get project modal element, and the form within it
const projectModal = document.querySelector(".pmodal");
const pForm = document.querySelector(".pmodal-content");

// Get project modal form elements, and put them into an array
const pFormArr = pForm.elements;

// Example project object
const project = {
  name: "Example",
  desc: "Example",
  rendered: false,
  tasks: [],
};

export const projectArray = JSON.parse(
  localStorage.getItem("projects") || "[]"
);

checkStorage(projectArray, "projects", project);

console.log(projectArray);

// Factory function to create project objects
const createProject = (pName, pDesc) => {
  return {
    name: pName.value,
    desc: pDesc.value,
    rendered: false,
    tasks: [],
  };
};

projectSubmitBtn.addEventListener("click", (e) => {
  const project = createProject(pName, pDesc);
  projectArray.push(project);
  modalClose(projectModal, pFormArr);
  renderProjectSb(projectArray, taskArray);
  updateStorage(projectArray, "projects");
});

projectMdlOpen.addEventListener("click", (e) => {
  modalOpen(projectModal);
  clearMainWindow();
});

window.addEventListener("click", (e) => {
  if (e.target === projectModal && e.target !== pForm) {
    modalClose(projectModal, pFormArr);
  } else {
    return;
  }
});

export function projectDelete(elem) {
  mainScreen.innerHTML = "";
  for (let i = 0; i < projectArray.length; i++) {
    if (elem.target.dataset.delProjectName === projectArray[i].name) {
      for (let j = taskArray.length - 1; j >= 0; j--) {
        if (taskArray.includes(projectArray[i].tasks[j])) {
          taskArray.splice(j, 1);
        }
      }
      projectArray.splice(i, 1);
      const sbProjectNodeList = document.querySelectorAll(".project-div");
      for (let i = 0; i < sbProjectNodeList.length; i++) {
        if (
          sbProjectNodeList[i].dataset.projectName ===
          elem.target.dataset.delProjectName
        ) {
          sbProjectNodeList[i].remove();
        }
      }
      console.log(projectArray);
      console.log(taskArray);
    }
  }
  updateStorage(projectArray, "projects");
  updateStorage(taskArray, "tasks");
}

projectArray.forEach((element) => {
  element.rendered = false;
});

renderProjectSb(projectArray);
