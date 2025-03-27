'user strict'

document.addEventListener("DOMContentLoaded", function () {
    let currentIndex = 0;
    const slides = document.querySelectorAll(".carousel .slide");
    const totalSlides = slides.length;
    let interval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === index);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(currentIndex);
    }

    function startAutoSlide() {
        interval = setInterval(nextSlide, 2000); 
    }

    function stopAutoSlide() {
        clearInterval(interval);
    }

    document.querySelector(".carousel").addEventListener("mouseenter", stopAutoSlide);
    document.querySelector(".carousel").addEventListener("mouseleave", startAutoSlide);

    document.querySelector(".prev").addEventListener("click", function () {
        stopAutoSlide();
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(currentIndex);
        startAutoSlide();
    });

    document.querySelector(".next").addEventListener("click", function () {
        nextSlide();
    });

    function nextSlide() {
        showSlide((currentIndex + 1) % totalSlides);
    }

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? "block" : "none";
        });
        currentIndex = index;
    }

    document.querySelector(".carousel").addEventListener("mouseenter", stopAutoSlide);
    document.querySelector(".carousel").addEventListener("mouseleave", startAutoSlide);

    startAutoSlide();
});
