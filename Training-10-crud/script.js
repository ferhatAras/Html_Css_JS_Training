let selectedRow = null; // Düzenleme sırasında hangi satırın seçildiğini izlemek için bir değişken.

// Show Alerts
function ShowAlert(message, className) {
  // Kullanıcıya mesaj göstermek için bir alert kutusu oluşturur.
  const div = document.createElement("div");
  div.className = `alert alert-${className}`; // Bootstrap alert sınıfı ile alert tipi belirlenir (örneğin, "success" veya "danger").
  div.appendChild(document.createTextNode(message)); // Mesaj metni alert kutusuna eklenir.
  const container = document.querySelector(".container");
  const main = document.querySelector(".main");
  container.insertBefore(div, main); // Alert kutusu, ana formun üzerine yerleştirilir.

  // 3 saniye sonra alert kutusunu kaldırır.
  setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// Clear All Fields
function clearFields() {
  // Formdaki tüm giriş alanlarını temizler.
  document.querySelector("#firstName").value = "";
  document.querySelector("#lastName").value = "";
  document.querySelector("#classNo").value = "";
}

// Add Data
document.querySelector("#student-form").addEventListener("submit", (e) => {
  e.preventDefault(); // Formun varsayılan gönderme işlemini engeller.

  // Formdan girilen değerleri alır ve boşlukları kaldırır.
  const firstname = document.querySelector("#firstName").value.trim();
  const lastname = document.querySelector("#lastName").value.trim();
  const classnumber = document.querySelector("#classNo").value.trim();

  // Validate
  if (firstname === "" || lastname === "" || classnumber === "") {
    // Eğer herhangi bir alan boşsa, kullanıcıya bir hata mesajı gösterir.
    ShowAlert("Lütfen tüm alanları doldurun", "danger");
  } else {
    // Eğer bir satır seçilmediyse (yeni bir öğrenci ekleniyor).
    if (selectedRow == null) {
      const list = document.querySelector(".student-list"); // Öğrenci listesinin yer aldığı tablo.
      const row = document.createElement("tr"); // Yeni bir tablo satırı oluşturulur.

      // Satırın içeriği, girilen değerlerle doldurulur.
      row.innerHTML = `
        <td>${firstname}</td>
        <td>${lastname}</td>
        <td>${classnumber}</td>
        <td>
          <a href="#" class="btn btn-warning btn-sm edit">Düzenle</a>
          <a href="#" class="btn btn-danger btn-sm delete">Sil</a>
        </td>`;
      list.appendChild(row); // Yeni satır tabloya eklenir.
      ShowAlert("Öğrenci eklendi", "success"); // Başarı mesajı gösterilir.
    } else {
      // Eğer bir satır seçildiyse (var olan öğrenci bilgileri güncelleniyor).
      selectedRow.children[0].textContent = firstname; // Adı günceller.
      selectedRow.children[1].textContent = lastname; // Soyadı günceller.
      selectedRow.children[2].textContent = classnumber; // Sınıf numarasını günceller.
      ShowAlert("Öğrenci bilgileri güncellendi", "info"); // Güncelleme mesajı gösterilir.
      selectedRow = null; // Seçim sıfırlanır.
    }
    clearFields(); // Form alanları temizlenir.
  }
});

// Edit Data
document.querySelector(".student-list").addEventListener("click", (e) => {
  const target = e.target; // Tıklanan eleman.
  if (target.classList.contains("edit")) {
    // Eğer tıklanan eleman "edit" sınıfına sahipse (Düzenle butonu).
    selectedRow = target.parentElement.parentElement; // İlgili tablo satırı seçilir.
    // Seçilen satırdaki bilgileri form alanlarına taşır.
    document.querySelector("#firstName").value =
      selectedRow.children[0].textContent; // Ad bilgisi form alanına yazılır.
    document.querySelector("#lastName").value =
      selectedRow.children[1].textContent; // Soyad bilgisi form alanına yazılır.
    document.querySelector("#classNo").value =
      selectedRow.children[2].textContent; // Sınıf numarası bilgisi form alanına yazılır.
  }
});

// Delete Data
document.querySelector(".student-list").addEventListener("click", (e) => {
  const target = e.target; // Tıklanan eleman.
  if (target.classList.contains("delete")) {
    // Eğer tıklanan eleman "delete" sınıfına sahipse (Sil butonu).
    target.parentElement.parentElement.remove(); // İlgili tablo satırı silinir.
    ShowAlert("Öğrenci bilgileri silindi", "danger"); // Silme mesajı gösterilir.
  }
});
