// Oyun alanı, skor ve en yüksek skor elementlerini seçiyoruz
const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highscoreElement = document.querySelector(".high-score");

// Oyun durumunu ve değişkenleri tanımlıyoruz
let gameOver = false; // Oyun bitme durumunu kontrol eden bayrak
let foodX, foodY; // Yem koordinatları
let snakeX = 5, // Yılanın başının X koordinatı
  snakeY = 5; // Yılanın başının Y koordinatı
let velocityX = 0, // Yılanın X eksenindeki hareket hızı
  velocityY = 0; // Yılanın Y eksenindeki hareket hızı
let snakeBody = [[snakeX, snakeY]]; // Yılanın başlangıçtaki konumu
let setIntervalId; // Oyun döngüsünü kontrol etmek için kullanılacak zamanlayıcı
let score = 0; // Oyuncunun skorunu tutan değişken

// Tarayıcıda kayıtlı en yüksek skoru alıyoruz, yoksa 0 atıyoruz
let highScore = localStorage.getItem("high-score") || 0;
highscoreElement.innerText = `Max. Skor: ${highScore}`;

// Yem konumunu rastgele bir pozisyona güncelliyoruz
const updateFoodPosition = () => {
  do {
    // 1-30 arasında rastgele koordinatlar belirliyoruz
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
  } while (
    // Yem yılanın herhangi bir parçasının üstüne denk gelmesin
    snakeBody.some((segment) => segment[0] === foodX && segment[1] === foodY)
  );
};

// Oyunun bitiş durumunda yapılacak işlemler
const handleGameOver = () => {
  clearInterval(setIntervalId); // Oyun döngüsünü durduruyoruz
  alert("Oyun Bitti! Tekrar Oynamak için Tamam'a basın."); // Oyuncuya mesaj gösteriyoruz
  location.reload(); // Sayfayı yeniden yüklüyoruz
};

// Yılanın yönünü değiştiren fonksiyon
const changeDirection = (e) => {
  // Yukarı ok tuşuna basıldığında
  if (e.key === "ArrowUp" && velocityY !== 1) {
    velocityX = 0;
    velocityY = -1;
  }
  // Aşağı ok tuşuna basıldığında
  else if (e.key === "ArrowDown" && velocityY !== -1) {
    velocityX = 0;
    velocityY = 1;
  }
  // Sol ok tuşuna basıldığında
  else if (e.key === "ArrowLeft" && velocityX !== 1) {
    velocityX = -1;
    velocityY = 0;
  }
  // Sağ ok tuşuna basıldığında
  else if (e.key === "ArrowRight" && velocityX !== -1) {
    velocityX = 1;
    velocityY = 0;
  }
};

// Oyun döngüsünü kontrol eden ana fonksiyon
const initGame = () => {
  if (gameOver) return handleGameOver(); // Eğer oyun bitmişse, bitirme işlemini çağır

  // Yemi oyun alanına eklemek için HTML oluşturuyoruz
  let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

  // Eğer yılan yemi yerse
  if (snakeX === foodX && snakeY === foodY) {
    updateFoodPosition(); // Yeni bir yem pozisyonu oluştur
    snakeBody.push([foodY, foodX]); // Yılanın boyunu artır
    score++; // Skoru artır
    // Yeni en yüksek skoru kontrol et ve kaydet
    highScore = score > highScore ? score : highScore;
    localStorage.setItem("high-score", highScore); // En yüksek skoru tarayıcıya kaydet
    scoreElement.innerText = `Skor: ${score}`; // Skoru ekrana yaz
    highscoreElement.innerText = `Max. Skor: ${highScore}`; // Max. skoru ekrana yaz
  }

  // Yılanın başını hareket ettir
  snakeX += velocityX;
  snakeY += velocityY;

  // Yılanın gövdesini bir önceki segmentin pozisyonuna taşı
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) snakeBody[0] = [snakeX, snakeY]; // Baş pozisyonunu güncelle

  // Yılanın oyun alanından çıkması durumunda oyun biter
  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    gameOver = true;
  }

  // Yılanın gövdesinin diğer parçalarıyla çarpışıp çarpışmadığını kontrol et
  for (let i = 0; i < snakeBody.length; i++) {
    html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    if (
      i !== 0 && // Yılanın başı hariç
      snakeBody[0][1] === snakeBody[i][1] && // Aynı Y pozisyonu
      snakeBody[0][0] === snakeBody[i][0] // Aynı X pozisyonu
    ) {
      gameOver = true; // Çarpışma tespit edildi
    }
  }

  // Oyun alanını güncelle
  playBoard.innerHTML = html;
};

// Oyuna başlamak için gerekli başlangıç işlemleri
updateFoodPosition(); // İlk yem pozisyonunu belirle
initGame(); // Oyunu başlat
setIntervalId = setInterval(initGame, 100); // Her 100ms'de bir oyun döngüsünü çağır
document.addEventListener("keyup", changeDirection); // Yön değiştirme olayını dinle
