const calendarEl = document.getElementById('calendar')

const calendar = new FullCalendar.Calendar(calendarEl, {
  selectable: true,
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  events: getAvailableAppointments,
  eventClick: handleEventClick
})

calendar.render()

function getAvailableAppointments(info, successCallback, failureCallback) {
  fetch('/counseling/available-appointments', { method: 'GET' })
  .then(response => response.json())
  .then(data => {
    const appointments = data.map(appointment => ({
      id: appointment._id,
      title: 'Available',
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

function handleEventClick(info) {
  const appointmentID = info.event.id
  const isAvailable = !info.event.extendedProps.booked

  if (isAvailable && confirm('Do you want to book this appointment?')) {
    fetch(`/counseling/book-appointment/${appointmentID}`, { method: 'PUT' })
      .then(response => response.json())
      .then(data => {
        // FullCalendar function to update and reload calendar
        calendar.refetchEvents()
        
        // Format date and time for success message
        const userLocale = navigator.language || 'en-US'
        const date = new Date(data.start).toLocaleDateString(userLocale, {
          weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
        })
        const startTime = new Date(data.start).toLocaleTimeString(userLocale, {
          hour: 'numeric', minute: '2-digit', hour12: true
        })
        const endTime = new Date(data.end).toLocaleTimeString(userLocale, {
          hour: 'numeric', minute: '2-digit', hour12: true
        })

        alert(`Appointment successfully booked!
          \nDate: ${date}
          \nTime: ${startTime} to ${endTime}`)
      })
      .catch(error => {
        console.error('Error booking appointment:', error)
        alert('Failed to book appointment. Please try again.')
      })
  }
}