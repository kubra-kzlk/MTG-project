window.onload = function() {
    // Get the value of userEmailExists
    const userEmailExists = <%= userEmailExists %>;
    const emailInput = document.getElementById('email');

    if (userEmailExists) {
      // Update the class based on the value of userEmailExists
      emailInput.classList.add('error');
    }
  };