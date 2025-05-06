const input = document.querySelector(".input__field");
const inputIcon = document.querySelector(".input__icon");

inputIcon.addEventListener("click", (e) => {
  e.prventDefault();
  if (input.getAttribute("type") == "password") {
    inputIcon.setAttribute("src", "eyes.cls.png");
    input.setAttribute("type", "text");
  } else {
    inputIcon.setAttribute("src", "eyes.on.png");
    input.setAttribute("type", "password");
  }
});
