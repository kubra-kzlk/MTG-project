/*MODAL GEDEELTE VAN MAIN PAGE*/
document.addEventListener('DOMContentLoaded', function() {
  let modal = document.getElementById("modal");
  let img = document.querySelector("#gallery1 .image img"); 
  let span = document.getElementsByClassName("close")[0];

  img.onclick = function() { modal.style.display = "block"; }
  span.onclick = function() { modal.style.display = "none";}

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
