// Gerekli HTML elementlerini al
const btn = document.getElementById("kisa");
const input = document.getElementById("original-link");
const shortLinkText = document.getElementById("short-link");
const kisaltilanlarDiv = document.getElementById("kisaltilanlar");

// Kısa linkleri localStorage ile saklamak için dizi oluştur
let kisaltilanlar = JSON.parse(localStorage.getItem("kisaltilanlar")) || [];

// CleanURI API kullanarak linki kısaltan fonksiyon
function shortLink(url) {
  return fetch("http://localhost:3000/shorten", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  })
    .then((res) => res.json())
    .then((data) => data.result_url || ""); // burayı data.result_url yaptım
}
// "Kısalt" butonuna tıklanınca çalışacak olay
btn.addEventListener("click", () => {
  const url = input.value.trim();

  if (!url) {
    alert("Lütfen geçerli bir link girin.");
    return;
  }

  shortLink(url)
    .then((shortUrl) => {
      kisaltilanlar.push({ originalLink: url, shortLink: shortUrl });
      localStorage.setItem("kisaltilanlar", JSON.stringify(kisaltilanlar));
      showKisaltilanlar();
      input.value = "";
    })
    .catch(() => {
      alert("Link kısaltılamadı. Lütfen geçerli bir URL girin.");
    });
});

// Kısaltılan linkleri ekrana yazdırma fonksiyonu
function showKisaltilanlar() {
  kisaltilanlarDiv.innerHTML = ""; // önceki içerik temizlenir

  kisaltilanlar.forEach((link, index) => {
    const linkDiv = document.createElement("div");
    linkDiv.classList.add("kisaltilan-link");
    linkDiv.innerHTML = `
      <p class="link-text"><a href="${link.shortLink}" target="_blank">${link.shortLink}</a></p>
      <i class="fas fa-copy icon" title="Kopyala" onclick="copyLink(${index})"></i>
      <i class="fas fa-trash-alt icon" title="Sil" onclick="deleteLink(${index})"></i>
    `;
    kisaltilanlarDiv.appendChild(linkDiv);
  });
}

// Panoya kopyalama fonksiyonu
function copyLink(index) {
  const shortLink = kisaltilanlar[index].shortLink;
  navigator.clipboard
    .writeText(shortLink)
    .then(() => {
      alert("Link kopyalandı: " + shortLink);
    })
    .catch((error) => {
      console.error("Kopyalama hatası:", error);
    });
}

// Linki silen fonksiyon
function deleteLink(index) {
  kisaltilanlar.splice(index, 1);
  localStorage.setItem("kisaltilanlar", JSON.stringify(kisaltilanlar));
  showKisaltilanlar();
}

// Sayfa yüklendiğinde daha önceki linkleri göster
document.addEventListener("DOMContentLoaded", showKisaltilanlar);
