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
    navMenu.classList.toggle('open'); // Toggle the 'open' class on the menu
  });
});
