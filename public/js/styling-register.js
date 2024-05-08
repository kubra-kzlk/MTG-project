/*window.onload = function() {
    // Get the value of userEmailExists
    const userEmailExists = <%= userEmailExists %>;
    const emailInput = document.getElementById('email');

    if (userEmailExists) {
      // Update the class based on the value of userEmailExists
      emailInput.classList.add('error');
    }
};*/
  

// Hamburger menu
document.addEventListener('DOMContentLoaded', function () {
  var hamburger = document.getElementById('hamburger');
  var navMenu = document.getElementById('nav-menu');

  hamburger.addEventListener('click', function () {
      // Check if the menu is open
      if (navMenu.style.width == '350px') {
          navMenu.style.width = '0';
      } else {
          navMenu.style.width = '350px';
      }
  });
});