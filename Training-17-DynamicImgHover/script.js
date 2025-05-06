// // script.js

// // Dinamik olarak resimleri oluştur
// const images = [
//   "img/wolf.jpg",
//   "img/samurai2.jpg",
//   "img/samurai.png",
//   "img/darkness.jpg",
//   "img/dragon3.png",
//   "img/samurai2.jpg",
//   "img/dragon1.png",
//   "img/darkness.jpg",
//   "img/dragon3.png",
//   "img/dragon4.jpg",
// ];

// const listContainer = document.querySelector(".list");

// // Resimleri dinamik olarak ekle
// images.forEach((src) => {
//   const item = document.createElement("div");
//   item.classList.add("item");

//   const img = document.createElement("img");
//   img.src = src;
//   img.alt = "Dynamic Image";

//   item.appendChild(img);
//   listContainer.appendChild(item);
// });

// // Fare hareketine bağlı olarak perspektif efekti
// listContainer.addEventListener("mousemove", (e) => {
//   const rect = listContainer.getBoundingClientRect();
//   const x = e.clientX - rect.left;
//   const y = e.clientY - rect.top;

//   const centerX = rect.width / 2;
//   const centerY = rect.height / 2;

//   const rotateX = ((y - centerY) / centerY) * 10; // Y ekseni dönüşü
//   const rotateY = ((x - centerX) / centerX) * -10; // X ekseni dönüşü

//   listContainer.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
// });

// // Otomatik döngü
// let currentIndex = 0;
// function autoPlay() {
//   const items = document.querySelectorAll(".item img");

//   // Tüm resimlerin parlaklığını sıfırla
//   items.forEach((img) => (img.style.filter = "brightness(0)"));

//   // Mevcut resmi vurgula
//   const currentImage = items[currentIndex];
//   currentImage.style.filter = "brightness(1)";
//   currentImage.style.transform = "scale(1.2)";

//   // Bir sonraki resme geç
//   currentIndex = (currentIndex + 1) % items.length;
// }

// // Otomatik döngüyü başlat
// setInterval(autoPlay, 2000);
