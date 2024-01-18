document.querySelector('#saveAvailabilityBtn').addEventListener('click', saveAvailability)

function saveAvailability(e) {
  e.preventDefault()
  const availability = {
    Sunday: { start: document.querySelector('#sunStart').value, end: document.querySelector('#sunEnd').value },
    Monday: { start: document.querySelector('#monStart').value, end: document.querySelector('#monEnd').value },
    Tuesday: { start: document.querySelector('#tueStart').value, end: document.querySelector('#tueEnd').value },
    Wednesday: { start: document.querySelector('#wedStart').value, end: document.querySelector('#wedEnd').value },
    Thursday: { start: document.querySelector('#thuStart').value, end: document.querySelector('#thuEnd').value },
    Friday: { start: document.querySelector('#friStart').value, end: document.querySelector('#friEnd').value },
    Saturday: { start: document.querySelector('#satStart').value, end: document.querySelector('#satEnd').value }
  }
  
  // Send data to server
  fetch('/counseling/set-availability', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ availability })
  })
    .then(response => response.json())
    .then(data => {
      alert('Availability saved successfully!')
    })
    .catch(error => {
      console.error('Error saving availability:', error)
      alert('Error saving availability. Please try again.')
    })
}