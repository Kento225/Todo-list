import { updateStorage } from "./project";

const darkModeBtn = document.querySelector(".dark-mode");
darkModeBtn.addEventListener("click", (e) => {
  darkModeEnable();
});

if (!localStorage.getItem("dark-mode")) {
  localStorage.setItem("dark-mode", "light");
}

let darkMode = localStorage.getItem("dark-mode");

const darkModeEnable = function () {
  const root = document.querySelector(":root");

  const darkModeText = "#FEFFEC";
  const darkModeBackground = "#0f0e12";
  const darkModeInputBack = "#262629";

  const lightModeText = "#0f0e12";
  const lightModeBackground = "#ffffff";
  const lightModeInputBack = "#DBDBDB";

  if (darkMode === "light") {
    root.style.setProperty("--background-clr", darkModeBackground);
    root.style.setProperty("--text-clr", darkModeText);
    root.style.setProperty("--input-background", darkModeInputBack);

    darkMode = "dark";
  } else if (darkMode === "dark") {
    root.style.setProperty("--background-clr", lightModeBackground);
    root.style.setProperty("--text-clr", lightModeText);
    root.style.setProperty("--input-background", lightModeInputBack);

    darkMode = "light";
  }
  localStorage.setItem("dark-mode", darkMode);
};

const darkModeOnLaunch = function () {
  const root = document.querySelector(":root");

  const darkModeText = "#FEFFEC";
  const darkModeBackground = "#0f0e12";
  const darkModeInputBack = "#262629";

  const lightModeText = "#0f0e12";
  const lightModeBackground = "#ffffff";
  const lightModeInputBack = "#DBDBDB";

  if (darkMode === "dark") {
    root.style.setProperty("--background-clr", darkModeBackground);
    root.style.setProperty("--text-clr", darkModeText);
    root.style.setProperty("--input-background", darkModeInputBack);
  } else if (darkMode === "light") {
    root.style.setProperty("--background-clr", lightModeBackground);
    root.style.setProperty("--text-clr", lightModeText);
    root.style.setProperty("--input-background", lightModeInputBack);
  }
};
darkModeOnLaunch();
