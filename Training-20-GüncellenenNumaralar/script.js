//HTML'de number sınıfına ait sahip tüm ögeleri seç ve bir diziye yerleştir.
const items = [...document.querySelectorAll(".number")];

//Sayıları güncellemek için bir fonksiyon oluştur
const updateCount = (el) => {
  //Verilen Öğenin 'data-value' özelliğini kullanarak hedef sayıyı al
  const value = parseInt(el.dataset.value);
  //Sayının kaç Birimlik artacağını hesapla(Örneğin, 1000 birimlik artırılabilir)
  const increment = Math.ceil(value / 1000);
  // const increment =1 ; // Yavaş artış için bu satırı kullanabilirisin

  let initialValue = 0; // Başlangıç değerini ayarla

  //Sayıyı arttırmak için
  const increaseCount = setInterval(() => {
    initialValue += increment; // Başlangıç değeri arttır.
    //Eğer başlangıç değeri hedef değeri aşarsa.
    if (initialValue > value) {
      el.textContent = `${value}`;
      clearInterval(increaseCount);
      return;
    }
    //Öğenin metnini güncelle
    el.textContent = `${initialValue}+`;
  }, 1);
};
items.forEach((item) => {
  updateCount(item);
});
