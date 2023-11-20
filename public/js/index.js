document.addEventListener("DOMContentLoaded", function () {
  // Function to handle button clicks
  function handleButtonClick(buttonId, modalId) {
    var button = document.getElementById(buttonId);
    var modal = $(modalId);

    if (button) {
      button.addEventListener("click", function () {
        // Check if navbar is collapsed (small screen size)
        if (window.innerWidth < 992) {
          // Trigger click on the navbar-toggler button to fold back the dropdown
          document.querySelector(".navbar-toggler").click();
        }

        // Close if other modal open
        var otherModalId = modalId === "#loginModal" ? "#signupModal" : "#loginModal";
        var otherModal = $(otherModalId);
        if (otherModal.hasClass("show")) {
          otherModal.modal('hide');
        }

        // Show the clicked modal
        modal.modal('show');
      });
    }
  }

  handleButtonClick("loginButton", "#loginModal");
  handleButtonClick("signupButton", "#signupModal");
});

// Login modal
$(document).ready(function () {
  $("#loginButton").click(function () {
    $("#loginModal").modal('show');
  });
});

// Signup modal
$(document).ready(function () {
  $("#signupButton").click(function () {
    $("#signupModal").modal('show');
  });
});