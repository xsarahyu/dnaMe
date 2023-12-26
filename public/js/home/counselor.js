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
      title: `${appointment.user.lastName}, ${appointment.user.firstName}`,
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