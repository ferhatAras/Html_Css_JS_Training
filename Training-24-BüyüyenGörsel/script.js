const images = document.querySelectorAll(".gallery-image");
const overlay = document.getElementById("overlay");
const expandedImage = document.getElementById("expandedImage");
const closeButton = document.getElementById("closeButton");

// Görsellere tıklanarak büyük görseli açma
images.forEach((image) => {
  image.addEventListener("click", function () {
    expandedImage.src = image.src;
    overlay.style.display = "flex"; // Overlay'i göster
    setTimeout(() => {
      expandedImage.style.transform = "translate(-50%, -50%) scale(1)"; // Animasyonla büyütme
    }, 10);
    document.body.style.overflow = "hidden"; // Sayfa kaydırmasını engelle
  });
});

// Kapatma butonuna tıklanmasıyla overlay'i gizleme
closeButton.addEventListener("click", function () {
  expandedImage.style.transform = "translate(-50%, -50%) scale(0)"; // Görseli küçült
  setTimeout(() => {
    overlay.style.display = "none"; // Overlay'i gizle
    document.body.style.overflow = "auto"; // Sayfa kaydırmasını geri getir
  }, 300);
});

// Overlay dışında bir yere tıklanmasıyla overlay'i gizleme
overlay.addEventListener("click", function (e) {
  // Eğer tıklanan yer overlay'in içindeki görsel değilse
  if (e.target === overlay) {
    expandedImage.style.transform = "translate(-50%, -50%) scale(0)"; // Görseli küçült
    setTimeout(() => {
      overlay.style.display = "none"; // Overlay'i gizle
      document.body.style.overflow = "auto"; // Sayfa kaydırmasını geri getir
    }, 300);
  }
});
