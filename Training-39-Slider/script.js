var models = [
  {
    name: "Çiçek",
    Image: "img/img1.jpg",
    link: "https://www.google.com/?hl=tr",
  },
  {
    name: "Leylek",
    Image: "img/img2.webp",
    link: "https://www.google.com/?hl=tr",
  },
  {
    name: "Köpek",
    Image: "img/img3.jpg",
    link: "https://www.google.com/?hl=tr",
  },
  {
    name: "Dağ",
    Image: "img/img4.webp",
    link: "https://www.google.com/?hl=tr",
  },
  {
    name: "Çoçuk",
    Image: "img/img5.jpg",
    link: "https://www.google.com/?hl=tr",
  },
  {
    name: "dağ2",
    Image: "img/img6.jpg",
    link: "https://www.google.com/?hl=tr",
  },
];
var index = 0;
var slaytCount = models.length;
var interval;
var settings = {
  duration: "2000",
  random: false,
};
init(settings);

document.querySelectorAll(".arrow").forEach(function (item) {
  item.addEventListener("mouseenter", function () {
    clearInterval(interval);
  });
});

document.querySelectorAll(".arrow").forEach(function (item) {
  item.addEventListener("mouseleave", function () {
    init(settings);
  });
});

function init(settings) {
  var prev;
  interval = setInterval(function () {
    if (settings.random) {
      do {
        index = Math.floor(Math.random() * slaytCount);
      } while (index == prev);
      {
        prev = index;
      }
    } else {
      if (slaytCount == index + 1) {
        index = -1;
      }
      index++;
    }
    showSlide(index);
  }, settings.duration);
}

showSlide(index);
document.querySelector(".fa-angle-left").addEventListener("click", function () {
  index--;
  showSlide(index);
  console.log(index);
});
document
  .querySelector(".fa-angle-right")
  .addEventListener("click", function () {
    index++;
    showSlide(index);
    console.log(index);
  });

function showSlide(i) {
  index = i;

  if (i < 0) {
    index = slaytCount - 1;
  }
  if (i >= slaytCount) {
    index = 0;
  }

  document.querySelector(".card-title").textContent = models[index].name;

  document
    .querySelector(".card-img-top")
    .setAttribute("src", models[index].Image);

  document.querySelector(".card-link").setAttribute("href", models[index].link);
}
