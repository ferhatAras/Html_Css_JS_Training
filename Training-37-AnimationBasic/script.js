const box = document.getElementsByClassName("box")[0];
const playButton = document.getElementById("playButton");
const pauseButton = document.getElementById("pauseButton");
playButton.addEventListener(
  "click",
  () => (box.style.animationPlayState = "running")
);
pauseButton.addEventListener(
  "click",
  () => (box.style.animationPlayState = "paused")
);
