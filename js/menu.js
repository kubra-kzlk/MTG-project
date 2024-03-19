
document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeMenuBtn = document.getElementById("closeMenuBtn");

  let isMenuOpen = false; // Variabele om bij te houden of het menu open is

  menuBtn.addEventListener("click", function () {
    if (isMenuOpen) {
      // Als het menu open is, sluit het
      mobileMenu.style.width = "0";
      isMenuOpen = false;
    } else {
      // Als het menu gesloten is, open het
      mobileMenu.style.width = "100%";
      isMenuOpen = true;
    }
  });

  closeMenuBtn.addEventListener("click", function () {
    mobileMenu.style.width = "0"; // Dit sluit het menu door de breedte naar 0 te wijzigen
    isMenuOpen = false; // Markeer het menu als gesloten
  });
});
