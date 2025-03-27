"use strict";

async function fetchStations() {
    const container = document.getElementById("stations");
    const searchInput = document.getElementById("searchInput");
    let search = searchInput.value.trim(); 
    
    if (!search) {
        container.innerHTML = "Insira a sigla de algum país";
    } else {
        const url = `https://api.railway-stations.org/${search}/stations`;
        container.innerHTML = "Carregando...";
        
        try {            
            const response = await fetch(url);   
            const dados = await response.json();
            
            if (dados.length > 0) {
                container.innerHTML = "";
                
                dados.forEach(station => {
                    const div = document.createElement("div");
                    div.className = "station";
                    div.innerHTML = `<strong>${station.title}</strong> - ${station.country}`;
                    div.addEventListener("click", () => openStationPage(station));
                    container.appendChild(div);
                });
            } else {
                container.innerHTML = "Erro ao carregar as estações. Insira uma sigla válida!";
            }
        } catch (error) {
            console.error(error);
            container.innerHTML = "Ocorreu um erro";
        }
    }
}

function openStationPage(station) {
    const url = `station.html?name=${encodeURIComponent(station.title)}&photo=${encodeURIComponent(station.photoUrl)}`;
    window.location.href = url;
}

const searchInput = document.getElementById("searchInput");
const listStationsButton = document.getElementById("listStationsButton");

searchInput.addEventListener("input", () => {
    listStationsButton.innerHTML = `Estações ferroviárias ${searchInput.value ? `de ${searchInput.value}` : "por país"}`;
});

// Carrossel de imagens
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
