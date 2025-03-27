"use strict";

async function fetchStations() {
    const container = document.getElementById("stations");
    const searchInput = document.getElementById("searchInput");
    let search = searchInput.value;

    if (!search) {
        container.innerHTML = "Insira a sigla de algum país";
        return;
    }

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

function openStationPage(station) {
    const url = `station.html?name=${encodeURIComponent(station.title)}&photo=${encodeURIComponent(station.photoUrl)}`;
    window.location.href = url;
}

// Ajuste para botão de listar estações
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", () => {
    document.getElementById("listStationsButton").innerHTML = `Estações ferroviárias ${searchInput.value ? `de ${searchInput.value}` : "por país"}`;
});
