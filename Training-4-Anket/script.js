const correctAnswers = ["E", "E", "E", "E"];
const result = document.querySelector(".result");
const form = document.querySelector(".question-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let score = 0;
  const userAnwers = [
    form.q1.value,
    form.q2.value,
    form.q3.value,
    form.q4.value,
  ];
  userAnwers.forEach((answer, index) => {
    if (answer === correctAnswers[index]) {
      score += 25;
    }
  });
  //   console.log(score);
  result.classList.remove("d-none");
  let puan = 0;
  const bastir = setInterval(() => {
    result.querySelector("span").textContent = `${puan}%`;
    if (puan == score) {
      clearInterval(bastir);
    } else {
      puan++;
    }
  }, 15);
});

// setTimeout(() => {
//   console.log("Ferhat");
// }, 2000);

// setInterval(() => {
//   console.log("Ferhat");
// }, 1000);
// let i = 0;
// const bastir = setInterval(() => {
//   console.log("Ferhat");
//   i++;
//   if (i == 4) {
//     clearInterval(bastir);
//   }
// }, 1000);
