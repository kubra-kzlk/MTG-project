let currentPage = 1;
/*GALERY GEDEELTE */
function updateGallery() {
    document.querySelectorAll('.image-gallery').forEach(gallery => {
        gallery.classList.remove('visible');
    });
    document.getElementById(`gallery${currentPage}`).classList.add('visible');
    
    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = currentPage === 3; 

    document.querySelectorAll('.page-number').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(`page${currentPage}`).classList.add('active');
}

document.getElementById('nextBtn').addEventListener('click', function() {
    if (currentPage < 3) {
        currentPage++;
        updateGallery();
    }
});

document.getElementById('prevBtn').addEventListener('click', function() {
    if (currentPage > 1) {
        currentPage--;
        updateGallery();
    }
});

document.querySelectorAll('.page-number').forEach(page => {
    page.addEventListener('click', function() {
        currentPage = parseInt(this.textContent);
        updateGallery();
    });
});



/*MODAL GEDEELTE VAN MAIN PAGE*/
document.addEventListener('DOMContentLoaded', function() {
  let modal = document.getElementById("modal");
  let img = document.querySelector("#gallery1 .image img"); 
  let span = document.getElementsByClassName("close")[0];

  img.onclick = function() {
      modal.style.display = "block";
  }

  span.onclick = function() {
      modal.style.display = "none";``
  }

  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }
});

/*MODAL GEDEELTE VAN deckDetail PAGE*/
document.addEventListener('DOMContentLoaded', function() {
  let modal = document.getElementById("modal");
  let img = document.querySelector(".deck-detail-cards .temporary-card img"); 
  let span = document.getElementsByClassName("close")[0];

  img.onclick = function() {
      modal.style.display = "block";
  }

  span.onclick = function() {
      modal.style.display = "none";``
  }

  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }
});


function addDeck() {
  const decksContainer = document.getElementById('decks-container');
  console.log("GEDRUKT OP DE ADD DECKS")
  if (decksContainer.children.length >= 8) {
      alert("Maximum of 8 decks reached.");
      return;
  }

  const template = document.getElementById('deckTemplate');
  const clone = document.importNode(template.content, true);
  
  const deckContainer = clone.querySelector('.deck-container');
  deckContainer.onclick = function() { window.location.href = 'deckdetailpage.html'; }; //DIT VERANDEREN OM NAAR DE DECKDETAILPAGE OF ANDERE TE GAAN !!

  decksContainer.appendChild(clone);
}
