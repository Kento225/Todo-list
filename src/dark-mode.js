const darkModeBtn = document.querySelector(".dark-mode");
darkModeBtn.addEventListener("click", (e) => {
  darkModeEnable();
});

let darkMode = false;

const darkModeEnable = function () {
  const root = document.querySelector(":root");

  const darkModeText = "#FEFFEC";
  const darkModeBackground = "#0f0e12";
  const darkModeInputBack = "#262629";

  const lightModeText = "#0f0e12";
  const lightModeBackground = "#ffffff";
  const lightModeInputBack = "#DBDBDB";

  if (darkMode === false) {
    root.style.setProperty("--background-clr", darkModeBackground);
    root.style.setProperty("--text-clr", darkModeText);
    root.style.setProperty("--input-background", darkModeInputBack);

    darkMode = true;
  } else if (darkMode === true) {
    root.style.setProperty("--background-clr", lightModeBackground);
    root.style.setProperty("--text-clr", lightModeText);
    root.style.setProperty("--input-background", lightModeInputBack);

    darkMode = false;
  }
};
