import { projectArray } from "./project";
import { taskArray } from "./tasks";
import { deleteTask } from "./tasks";
import { projectDelete } from "./project";
import { updateStorage } from "./project";

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

      const projectDeleteBtn = document.createElement("div");
      projectDeleteBtn.classList.add("project-del");
      projectDeleteBtn.dataset.delProjectName = `${projectArray[i].name}`;
      projectDeleteBtn.textContent = "X";
      projectDiv.appendChild(projectDeleteBtn);
      projectDeleteBtn.addEventListener("click", (e) => {
        projectDelete(e);
        e.stopPropagation();
      });

      projectArray[i].rendered = true;

      //Adds eventListeners to projects on the sidebar
      const sidebarProjects = document.querySelectorAll(".project-div");
      sidebarProjects.forEach((element) =>
        element.addEventListener("click", (e) => {
          //Renders a clicked project on the main screen
          renderProjectMain(e.currentTarget);
          //Adds eventListeners to delete buttons on rendered tasks
          const taskDeletes = document.querySelectorAll(".task-card-del");
          taskDeletes.forEach((element) =>
            element.addEventListener("click", (e) => {
              //Deletes a clicked task from DOM and all the arrays its in
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
export function renderTask(projectArray, taskArray) {
  // Puts all unordered lists of projects into an array
  const projectNodeList = document.querySelectorAll(".project-ul");

  taskArray.forEach((task) => {
    if (task.rendered === true) {
      return;
    }
    console.log(projectArray);
    //Creates a list item for a task, and appends it into project list
    const taskLi = document.createElement("li");
    taskLi.classList.add("task-li");
    projectArray
      .filter((project) => project.name === task.project)
      .forEach((element) => element.tasks.push(task));

    taskLi.dataset.sbTask = task.name;
    taskLi.style.backgroundColor = task.backgroundClr;
    taskLi.style.color = task.textClr;
    taskLi.textContent = `${task.name}`;
    projectNodeList.forEach((element) => {
      if (element.dataset.projectName === task.project) {
        element.appendChild(taskLi);
        task.rendered = true;
      }
    });
  });
  console.log(projectArray);
  console.log(taskArray);
  updateStorage(projectArray, "projects");
}

export function renderTasksOnLaunch() {
  const projectNodeList = document.querySelectorAll(".project-ul");

  projectArray.forEach((project) => {
    project.tasks.forEach((task) => {
      const taskLi = document.createElement("li");
      taskLi.classList.add("task-li");
      taskLi.dataset.sbTask = task.name;
      taskLi.style.backgroundColor = task.backgroundClr;
      taskLi.style.color = task.textClr;
      taskLi.textContent = `${task.name}`;
      task.rendered = true;
      projectNodeList.forEach((element) => {
        if (element.dataset.projectName === task.project) {
          element.appendChild(taskLi);
        }
      });
    });
  });
}

//Renders a clicked project on the main screen
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

//Renders tasks that are linked to the project on main screen
export function renderTaskCard(projectArray, taskArray, mainProjectDiv, elem) {
  const taskCardDiv = document.createElement("div");
  taskCardDiv.classList.add("task-card-div");

  for (let i = 0; i < projectArray.length; i++) {
    if (projectArray[i].name === elem.dataset.projectName) {
      for (let j = 0; j < projectArray[i].tasks.length; j++) {
        const taskCard = document.createElement("div");
        taskCard.classList.add("task-card");
        taskCard.dataset.task = projectArray[i].tasks[j].name;
        taskCard.style.backgroundColor = projectArray[i].tasks[j].backgroundClr;
        taskCard.style.color = projectArray[i].tasks[j].textClr;

        const taskCardHeader = document.createElement("h3");
        taskCardHeader.classList.add("task-card-header");
        taskCardHeader.textContent = projectArray[i].tasks[j].name;

        const taskCardDesc = document.createElement("p");
        taskCardDesc.classList.add("task-card-desc");
        taskCardDesc.textContent = projectArray[i].tasks[j].desc;

        const taskCardDate = document.createElement("p");
        taskCardDate.classList.add("task-card-date");
        taskCardDate.textContent = projectArray[i].tasks[j].date;

        const taskCardDel = document.createElement("div");
        taskCardDel.classList.add("task-card-del");
        taskCardDel.textContent = "X";
        taskCardDel.dataset.cardToDelete = projectArray[i].tasks[j].name;

        taskCardDiv.appendChild(taskCard);
        taskCard.appendChild(taskCardHeader);
        taskCard.appendChild(taskCardDesc);
        taskCard.appendChild(taskCardDate);
        taskCard.appendChild(taskCardDel);
        mainProjectDiv.appendChild(taskCardDiv);
      }
    }
  }
}
