import { projectArray } from "./project";

const mainScreen = document.querySelector(".main-screen");
const sidebar = document.querySelector(".sidebar");

export function renderProjectSb(projectArray) {
  for (let i = 0; i < projectArray.length; i++)
    if (projectArray[i].rendered === false) {
      //Creates a div to store project header and tasks within it
      const projectDiv = document.createElement("div");
      projectDiv.classList.add("project-div");
      projectDiv.dataset.projectName = `${projectArray[i].name}`;
      sidebar.appendChild(projectDiv);

      //Creates a header for the project
      const projectHeader = document.createElement("h3");
      projectHeader.textContent = `${projectArray[i].name}`;
      projectDiv.appendChild(projectHeader);

      //Creates unordered list to house tasks
      const projectUl = document.createElement("ul");
      projectUl.classList.add("project-ul");
      projectUl.dataset.projectName = `${projectArray[i].name}`;
      projectDiv.appendChild(projectUl);

      projectArray[i].rendered = true;
    }
}

export function renderTask(taskArray) {
  // Puts all unordered lists of projects into an array
  const projectNodeList = document.querySelectorAll(".project-ul");
  for (let i = 0; i < taskArray.length; i++) {
    if (taskArray[i].rendered === true) {
      continue;
    }
    //Creates a list item for a task, and appends it into project list
    const taskLi = document.createElement("li");
    taskLi.classList.add("task-li");
    if (taskArray[i].important === true) {
      taskLi.style.borderLeft = "solid 5px orange";
    }
    projectArray.forEach((element) => {
      if (element.name === taskArray[i].project) {
        element.tasks.push(taskArray[i].name);
      }
    });
    taskLi.textContent = `${taskArray[i].name}`;
    projectNodeList.forEach((element) => {
      if (element.dataset.projectName === taskArray[i].project) {
        element.appendChild(taskLi);
        taskArray[i].rendered = true;
        return element;
      }
    });
  }
}

export function renderProjectMain(event, projectArray) {
  const mainProjectDiv = document.createElement("div");
  mainProjectDiv.classList.add("main-project-div");
  mainScreen.appendChild(mainProjectDiv);

  const mainProjectHeader = document.createElement("h1");
  mainProjectHeader.classList.add("main-project-header");
  mainProjectHeader.textContent = `${event.target.dataset.projectName}`;
  mainProjectDiv.appendChild(mainProjectHeader);

  const mainProjectDesc = document.createElement("div");
  mainProjectDesc.classList.add("main-project-desc");
  const descMain = projectArray.forEach((element) => {
    if (element.name === event.target.dataset.projectName) {
      return element.desc;
    }
  });
  mainProjectDesc.textContent = descMain;
  mainProjectDiv.appendChild(mainProjectDesc);
}
