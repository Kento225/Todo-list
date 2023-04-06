const taskModal = document.querySelector(".tmodal");

const taskMdlOpen = document.querySelector(".task-button");

const tForm = document.querySelector(".tmodal-content");

export const tFormArr = tForm.elements;

const clearFields = (formArr) => {
  for (let i = 0; i < tFormArr.length; i++) {
    formArr[i].value = "";
  }
};

function modalOpen(modalName) {
  modalName.style.display = "flex";
}
export function modalClose(modalName, formArr) {
  modalName.style.display = "none";
  clearFields(formArr);
}

export function mdlCloseWindow(event, modalName) {
  if (event.target === modalName) {
    modalClose(modalName);
  } else {
    return;
  }
}

taskMdlOpen.addEventListener("click", (e) => {
  modalOpen(taskModal);
});

window.addEventListener("click", (e) => {
  mdlCloseWindow(e, taskModal);
});
