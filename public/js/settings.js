document.querySelector('#updatePasswordBtn').addEventListener('click', updatePassword)

function updatePassword(e) {
  e.preventDefault()

  const password = {
    old: document.querySelector('#old-password').value,
    new: document.querySelector('#new-password').value,
    confirmNew: document.querySelector('#confirm-new-password').value
  }

  // Send data to server
  fetch('/settings/update-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(password)
  })
    .then(response => response.json())
    .then(data => {
      if (data.validationErrors && data.validationErrors.length > 0) {
        alert(data.validationErrors.join('\n'))
      } else {
        alert(data.message)
      }
    })
    .catch(error => {
      console.error('Error updating password:', error)
      alert('An error occurred. Please try again.')
    })
}