// Form elemanlarını DOM'dan seçiyoruz
const form = document.getElementById("form");
const username = document.getElementById("username");
const mail = document.getElementById("mail");
const password = document.getElementById("password");
const phone = document.getElementById("phone");
const repassword = document.getElementById("repassword");
const successMessage = document.getElementById("successMessage");

// Hatalı input olduğunda stil ve hata mesajını ayarlayan fonksiyon
function error(input, message) {
  input.className = "form-control is-invalid"; // Bootstrap sınıfı ile kırmızı kenarlık
  const div = input.nextElementSibling; // input'tan sonraki element (hata mesajı için)
  div.innerText = message; // Hata mesajı yazılır
  div.className = "invalid-feedback"; // Bootstrap hata mesajı görünümü
}

// Geçerli input olduğunda yeşil onay stilini ekleyen fonksiyon
function succes(input) {
  input.className = "form-control is-valid"; // Bootstrap yeşil kenarlık
}

// E-posta formatını kontrol eden fonksiyon
const checkEmail = (input) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value)) {
    succes(input); // E-posta doğruysa
  } else {
    error(input, "Incorrect e-mail address"); // Yanlışsa hata göster
  }
};

// Gerekli alanları boş bırakılmış mı diye kontrol eder
function checkRequired(inputs) {
  inputs.forEach(function (input) {
    if (input.value.trim() === "") {
      error(input, `${input.id} is required.`); // Boşsa hata göster
    } else {
      succes(input); // Doluysa başarılı olarak işaretle
    }
  });
}

// Girdi uzunluğunu kontrol eder (min ve max karakter sayısı)
function checkLength(input, min, max) {
  if (input.value.length < min) {
    error(input, `${input.id} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    error(input, `${input.id} must be at most ${max} characters`);
  } else {
    succes(input); // Uygun uzunluktaysa başarılı olarak işaretle
  }
}

// Telefon numarası 10 haneli mi kontrol eder
function checkPhone(input) {
  var exp = /^\d{10}$/; // Sadece 10 rakam
  if (!exp.test(input.value)) {
    error(input, "Phone number must be exactly 10 digits");
  } else {
    succes(input);
  }
}

// Şifreler aynı mı ve tekrar şifresi boş mu kontrol eder
function checkPasswords(input1, input2) {
  if (input2.value.trim() === "") {
    error(input2, "Password repeat is required."); // Tekrar şifre boşsa
  } else if (input1.value !== input2.value) {
    error(input2, "Passwords do not match!"); // Şifreler uyuşmuyorsa
  } else {
    succes(input2); // Uyuşuyorsa başarılı
  }
}

// Tüm inputların başarılı (is-valid) olup olmadığını kontrol eder
function formIsValid() {
  const inputs = [username, mail, password, repassword, phone];
  return inputs.every((input) => input.classList.contains("is-valid")); // Hepsi yeşilse true
}

// Form gönderildiğinde çalışır
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Sayfanın yenilenmesini engeller

  // Tüm validasyonları uygula
  checkRequired([username, password, repassword, mail, phone]);
  checkEmail(mail);
  checkLength(username, 7, 15);
  checkLength(password, 7, 15);
  checkLength(repassword, 7, 15);
  checkPasswords(password, repassword);
  checkPhone(phone);

  // Tüm inputlar geçerliyse başarı mesajı göster
  if (formIsValid()) {
    successMessage.style.display = "block"; // Mesaj kutusunu göster

    setTimeout(() => {
      successMessage.style.display = "none"; // 3 saniye sonra mesajı gizle
      form.reset(); // Formu temizle
      [username, mail, password, repassword, phone].forEach(
        (input) => input.classList.remove("is-valid", "is-invalid") // Sınıfları sıfırla
      );
    }, 3000);
  } else {
    successMessage.style.display = "none"; // Başarısızsa mesaj gösterme
  }
});
