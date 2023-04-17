import { projectArray } from "./project";
import { taskArray } from "./tasks";
import { deleteTask } from "./tasks";

const sidebar = document.querySelector(".sidebar");
export const mainScreen = document.querySelector(".main-screen");

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

      const sidebarProjects = document.querySelectorAll(".project-div");
      sidebarProjects.forEach((element) =>
        element.addEventListener("click", (e) => {
          renderProjectMain(e.currentTarget);
          const taskDeletes = document.querySelectorAll(".task-card-del");
          taskDeletes.forEach((element) =>
            element.addEventListener("click", (e) => {
              deleteTask(e);
            })
          );
        })
      );
    }
}

export function clearMainWindow() {
  mainScreen.innerHTML = "";
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
    projectArray.forEach((element) => {
      if (element.name === taskArray[i].project) {
        element.tasks.push(taskArray[i].name);
      }
    });
    taskLi.dataset.sbTask = taskArray[i].name;
    taskLi.style.backgroundColor = taskArray[i].backgroundClr;
    taskLi.style.color = taskArray[i].textClr;
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

function renderProjectMain(elem) {
  mainScreen.innerHTML = "";
  const mainProjectDiv = document.createElement("div");
  mainProjectDiv.classList.add("main-project-div");
  mainScreen.appendChild(mainProjectDiv);

  const mainProjectHeader = document.createElement("h1");
  mainProjectHeader.classList.add("main-project-header");
  projectArray.forEach((element) => {
    if (element.name === elem.dataset.projectName) {
      const pNameMain = element.name;
      mainProjectHeader.textContent = pNameMain;
      mainProjectDiv.appendChild(mainProjectHeader);
    }
  });
  const mainProjectDesc = document.createElement("div");
  mainProjectDesc.classList.add("main-project-desc");
  projectArray.forEach((element) => {
    if (element.name === elem.dataset.projectName) {
      const pDescMain = element.desc;
      mainProjectDesc.textContent = pDescMain;
      mainProjectDiv.appendChild(mainProjectDesc);
    }
  });
  renderTaskCard(projectArray, taskArray, mainProjectDiv, elem);
}

export function renderTaskCard(projectArray, taskArray, mainProjectDiv, elem) {
  const taskCardDiv = document.createElement("div");
  taskCardDiv.classList.add("task-card-div");

  const tasksToRender = [];
  for (let i = 0; i < projectArray.length; i++) {
    if (projectArray[i].name === elem.dataset.projectName) {
      tasksToRender.push(projectArray[i].tasks);
    }
  }
  for (let j = 0; j < tasksToRender[0].length; j++) {
    console.log(tasksToRender);
    const index = taskArray.findIndex(
      (element) => element.name === tasksToRender[0][j]
    );
    console.log(index);
    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card");
    taskCard.dataset.task = taskArray[index].name;
    taskCard.style.backgroundColor = taskArray[index].backgroundClr;
    taskCard.style.color = taskArray[index].textClr;

    const taskCardHeader = document.createElement("h3");
    taskCardHeader.classList.add("task-card-header");
    taskCardHeader.textContent = taskArray[index].name;

    const taskCardDesc = document.createElement("p");
    taskCardDesc.classList.add("task-card-desc");
    taskCardDesc.textContent = taskArray[index].desc;

    const taskCardDate = document.createElement("p");
    taskCardDate.classList.add("task-card-date");
    taskCardDate.textContent = taskArray[index].date;

    const taskCardDel = document.createElement("div");
    taskCardDel.classList.add("task-card-del");
    taskCardDel.textContent = "X";
    taskCardDel.dataset.cardToDelete = taskArray[index].name;

    taskCardDiv.appendChild(taskCard);
    taskCard.appendChild(taskCardHeader);
    taskCard.appendChild(taskCardDesc);
    taskCard.appendChild(taskCardDate);
    taskCard.appendChild(taskCardDel);
    mainProjectDiv.appendChild(taskCardDiv);
  }
}
