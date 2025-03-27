'user strict'
document.addEventListener("DOMContentLoaded", function () {
    let currentIndex = 0;
    const slides = document.querySelectorAll(".carousel .slide");
    const totalSlides = slides.length;
    let interval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? "block" : "none";
        });
        currentIndex = index;
    }

    function nextSlide() {
        showSlide((currentIndex + 1) % totalSlides);
    }

    function prevSlide() {
        showSlide((currentIndex - 1 + totalSlides) % totalSlides);
    }

    function startAutoSlide() {
        interval = setInterval(nextSlide, 3000); // A cada 3 segundos
    }

    function stopAutoSlide() {
        clearInterval(interval);
    }

    document.querySelector(".carousel").addEventListener("mouseenter", stopAutoSlide);
    document.querySelector(".carousel").addEventListener("mouseleave", startAutoSlide);

    document.querySelector(".prev").addEventListener("click", function () {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });

    document.querySelector(".next").addEventListener("click", function () {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });

    showSlide(0);
    startAutoSlide();
});

