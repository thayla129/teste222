'user strict'

async function fetchStations() {
    const container = document.getElementById("stations");
    let search = searchValue;
    
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
    searchValue = searchInput.value;
    listStationsButton.innerHTML = `Estações ferroviárias ${searchValue ? `de ${searchValue}` : "por país"}`;
});
