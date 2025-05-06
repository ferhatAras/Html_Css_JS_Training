// Doğru cevapları içeren dizi
const correctAnswers = ["8", "10", "3", "25"];

// DOM'dan formu seçer
const form = document.querySelector(".question-form");
// DOM'dan sonuç bölümünü seçer
const result = document.querySelector(".result");
// DOM'dan başarı mesajını seçer
const successMessage = document.querySelector("#successMessage");
// DOM'dan butonu seçer
const button = document.querySelector(".btn");

// Form gönderildiğinde tetiklenen olay
form.addEventListener("submit", (e) => {
  // Formun standart gönderim işlemi engellenir
  e.preventDefault();

  // Başlangıç puanı 0 olarak ayarlanır
  let score = 0;
  // Kullanıcı cevaplarını alır
  const userAnsers = [
    form.q1.value,
    form.q2.value,
    form.q3.value,
    form.q4.value,
  ];

  // Her bir cevabı kontrol eder
  userAnsers.forEach((answer, index) => {
    // Eğer cevap doğru ise, puanı artırır
    if (answer === correctAnswers[index]) {
      score += 25;
    }
  });

  // Eğer puan 100 ise, başarı mesajını gösterir ve butonu devre dışı bırakır
  if (score == 100) {
    successMessage.classList.remove("d-none");
    button.setAttribute("disabled", "");
  }
  // Sonuç bölümünü gösterir ve puanı ekrana yazar
  result.classList.remove("d-none");
  result.querySelector("span").textContent = `${score}%`;
});
