import { taskArray } from "./tasks";
import { renderDue } from "./render";

import isToday from "date-fns/isToday";
import parseISO from "date-fns/parseISO";
import isThisWeek from "date-fns/isThisWeek";

const dueToday = () => {
  const dueTodayArr = taskArray.filter((task) => isToday(parseISO(task.date)));
  console.log(dueTodayArr);
  renderDue(dueTodayArr);
};

const dueTodayBtn = document.querySelector(".due-today");
dueTodayBtn.addEventListener("click", dueToday);

const dueWeek = () => {
  const dueWeekArr = taskArray.filter((task) =>
    isThisWeek(parseISO(task.date))
  );
  console.log(dueWeekArr);
  renderDue(dueWeekArr);
};

const dueWeekBtn = document.querySelector(".due-seven");
dueWeekBtn.addEventListener("click", dueWeek);

const allTasks = () => {
  renderDue(taskArray);
};

const allTaskBtn = document.querySelector(".all-tasks");
allTaskBtn.addEventListener("click", allTasks);
