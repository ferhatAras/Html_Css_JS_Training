const button = document.querySelector("button");
const mainPopup = document.querySelector(".main-popup");
const close = document.querySelector(".popup-close");

// Popup'u açma
button.addEventListener("click", () => {
  mainPopup.style.display = "block";
});

// Popup'u kapatma (X butonu)
close.addEventListener("click", () => {
  mainPopup.style.display = "none";
});

// Popup dışında bir yere tıklandığında kapatma
mainPopup.addEventListener("click", (e) => {
  if (e.target === mainPopup) {
    mainPopup.style.display = "none";
  }
});
