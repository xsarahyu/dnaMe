const calendarEl = document.getElementById('calendar')

const calendar = new FullCalendar.Calendar(calendarEl, {
  selectable: true,
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  events: getBookedAppointments
})

calendar.render()

function getBookedAppointments(info, successCallback, failureCallback) {
  fetch('/counseling/booked-appointments', { method: 'GET' })
  .then(response => response.json())
  .then(data => {
    const appointments = data.map(appointment => ({
      id: appointment._id,
      title: 'Booked',
      start: appointment.start,
      end: appointment.end,
      booked: appointment.booked,
      user: appointment.user
    }))

    successCallback(appointments)
  })
  .catch(error => {
    console.error('Error getting appointments:', error)
    failureCallback(error)
  })
}

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
      console.error('Error saving appointments:', error)
      alert('An error occurred. Please try again.')
    })
}