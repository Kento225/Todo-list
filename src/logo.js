const logoLetters = document.querySelectorAll(".logo-letter");

logoLetters.forEach((letter) => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  letter.style.color = `#${randomColor}`;
});
