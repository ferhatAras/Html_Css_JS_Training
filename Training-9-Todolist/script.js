// DOM elementlerini seçme
const addForm = document.querySelector(".add"); // Yeni yapılacak ekleme formu
const list = document.querySelector(".todos"); // Yapılacaklar listesinin bulunduğu <ul> elementi
const search = document.querySelector(".search input"); // Arama input alanı

// Yeni yapılacak madde için HTML şablon oluşturma fonksiyonu
const generateTemplate = (todo) => {
  const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${todo}</span> <!-- Yapılacak madde metni -->
        <i class="far fa-trash-alt delete"></i> <!-- Silme butonu -->
    </li>
    `;
  list.innerHTML += html; // Listeye yeni madde ekleniyor
};

// Yeni yapılacak madde ekleme işlemi
addForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Formun varsayılan davranışını (sayfanın yenilenmesi) engelle
  const todo = addForm.add.value.trim(); // Formdaki inputtan alınan metni al ve boşlukları kaldır
  if (todo.length) {
    // Eğer metin boş değilse
    generateTemplate(todo); // Şablonu oluştur ve listeye ekle
    addForm.reset(); // Formu sıfırla (input alanını temizle)
  }
});

// Liste elemanlarını silme işlemi
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    // Eğer tıklanan eleman silme butonu ise
    e.target.parentElement.remove(); // Ebeveyn <li> elemanını kaldır
  }
});

// Listeyi filtreleme fonksiyonu
const filterTodos = (term) => {
  // Liste elemanları içinde arama yap, metni eşleşmeyenleri gizle
  Array.from(list.children) // Liste elemanlarını bir diziye çevir
    .filter((todo) => !todo.textContent.toLowerCase().includes(term)) // Arama terimini içermeyenleri bul
    .forEach((todo) => todo.classList.add("filtered")); // Bu elemanlara "filtered" sınıfı ekle

  // Metni eşleşen elemanları göster
  Array.from(list.children) // Liste elemanlarını bir diziye çevir
    .filter((todo) => todo.textContent.toLowerCase().includes(term)) // Arama terimini içerenleri bul
    .forEach((todo) => todo.classList.remove("filtered")); // Bu elemanlardan "filtered" sınıfını kaldır
};

// Arama alanında yazılan terimi dinleme
search.addEventListener("keyup", () => {
  const term = search.value.trim().toLowerCase(); // Kullanıcı girdisini al ve küçük harfe çevir
  filterTodos(term); // Filtreleme fonksiyonunu çağır
});
