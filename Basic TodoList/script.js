const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const dltBtn = document.getElementById("DltBtn");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", function () {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Lütfen bir Görev Girin");
    return;
  }
  const li = document.createElement("li");
  li.textContent = taskText;

  // Göreve Tıklanıldığında
  li.addEventListener("click", function () {
    li.classList.toggle("done");
  });
  taskList.appendChild(li);

  taskInput.value = "";
});

dltBtn.addEventListener("click", function () {
  taskList.innerHTML = "";
});
