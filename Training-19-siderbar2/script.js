document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const expandBtn = document.querySelector(".expand-btn");

  expandBtn.addEventListener("click", function () {
    body.classList.toggle(
      "collapsed"
    ); /* Tıklandığında 'collapsed' sınıfını ekleyip kaldır */
  });
});
