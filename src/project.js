import { modalClose } from "./modal-control";
import { modalOpen } from "./modal-control";
import { renderProjectSb } from "./render";
import { taskArray } from "./tasks";
import { clearMainWindow } from "./render";

// Get all elements in project creation form
const pName = document.querySelector("#pname");
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
  renderedOption: false,
  tasks: [],
};
export const projectArray = [project];

// Factory function to create project objects
const createProject = (pName, pDesc) => {
  return {
    name: pName.value,
    desc: pDesc.value,
    rendered: false,
    renderedOption: false,
    tasks: [],
  };
};

projectSubmitBtn.addEventListener("click", (e) => {
  if (pName.value === "") {
    return;
  }
  const project = createProject(pName, pDesc);
  projectArray.push(project);
  modalClose(projectModal, pFormArr);
  renderProjectSb(projectArray, taskArray);
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

renderProjectSb(projectArray);
