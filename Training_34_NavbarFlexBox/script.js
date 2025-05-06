document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.querySelector(".navigation");

  menuToggle.addEventListener("click", function () {
    if (navMenu.classList.contains("active")) {
      navMenu.style.maxHeight = "0";
      navMenu.style.opacity = "0";
      navMenu.style.transform = "translateY(-10px)";
      setTimeout(() => navMenu.classList.remove("active"), 700); // Kapanma süresi 0.7s
    } else {
      navMenu.classList.add("active");
      navMenu.style.maxHeight = "300px"; // Menü içeriğine göre değiştirilebilir
      navMenu.style.opacity = "1";
      navMenu.style.transform = "translateY(0)";
    }
  });
});
