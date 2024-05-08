const addButton = document.getElementById('add-deck-btn');
const deckNameInput = document.getElementById('deck-name-input');
const saveButton = document.getElementById('save-deck-btn');
const popupContainer = document.getElementById('popup-container');
const container = document.getElementById('deck-image-container');
const displayDeckContainer = document.getElementById('display-deck-container');

let decks = [];

const imageUrls = {
    achterkanboom: "https://raw.githubusercontent.com/Btiisseem/projectwpl/main/public/assets/images/achterkanboom.jpg",
    achterkantdoodskop: "https://raw.githubusercontent.com/Btiisseem/projectwpl/main/public/assets/images/achterkantdoodskop.jpg",
    achterkantdraak: "https://raw.githubusercontent.com/Btiisseem/projectwpl/main/public/assets/images/achterkantdraak.jpg",
    achterkantmixthemas: "https://raw.githubusercontent.com/Btiisseem/projectwpl/main/public/assets/images/achterkantmixthemas.jpg",
    achterkantmixthemas2: "https://raw.githubusercontent.com/Btiisseem/projectwpl/main/public/assets/images/achterkantmixthemas2.jpg",
    achterkantmountain: "https://raw.githubusercontent.com/Btiisseem/projectwpl/main/public/assets/images/achterkantmountain.jpg",
    achterkantorigineel: "https://raw.githubusercontent.com/Btiisseem/projectwpl/main/public/assets/images/achterkantorigineel.jpg",
    achterkantpaarsevrouw: "https://raw.githubusercontent.com/Btiisseem/projectwpl/main/public/assets/images/achterkantpaarsevrouw.jpg",
    achterkantvrouw: "https://raw.githubusercontent.com/Btiisseem/projectwpl/main/public/assets/images/achterkantvrouw.jpg",
    achterkantvuurman: "https://raw.githubusercontent.com/Btiisseem/projectwpl/main/public/assets/images/achterkantvuurman.jpg",
    achterkantzon: "https://raw.githubusercontent.com/Btiisseem/projectwpl/main/public/assets/images/achterkantzon.jpg",
    waterachterkant: "https://raw.githubusercontent.com/Btiisseem/projectwpl/main/public/assets/images/waterachterkant.jpg"
};

addButton.addEventListener('click', () => {
    popupContainer.classList.remove('hidden');
    container.innerHTML = ''; 
    Object.entries(imageUrls).forEach(([name, url]) => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = name;
        img.classList.add('deck-image'); 
        img.classList.add('popup-deck-image'); 
        img.addEventListener('click', () => {
            selectImage(url);
        });
        container.appendChild(img);
    });
});

function selectImage(selectedUrl) {
    document.querySelectorAll('.deck-image').forEach(img => {
        if (img.src !== selectedUrl) {
            img.classList.add('hidden');
        } else {
            img.classList.add('selected');
            deckNameInput.classList.remove('hidden');
            deckNameInput.classList.add('deckname-input');
            saveButton.classList.remove('hidden');
            saveButton.classList.add('save-button');
        }
    });
}

saveButton.addEventListener('click', () => {
    const selectedImage = document.querySelector('.selected');
    if (selectedImage && deckNameInput.value) {
        const displayContainer = document.createElement('div');
        const deckImageContainer = document.createElement('div');
        const deckName = document.createElement('div');
        const editNameButton = document.createElement('button');
        const deleteButton = document.createElement('button');
        displayContainer.classList.add('saved-deck-container');
        deckName.classList.add('deck-name');
        deckName.textContent = deckNameInput.value;

        editNameButton.textContent = 'Bewerk decknaam';
        editNameButton.addEventListener('click', () => {
            const newName = prompt('Voer een nieuwe naam in voor dit deck:', deckName.textContent);
            if (newName) {
                deckName.textContent = newName;
            }
        });

        deleteButton.textContent = 'Verwijder deck';
        deleteButton.addEventListener('click', () => {
            const index = decks.findIndex(deck => deck.name === deckName.textContent);
            if (index !== -1) {
                decks.splice(index, 1);
                renderDecks();
            }
        });

        deckImageContainer.appendChild(selectedImage.cloneNode(true));
        displayContainer.appendChild(deckImageContainer);
        displayContainer.appendChild(deckName);
        displayContainer.appendChild(editNameButton);
        displayContainer.appendChild(deleteButton);

        displayDeckContainer.appendChild(displayContainer);
        popupContainer.classList.add('hidden');
        deckNameInput.classList.add('hidden');
        saveButton.classList.add('hidden');
        decks.push({ name: deckNameInput.value, imageUrl: selectedImage.src });
        renderDecks();
    } else {
        alert('Selecteer een afbeelding en voer een decknaam in.');
    }
});

function renderDecks() {
    displayDeckContainer.innerHTML = '';
    decks.forEach(deck => {
        const displayContainer = document.createElement('div');
        const deckImageContainer = document.createElement('div');
        const deckName = document.createElement('div');
        const editNameButton = document.createElement('button');
        const deleteButton = document.createElement('button');
        displayContainer.classList.add('saved-deck-container');
        deckName.classList.add('deck-name');
        deckName.textContent = deck.name;

        editNameButton.textContent = 'Bewerk decknaam';
        editNameButton.addEventListener('click', () => {
            const newName = prompt('Voer een nieuwe naam in voor dit deck:', deck.name);
            if (newName) {
                deck.name = newName;
                deckName.textContent = newName;
            }
        });

        deleteButton.textContent = 'Verwijder deck';
        deleteButton.addEventListener('click', () => {
            const index = decks.findIndex(d => d.name === deck.name);
            if (index !== -1) {
                decks.splice(index, 1);
                renderDecks();
            }
        });

        const img = document.createElement('img');
        img.src = deck.imageUrl;
        img.alt = deck.name;
        img.classList.add('deck-image');
        deckImageContainer.appendChild(img);

        displayContainer.appendChild(deckImageContainer);
        displayContainer.appendChild(deckName);
        displayContainer.appendChild(editNameButton);
        displayContainer.appendChild(deleteButton);
        displayDeckContainer.appendChild(displayContainer);
    });
}