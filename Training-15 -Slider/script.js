const nextIcon = document.querySelector(".next");
const prevIcon = document.querySelector(".prev");
const imageContainer = document.querySelector(".imageContainer");
const imgs = imageContainer.querySelectorAll("img");

let currentImg = 1;
let intervalTime = 3000; // 3 saniye
let sliderInterval;

// Manuel geçiş için event listener'lar
nextIcon.addEventListener("click", () => {
  currentImg++;
  resetInterval(); // Manuel geçişte otomatik geçişi resetler
  updateImg();
});

prevIcon.addEventListener("click", () => {
  currentImg--;
  resetInterval();
  updateImg();
});

// Görüntüyü güncelleyen fonksiyon
function updateImg() {
  if (currentImg > imgs.length) {
    currentImg = 1; // Başa döner
  } else if (currentImg < 1) {
    currentImg = imgs.length; // Sona döner
  }

  imageContainer.style.transform = `translateX(-${(currentImg - 1) * 700}px)`;
  imageContainer.style.transition = "transform 0.5s ease-in-out"; // Yavaş geçiş
}

// Otomatik geçiş fonksiyonu
function startSlider() {
  sliderInterval = setInterval(() => {
    currentImg++;
    updateImg();
  }, intervalTime);
}

// Manuel geçişte otomatik geçişi sıfırlamak için fonksiyon
function resetInterval() {
  clearInterval(sliderInterval);
  startSlider(); // Otomatik geçişi yeniden başlat
}

// Slider'ı başlat
startSlider();
