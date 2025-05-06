// Tüm kutu elemanlarını seçiyoruz
let boxes = document.querySelectorAll(".box");

// Oyunun başlangıç durumu
let turn = "X"; // Oyuncu X ile başlar
let isGameOver = false; // Oyun henüz bitmedi

// Her bir kutu için tıklama olayı ekliyoruz
boxes.forEach((e) => {
  e.innerHTML = ""; // Kutular başlangıçta boş olacak
  e.addEventListener("click", () => {
    // Eğer oyun bitmemişse ve kutu boşsa
    if (!isGameOver && e.innerHTML === "") {
      e.innerHTML = turn; // Şu anki oyuncunun sembolünü kutuya yerleştir
      cheakWin(); // Kazananı kontrol et
      cheackDraw(); // Beraberlik durumunu kontrol et
      changeTurn(); // Oyuncu sırasını değiştir
    }
  });
});

// Oyuncu sırasını değiştiren fonksiyon
function changeTurn() {
  if (turn == "X") {
    turn = "0"; // Eğer X oynadıysa, sıradaki oyuncu O olur
    document.querySelector(".bg").style.left = "85px"; // "O" sembolü için renk kutusunu kaydır
  } else {
    turn = "X"; // Eğer O oynadıysa, sıradaki oyuncu X olur
    document.querySelector(".bg").style.left = "0"; // "X" sembolü için renk kutusunu geri kaydır
  }
}

// Kazananı kontrol eden fonksiyon
function cheakWin() {
  let winConditions = [
    [0, 1, 2], // Birinci satır
    [3, 4, 5], // İkinci satır
    [6, 7, 8], // Üçüncü satır
    [0, 3, 6], // Birinci sütun
    [1, 4, 7], // İkinci sütun
    [2, 5, 8], // Üçüncü sütun
    [0, 4, 8], // Çapraz (sol üstten sağ alta)
    [2, 4, 6], // Çapraz (sağ üstten sol alta)
  ];

  // Kazanma koşullarını döngüyle kontrol et
  for (let i = 0; i < winConditions.length; i++) {
    let v0 = boxes[winConditions[i][0]].innerHTML; // Birinci kutunun içeriği
    let v1 = boxes[winConditions[i][1]].innerHTML; // İkinci kutunun içeriği
    let v2 = boxes[winConditions[i][2]].innerHTML; // Üçüncü kutunun içeriği
    if (v0 != "" && v0 === v1 && v0 === v2) {
      // Eğer kutular aynı sembol ile dolmuşsa
      isGameOver = true; // Oyun bitmiştir
      document.querySelector("#results").innerHTML = turn + " Win"; // Kazananı ekrana yazdır
      document.querySelector("#play-again").style.display = "inline"; // Yeniden başlatma butonunu göster

      // Kazanan kutuları vurgula
      for (let j = 0; j < 3; j++) {
        boxes[winConditions[i][j]].style.backgroundColor = "#08d9d6"; // Kazanan kutuları vurgula
        boxes[winConditions[i][j]].style.color = "#000"; // Rengi siyah yap
        boxes[winConditions[i][j]].classList.add("winner"); // Animasyonu ekle
      }

      // Konfeti animasyonu başlat
      fireConfetti();
    }
  }
}

// Beraberlik durumunu kontrol eden fonksiyon
function cheackDraw() {
  if (!isGameOver) {
    let isDraw = true; // Başlangıçta oyun beraberlik durumunda diye kabul edilir
    boxes.forEach((e) => {
      if (e.innerHTML === "") isDraw = false; // Eğer boş bir kutu varsa, beraberlik değil
    });
    if (isDraw) {
      isGameOver = true; // Oyun bitmiştir
      document.querySelector("#results").innerHTML = turn + " Draw"; // Beraberlik mesajını ekrana yazdır
      document.querySelector("#play-again").style.display = "inline"; // Yeniden başlatma butonunu göster
    }
  }
}

// Yeniden başlatma butonuna tıklama olayı
document.querySelector("#play-again").addEventListener("click", () => {
  isGameOver = false; // Oyun yeniden başlar
  turn = "X"; // Oyuncu sırası tekrar "X" olarak başlar
  document.querySelector(".bg").style.left = "0"; // "X" sembolü için renk kutusunu sıfırla
  document.querySelector("#results").innerHTML = ""; // Sonuç yazısını temizle
  document.querySelector("#play-again").style.display = "none"; // Yeniden başlatma butonunu gizle

  // Tüm kutuları temizle ve varsayılan renkleri geri yükle
  boxes.forEach((e) => {
    e.innerHTML = "";
    e.style.removeProperty("background-color"); // Vurguyu kaldır
    e.style.color = "#fff"; // Yazı rengini beyaz yap
  });
});

// Konfeti animasyonunu başlatan fonksiyon
function fireConfetti() {
  const duration = 2 * 1000; // Konfeti 2 saniye sürecek
  const end = Date.now() + duration;

  const colors = ["#ff2e63", "#08d9d6", "#ff9f1c", "#252a34"]; // Konfeti renkleri

  // Konfeti animasyonunu başlat
  (function frame() {
    confetti({
      particleCount: 5, // Konfeti tanelerinin sayısı
      angle: 60, // Konfeti yayılma açısı
      spread: 55, // Konfeti yayılma mesafesi
      origin: { x: 0 }, // Konfeti yayılma başlangıç noktası (soldan)
      colors,
    });
    confetti({
      particleCount: 5, // Diğer konfeti yayılımı
      angle: 120, // Konfeti yayılma açısı (sağdan)
      spread: 55,
      origin: { x: 1 },
      colors,
    });

    // Eğer süre bitmediyse, animasyonu devam ettir
    if (Date.now() < end) {
      requestAnimationFrame(frame); // Animasyonu devam ettir
    }
  })();
}
