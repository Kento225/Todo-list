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
const exampleProject = () => {
  const task = {
    name: "Example",
    desc: "Example",
    date: "2023-04-27",
    backgroundClr: "#d0e0e3",
    textClr: "#000000",
    project: "Example",
    rendered: true,
  };

  const project = {
    name: "Example",
    desc: "Example",
    rendered: true,
    tasks: [task],
  };

  return project;
};

export const projectArray = JSON.parse(
  localStorage.getItem("projects") || "[]"
);

checkStorage(projectArray, "projects", exampleProject());

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
  console.log(elem.target.dataset);
  mainScreen.innerHTML = "";
  for (let i = projectArray.length - 1; i >= 0; i--) {
    if (elem.target.dataset.delProjectName === projectArray[i].name) {
      console.log(projectArray[i].tasks);
      taskArray.forEach((item, index, arr) => {
        if (item.project === projectArray[i].name) {
          console.log(index);
          arr.splice(index, 1);
        }
      });
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
