document.addEventListener("DOMContentLoaded", function () {
  // Sayfa Tamamen Yüklendiğinde çalışacak kodlar
  const generateButton = document.getElementById("generate-btn");
  const saveButton = document.getElementById("save-btn");
  const qrCodeContainer = document.getElementById("qr-code");
  let qrCodeInstance = null;

  generateButton.addEventListener("click", function () {
    // Butona tıkladığı zaman QR kod oluşacak.

    //Kullanıcınım girdiği metin veya url
    let qrText = document.getElementById("qr-text").value;

    if (qrCodeInstance) {
      qrCodeInstance.clear(); //Önceki QR kodu temizle
      qrCodeInstance = null; // koda boş ata
      qrCodeContainer.innerHTML = ""; //QR Kod konteynarını temizle
    }
    if (qrText) {
      //Kullanıcının girdiği metin veya url boş değilse
      //QR kod oluşturulacak

      qrCodeInstance = new QRCode(qrCodeContainer, {
        text: qrText,
        with: 256,
        height: 256,
      });
      //QR kodun animasyonlu görünmesini sağlar.
      qrCodeContainer.style.opacity = "1";
      qrCodeContainer.style.transform = "scale(1)";
    }
  });
  saveButton.addEventListener("click", function () {
    if (qrCodeInstance) {
      const qrImagedata = qrCodeInstance._el
        .querySelector("img")
        .getAttribute("src");
      const link = document.createElement("a");
      link.href = qrImagedata;
      link.download = "qr-code.png";
      link.click();
    }
  });
});

//Resim kaydetmede sorun var cevap bekleniyor.
