// Show login modal upon clicking Log In
$(document).ready(function () {
  $('#loginButton').click(function (e) {
    e.preventDefault() // Prevent default anchor behavior of 'URL/#'
    $('#loginModal').modal('show')
  })
})

// Show signup modal upon clicking Sign Up
$(document).ready(function () {
  $('#signupButton').click(function (e) {
    e.preventDefault() // Prevent default anchor behavior of 'URL/#'
    $('#signupModal').modal('show')
  })
})

// Configure what generally happens when user clicks Log In or Sign Up
function handleButtonClick(buttonID, modalID) {
  const button = document.getElementById(buttonID)
  const modal = $(modalID)

  // Close navbar dropdown on small screens
  if (button) {
    button.addEventListener('click', function () {
      if (window.innerWidth < 992) { // Check if small screen
        document.querySelector('.navbar-toggler').click() // Trigger ghost click on navbar-toggler button to fold dropdown back up
      }

      // Close other modal if open
      const otherModalId = modalID === '#loginModal' ? '#signupModal' : '#loginModal'
      const otherModal = $(otherModalId)
      if (otherModal.hasClass('show')) {
        otherModal.modal('hide')
      }

      modal.modal('show') // Show clicked modal
    })
  }
}

handleButtonClick('loginButton', '#loginModal')
handleButtonClick('signupButton', '#signupModal')

// AJAX form submission - Prevent redirect to separate /signup or /login page
function handleFormSubmission(formID, modalID) {
  $(document).on('submit', formID, function(e) {
    e.preventDefault()

    $.ajax({
      type: 'POST',
      url: $(this).attr('action'),
      data: $(this).serialize(),
      success: function (response) {
        $(modalID).modal('hide') // Close modal upon successful submission
      },
      error: function(error) {
        console.error('Error submitting the form', error)
      },
    })
  })
}

handleFormSubmission('#loginForm', '#loginModal')
handleFormSubmission('#signupForm', '#signupModal')