document.querySelector('#saveScheduleBtn').addEventListener('click', saveSchedule)

function saveSchedule(e) {
  e.preventDefault()

  const schedule = {
    Monday: { start: document.querySelector('#monStart').value, end: document.querySelector('#monEnd').value },
    Tuesday: { start: document.querySelector('#tueStart').value, end: document.querySelector('#tueEnd').value },
    Wednesday: { start: document.querySelector('#wedStart').value, end: document.querySelector('#wedEnd').value },
    Thursday: { start: document.querySelector('#thuStart').value, end: document.querySelector('#thuEnd').value },
    Friday: { start: document.querySelector('#friStart').value, end: document.querySelector('#friEnd').value }
  }
  
  // Send data to server
  fetch('/counseling/schedule', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ schedule })
  })
    .then(response => response.json())
    .then(data => {
      alert(data.message)
    })
    .catch(error => {
      console.error('Error saving schedule:', error)
      alert('Error saving schedule. Please try again.')
    })
}