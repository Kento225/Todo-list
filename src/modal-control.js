const clearFields = (formArr) => {
  //Clears all the fields in the provided form
  for (let i = 0; i < formArr.length; i++) {
    formArr[i].value = "";
  }
};

export function modalOpen(modalName) {
  modalName.style.display = "flex";
}
export function modalClose(modalName, formArr) {
  modalName.style.display = "none";
  clearFields(formArr);
}
