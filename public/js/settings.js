document.querySelector('#updatePasswordBtn').addEventListener('click', updatePassword)
document.querySelector('#deleteAccountBtn').addEventListener('click', deleteAccount)

function updatePassword(e) {
  e.preventDefault()

  const password = {
    old: document.querySelector('#old-password').value,
    new: document.querySelector('#new-password').value,
    confirmNew: document.querySelector('#confirm-new-password').value
  }

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

function deleteAccount() {
  const confirmation = window.confirm('Are you sure you want to delete your account? This action cannot be undone.')

  if (confirmation) {
    fetch('/settings/delete-account', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Account deleted successfully.') {
          window.location.href = '/'
        }
      })
      .catch(error => {
        console.error('Error deleting account:', error)
        alert('An error occurred. Please try again.')
      })
  }
}