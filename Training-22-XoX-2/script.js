const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const turnBox = document.querySelector(".turn-box"); // Oyuncu sırası göstergesi

let currentPlayer = "X";
// Oyun Tahtasını temsil eden dizi ve başlangıçta boşluklarla dolduruluyor
let gameBoard = ["", "", "", "", "", "", "", "", ""];
// Oyunun bitip bitmediğini belirlemek için değişken
let gameIsOver = false;

// Kazanma Durumlarını kontrol eden fonksiyon
function checkWin() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      gameIsOver = true;
      message.textContent = `${currentPlayer} KAZANDI`;

      // Kazanan hücreleri işaretle
      cells[a].classList.add("win");
      cells[b].classList.add("win");
      cells[c].classList.add("win");

      // Konfeti sağdan ve soldan patlasın
      confetti({
        particleCount: 600, // Daha fazla konfeti
        spread: 180, // Daha geniş yayılma
        origin: { x: 0, y: 0.5 }, // Soldan patlama
        colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00"],
        shapes: ["circle", "square"],
        gravity: 1.2, // Daha hızlı düşüş
        drift: 0.2, // Daha fazla sağa/sola kayma
        zIndex: 9999, // Konfeti'nin diğer öğelerin önünde olmasını sağla
      });
      confetti({
        particleCount: 600, // Daha fazla konfeti
        spread: 180, // Daha geniş yayılma
        origin: { x: 1, y: 0.5 }, // Sağdan patlama
        colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00"],
        shapes: ["circle", "square"],
        gravity: 1.2, // Daha hızlı düşüş
        drift: 0.2, // Daha fazla sağa/sola kayma
        zIndex: 9999, // Konfeti'nin diğer öğelerin önünde olmasını sağla
      });

      return;
    }
  }
  if (!gameBoard.includes("")) {
    gameIsOver = true;
    message.textContent = "OYUN BERABERE";
  }
}

// Hareket yapma fonksiyonu
function makeMove(cellIndex) {
  if (!gameBoard[cellIndex] && !gameIsOver) {
    gameBoard[cellIndex] = currentPlayer;
    cells[cellIndex].textContent = currentPlayer;
    cells[cellIndex].classList.add(currentPlayer);

    // Kazanma durumunu kontrol et
    checkWin();

    // Eğer oyun bitmediyse oyuncu sırasını değiştir
    if (!gameIsOver) {
      changeTurn();
    }
  }
}

// Oyuncu sırasını değiştiren fonksiyon
function changeTurn() {
  // Oyuncu sırasını değiştir
  currentPlayer = currentPlayer === "X" ? "O" : "X";

  // Sıra göstergesini güncelle
  turnBox.textContent = `${currentPlayer}`;
  document.querySelector(".bg").style.left =
    currentPlayer === "X" ? "0" : "85px";
}

// Oyunu yeniden başlatma fonksiyonu
function restartGame() {
  currentPlayer = "X";
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameIsOver = false;
  message.textContent = "";

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("win", "X", "O");
  });

  // Sıra göstergesini sıfırla
  turnBox.textContent = `${currentPlayer}`;
  document.querySelector(".bg").style.left = "0";
}
