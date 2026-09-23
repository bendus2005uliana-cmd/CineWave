const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

setInterval(function() {

    slides[currentSlide].style.display = "none";

    currentSlide = currentSlide + 1;

    if (currentSlide === slides.length) {
        currentSlide = 0;
    }

    slides[currentSlide].style.display = "block";

}, 3000);