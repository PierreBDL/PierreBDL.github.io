// Chargement du JSON au démarrage
loadEvents();

function VoirPlus(button, eventKey, colorBorder) {
    const plusInfos = document.getElementById("PlusInfos");
    plusInfos.style.display = "block";

    // Parent
    const friseItem = button.closest(".friseItem");

    // Récupérer le titre et la description de l'élément friseItem
    const title = friseItem.querySelector("h3").innerText;
    const description = friseItem.querySelector("p").innerText;

    // Promesse pour le JSON
    let voirPlus = eventsData;

    // Vérifier si les données sont dans le JSON
    if (voirPlus.find(e => e.id === eventKey) == null || voirPlus.find(e => e.id === eventKey) == undefined) {
        console.error("Erreur: L'événement avec l'ID '" + eventKey + "' n'a pas été trouvé dans le JSON.");
        return;
    }

    // Récupérer le JSON de l'événement
    const event = voirPlus.find(e => e.id === eventKey);

    if (!event) {
        console.error("Erreur: L'événement avec l'ID '" + eventKey + "' n'a pas été trouvé dans le JSON.");
        return;
    }

    // Remplir les infos
    const titleElement = event.title;
    document.querySelector("#PlusInfos h2").innerHTML = titleElement;
    const descriptionElement = event.description;
    document.querySelector("#PlusInfos p").innerHTML = "";
    const p = document.querySelector("#PlusInfos p");
    p.innerHTML = "<strong>Développeurs :</strong><br>";

    if (event.tasks && event.tasks.length > 0) {
        event.tasks.forEach(task => {
            p.innerHTML += `<span class="${task.status}">- ${task.text}</span><br>`;
        });
    } else if (event.description) {
        p.innerHTML += event.description;
    }

    // Ajout des images
    const imagesContainer = document.getElementById("carrousel");
    imagesContainer.innerHTML = ""; // Clear
    event.images.forEach(src => {
        const img = document.createElement("img");
        img.src = "Images" + src;
        img.alt = "Image supplémentaire";
        img.classList.add("ImageVoirPlus");
        imagesContainer.appendChild(img);
    });

    // Appliquer la bordure colorée
    plusInfos.style.border = `2px solid ${colorBorder || 'black'}`;

    // Réinitialiser le carrousel
    index = 0;
    UpdateCarrousel();

    // Afficher le conteneur des infos
    plusInfos.classList.add("visible");

    // Ancre vers caroussel
    document.getElementById("PlusInfos").scrollIntoView({
        behavior: "smooth"
    });
}

function closeInfos() {
    const plusInfos = document.getElementById("PlusInfos");
    plusInfos.style.display = "none";
    plusInfos.classList.remove("visible");
}


// Promesse pour le JSON
let eventsData = [];

async function loadEvents() {
    const response = await fetch("../Json/events.json");
    const data = await response.json();
    eventsData = data.events;
}