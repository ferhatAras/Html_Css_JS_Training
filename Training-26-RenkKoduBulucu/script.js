const button = document.querySelector("button");
const result = document.querySelector("#color-display");

const colorPicker = async () => {
  const eyeDropper = new EyeDropper();
  const { sRGBHex } = await eyeDropper.open();
  result.innerHTML = sRGBHex;
  document.body.style.background = sRGBHex;
};

button.addEventListener("click", colorPicker);
