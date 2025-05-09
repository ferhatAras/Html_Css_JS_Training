const ShareBtn = document.querySelector(".share-button");

// Sosyal Medya Paylaşımı kutusunu açıp kapatmak için bir işlev

const toogleScoials = () => {
  const socialWrapper = document.querySelector(".socials-wrapper");

  // Paylaşa butonu içindeki  resmi seç

  const ShareButtonImage = ShareBtn.querySelector("img");

  //Sosyal medya paylaşımı kutusunun görünürlüğü değiştir (aç/kapa)

  socialWrapper.classList.toggle("active");

  // Paylaşma butonu resminin kaynak yolunu kontrol et

  if (ShareButtonImage.src.includes("share")) {
    ShareButtonImage.src = "img/close.png";
  } else {
    ShareButtonImage.src = "img/share.png";
  }
};

ShareBtn.addEventListener("click", toogleScoials);
