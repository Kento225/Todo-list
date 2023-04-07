import { projectArray } from "./project";

const sidebar = document.querySelector(".sidebar");

export function renderProjectSb(projectArray) {
  for (let i = 0; i < projectArray.length; i++)
    if (projectArray[i].rendered === false) {
      //Creates a div to store project header and tasks within it
      const projectDiv = document.createElement("div");
      projectDiv.classList.add("project-div");
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
