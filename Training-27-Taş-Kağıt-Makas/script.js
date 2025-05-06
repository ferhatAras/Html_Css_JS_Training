// HTML'deki oyun kutusu, kullanıcı sonucu, CPU sonucu ve seçenek görsellerini seçiyoruz.
const gameContainer = document.querySelector(".container"),
  userResult = document.querySelector(".user_result img"),
  cpuResult = document.querySelector(".cpu_result img"),
  Result = document.querySelector(".result"),
  optionImages = document.querySelectorAll(".option_image");

// Her bir seçenek görseli için tıklama olayı tanımlıyoruz.
optionImages.forEach((Image, index) => {
  Image.addEventListener("click", (e) => {
    // Tıklanan görsele "active" sınıfı ekleniyor (seçili hale geliyor).
    Image.classList.add("active");

    // Kullanıcı ve CPU için varsayılan olarak taş görseli gösteriliyor.
    userResult.src = cpuResult.src = "images/rock.png";
    Result.textContent = "Wait.."; // Oyun sürecinde "Wait.." mesajı gösteriliyor.

    // Diğer seçeneklerin "active" sınıfı kaldırılıyor.
    optionImages.forEach((image2, index2) => {
      if (index !== index2) image2.classList.remove("active");
    });

    // Oyun animasyonu başlatılıyor.
    gameContainer.classList.add("start");

    // 2.5 saniyelik bir gecikmeden sonra sonuç belirleniyor.
    let time = setTimeout(() => {
      gameContainer.classList.remove("start");

      // Kullanıcının seçtiği görsel alınarak gösteriliyor.
      let imageSrc = e.target.querySelector("img").src;
      userResult.src = imageSrc;

      // CPU'nun rastgele bir seçim yapması sağlanıyor.
      let rondomNumber = Math.floor(Math.random() * 3);
      let cpuImages = [
        "images/rock.png",
        "images/paper.png",
        "images/scissors.png",
      ];
      cpuResult.src = cpuImages[rondomNumber];

      // CPU ve Kullanıcı değerleri belirleniyor.
      let cpuValue = ["R", "P", "S"][rondomNumber];
      let userValue = ["R", "P", "S"][index];

      // Tüm sonuçlar için olasılıklar tanımlanıyor.
      let outcomes = {
        RR: "Berabere",
        RP: "CPU",
        RS: "USER",
        PP: "Berabere",
        PR: "User",
        PS: "Cpu",
        SS: "Berabere",
        SR: "CPU",
        SP: "USER",
      };

      // Kazanan belirleniyor ve sonuç mesajı gösteriliyor.
      let outcomesValue = outcomes[userValue + cpuValue];
      Result.textContent =
        userValue === cpuValue ? "Berabere" : `${outcomesValue} Kazandı`;

      // Eğer kullanıcı kazanırsa konfetti efekti çalıştırılıyor.
      if (outcomesValue === "USER" || outcomesValue === "User") {
        launchConfetti();
      }
    }, 300);
  });
});

// Konfetti efektini çalıştıran fonksiyon.
function launchConfetti() {
  const confettiSettings = { target: "confetti-canvas" };
  const confetti = new ConfettiGenerator(confettiSettings);
  confetti.render();
}
