const counter = document.querySelector(".counter");
const loadingbarfront = document.querySelector(".Loadingbarfront");

let number = 0;

updateNumber();

function updateNumber() {
  counter.textContent = number + "%";
  loadingbarfront.style.width = number + "%";
  number++;

  if (number < 101) {
    setTimeout(updateNumber, 30);
  }
}
