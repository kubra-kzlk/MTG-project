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
      if (img.src!== selectedUrl) {
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
  
  saveButton.addEventListener('click', async () => {
    const selectedImage = document.querySelector('.selected');
    if (selectedImage && deckNameInput.value) {
      const deckData = {
        name: deckNameInput.value,
        imageUrl: selectedImage.src
      };

      console.log(deckData.name)
      console.log(deckData.imageUrl)

      try {
        const response = await fetch('/decklist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(deckData)
        });
        const data = await response.json();
        if (data.success) {
          decks.push(deckData);
          popupContainer.classList.add('hidden');
          deckNameInput.classList.add('hidden');
          saveButton.classList.add('hidden');
          location.reload();
        } else {
          console.log("error onder de data.success")
          console.error(data.message);
        }
      } catch (error) {
        console.error(error);
      }
      popupContainer.classList.add('hidden');
      deckNameInput.classList.add('hidden');
      saveButton.classList.add('hidden');

      console.log("bijna bij pagina reladen")
      window.location.reload();

      console.log("onder pagina herladen")
    } else {
      alert('Selecteer een afbeelding en voer een decknaam in.');
    }
  });
  