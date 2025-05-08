const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", function () {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Lütfen bir Görev Girin");
    return;
  }

  const li = document.createElement("li");
  li.textContent = taskText;

  // ✅ Her görev için ayrı silme butonu oluştur
  const dltBtn = document.createElement("span");
  dltBtn.textContent = " ❌";
  dltBtn.style.cursor = "pointer";
  dltBtn.style.color = "red";
  dltBtn.style.marginLeft = "10px";

  // ❌'a tıklanınca görev silinsin
  dltBtn.addEventListener("click", function (e) {
    e.stopPropagation(); // li'ye tıklanmasını engelle
    li.remove();
  });

  // li'ye tıklanırsa üstü çizilsin
  li.addEventListener("click", function () {
    li.classList.toggle("done");
  });

  li.appendChild(dltBtn);
  taskList.appendChild(li);
  taskInput.value = "";
});
