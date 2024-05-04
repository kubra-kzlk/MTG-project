const addButton = document.getElementById('add-deck-btn') as HTMLButtonElement;
const deckNameInput = document.getElementById('deck-name-input') as HTMLInputElement;
const saveButton = document.getElementById('save-deck-btn') as HTMLButtonElement;
const popupContainer = document.getElementById('popup-container');
const container = document.getElementById('deck-image-container');
const displayDeckContainer = document.getElementById('display-deck-container');

interface Deck {
    name: string;
    imageUrl: string;
}

let decks: Deck[] = [];

const imageUrls: { [key: string]: string } = {
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
    if (popupContainer) popupContainer.classList.remove('hidden');
    if (container) container.innerHTML = ''; 
    Object.entries(imageUrls).forEach(([name, url]) => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = name;
        img.classList.add('deck-image'); 
        img.classList.add('popup-deck-image'); 
        img.addEventListener('click', () => {
            selectImage(url);
        });
        if (container) container.appendChild(img);
    });
});

function selectImage(selectedUrl: string) {
    document.querySelectorAll('.deck-image').forEach(img => {
        if ((img as HTMLImageElement).src !== selectedUrl) {
            img.classList.add('hidden');
        } else {
            img.classList.add('selected');
            if (deckNameInput) {
                deckNameInput.classList.remove('hidden');
                deckNameInput.classList.add('deckname-input');
            }
            if (saveButton) {
                saveButton.classList.remove('hidden');
                saveButton.classList.add('save-button');
            }
        }
    });
}

saveButton.addEventListener('click', () => {
    const selectedImage = document.querySelector('.selected') as HTMLImageElement;
    if (selectedImage && deckNameInput && deckNameInput.value) {
        const displayContainer = document.createElement('div');
        const deckImageContainer = document.createElement('div');
        const deckName = document.createElement('div');
        const editNameButton = document.createElement('button');
        const deleteButton = document.createElement('button');
        displayContainer.classList.add('saved-deck-container');
        deckName.classList.add('deck-name');
        deckName.textContent = deckNameInput.value;

        editNameButton.addEventListener('click', () => {
            const newName = prompt('Voer een nieuwe naam in voor dit deck:', deckName.textContent || '');
            if (newName !== null) {
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

        if (deckImageContainer) deckImageContainer.appendChild(selectedImage.cloneNode(true));
        if (displayContainer) {
            displayContainer.appendChild(deckImageContainer);
            displayContainer.appendChild(deckName);
            displayContainer.appendChild(editNameButton);
            displayContainer.appendChild(deleteButton);
        }

        if (displayDeckContainer) displayDeckContainer.appendChild(displayContainer);
        if (popupContainer) popupContainer.classList.add('hidden');
        if (deckNameInput) deckNameInput.classList.add('hidden');
        if (saveButton) saveButton.classList.add('hidden');
        decks.push({ name: deckNameInput.value, imageUrl: selectedImage.src });
        renderDecks();
    } else {
        alert('Selecteer een afbeelding en voer een decknaam in.');
    }
});

function renderDecks() {
    if (displayDeckContainer) displayDeckContainer.innerHTML = '';
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
            if (newName !== null) {
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
        if (deckImageContainer) deckImageContainer.appendChild(img);

        if (displayContainer) {
            displayContainer.appendChild(deckImageContainer);
            displayContainer.appendChild(deckName);
            displayContainer.appendChild(editNameButton);
            displayContainer.appendChild(deleteButton);
        }

        if (displayDeckContainer) displayDeckContainer.appendChild(displayContainer);
    });
}
