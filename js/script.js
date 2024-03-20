document.addEventListener("DOMContentLoaded", function () {
  const popupContent = document.getElementById("popup-content");

  popupContent.innerHTML =
    "<p>Welkom op de landingpagina. Klik op het project waarvoor je toegang hebt. Indien je geen toegang hebt op een project zal deze geweigerd worden.</p>";

  document.getElementById("popup-btn").addEventListener("click", function () {
    document.getElementById("customPopup").style.display = "block";
  });

  // Sluit het popup-element wanneer er op het sluitknopje wordt geklikt
  document
    .getElementsByClassName("custom-popup-close")[0]
    .addEventListener("click", function () {
      document.getElementById("customPopup").style.display = "none";
    });
});
