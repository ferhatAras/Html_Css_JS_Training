const acordions = document.querySelectorAll(".accordion");

acordions.forEach((acordion) => {
  const accordionButton = acordion.querySelector(".accordionButton");
  accordionButton.addEventListener("click", () => {
    acordion.querySelector(".minusIcon").classList.toggle("active");
    acordion.querySelector(".plusIcon").classList.toggle("active");
    acordion.querySelector(".accordionTitletext").classList.toggle("active");
  });
});
