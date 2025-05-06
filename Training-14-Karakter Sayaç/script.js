const textarea = document.getElementById("textarea");
const totalCounter = document.getElementById("totalCounter");
const remainingCounter = document.getElementById("remainingCounter");

textarea.addEventListener("input", () => {
  const totalLength = textarea.value.length;
  const maxLength = textarea.getAttribute("maxlength");
  totalCounter.textContent = totalLength;
  remainingCounter.textContent = maxLength - totalLength;
});
