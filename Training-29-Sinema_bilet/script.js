// Koltukları içeren ana kapsayıcı seçildi
const container = document.querySelector(".container");
// Seçilen koltuk sayısını gösterecek alan
const count = document.getElementById("count");
// Toplam fiyatı gösterecek alan
const amount = document.getElementById("amount");
// Film seçme dropdown'ı
const select = document.getElementById("movie");
// Rezerve olmayan tüm koltukları seç
const seats = document.querySelectorAll(".seat:not(.reserved)");

// Sayfa yüklendiğinde localStorage'dan verileri getir
getFromLocalStorage();
// Başlangıçta toplam hesapla
calculateTotal();

// Koltuklara tıklanma olayını dinleme
container.addEventListener("click", function (e) {
  // Eğer tıklanan eleman bir "seat" (koltuk) sınıfına sahipse ve "reserved" (rezerve) değilse
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("reserved")
  ) {
    // Seçili olup olmadığını tersine çevir (toggle metodu)
    e.target.classList.toggle("selected");
    // Toplamı tekrar hesapla
    calculateTotal();
  }
});

// Film seçimi değiştiğinde toplamı tekrar hesapla
select.addEventListener("change", function () {
  calculateTotal();
});

// Seçili koltukları ve toplam ücreti hesaplayan fonksiyon
function calculateTotal() {
  // Seçili olan tüm koltukları al
  const selectedSeats = document.querySelectorAll(".seat.selected");

  // Seçili koltukları ve tüm koltukları bir diziye çevir
  const selectedSeatArr = Array.from(selectedSeats);
  const seatArr = Array.from(seats);

  // Seçili koltukların indekslerini bul
  let selectedSeatIndexs = selectedSeatArr.map((seat) => seatArr.indexOf(seat));

  // Seçili koltuk sayısını al
  let selectedSeatCount = selectedSeats.length;
  // Seçili koltuk sayısını ekrana yazdır
  count.innerText = selectedSeatCount;
  // Toplam fiyatı hesapla (koltuk sayısı * film ücreti)
  amount.innerText = selectedSeatCount * select.value;

  // Seçili koltukları localStorage'a kaydet
  saveToLocalStorage(selectedSeatIndexs);
}

// Seçili koltukları ve film indeksini localStorage'a kaydeden fonksiyon
function saveToLocalStorage(indexs) {
  localStorage.setItem("selectedSeats", JSON.stringify(indexs)); // Koltukları JSON formatında kaydet
  localStorage.setItem("selectedMovieIndex", select.selectedIndex); // Seçili film indeksini kaydet
}

// LocalStorage'dan verileri getirip sayfaya uygula
function getFromLocalStorage() {
  // LocalStorage'dan seçili koltukları al
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  // Eğer kayıtlı koltuklar varsa ve boş değilse
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      // Eğer koltuk kaydedilen indekslerde varsa, seçili yap
      if (selectedSeats.includes(index)) {
        seat.classList.add("selected");
      }
    });
  }

  // LocalStorage'dan seçili filmi al
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  // Eğer bir film seçiliyse, seçili olanı ayarla
  if (selectedMovieIndex !== null) {
    select.selectedIndex = selectedMovieIndex;
  }
}
