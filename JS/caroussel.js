const VoirPlusBtn = document.getElementById("VoirPlusBtn");
const imagesContainer = document.getElementById("carrousel");
const images =  document.querySelectorAll(".ImageVoirPlus");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let index = 0;

function UpdateCarrousel() {
    imagesContainer.style.transform = `translateX(${-index * 100}%)`;
}

nextBtn.addEventListener("click", () => {
    index = (index + 1) % images.length;
    UpdateCarrousel();
});

prevBtn.addEventListener("click", () => {
    index = (index - 1 + images.length) % images.length;
    UpdateCarrousel();
});
