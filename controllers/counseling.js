const Appointment = require('../models/Appointment')

module.exports = {
  // ---------- COUNSELOR FUNCTION(S) ---------- //

  // Generate appointments based on provided schedule
  generateAppointments: async (req, res) => {
    try {
      const counselor = {
        ID: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email
      }

      const schedule = req.body.schedule

      // Remove existing appointments for counselor
      await Appointment.deleteMany({ 'counselor.ID': counselor.ID })
      
      // Start from beginning of 2024
      const startDate = new Date('2024-01-01')

      // Iterate over each day, until end of year
      while (startDate.getFullYear() <= 2024) {
        // Get day name
        const day = new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone: 'America/New_York' }).format(startDate)

        // Check if schedule exists for current day (no schedule for weekends)
        if (schedule[day]) { 
          const startTime = new Date(startDate)
          const endTime = new Date(startDate)

          const [startHour, startMinute] = schedule[day].start.split(':')
          const [endHour, endMinute] = schedule[day].end.split(':')

          startTime.setHours(startHour)
          startTime.setMinutes(startMinute)

          endTime.setHours(endHour)
          endTime.setMinutes(endMinute)

          while (startTime < endTime) {
            // Make hour-long appointments
            const appointment = {
              counselor: counselor,
              start: new Date(startTime),
              end: new Date(startTime.getTime() + 60 * 60 * 1000)
            }

            // Save appointments to database
            await Appointment.create(appointment)

            // Move to next hour
            startTime.setTime(startTime.getTime() + 60 * 60 * 1000)
          }
        }
        
        // Move to next day
        startDate.setDate(startDate.getDate() + 1)
      }
      
      res.status(200).json({ message: 'Appointments saved successfully' })

    } catch (error) {
      console.error('Error saving appointments:', error)
      res.status(500).send('Internal Server Error')
    }
  },

  // Send booked appointments to calendar on home/counselor.ejs
  getBookedAppointments: async (req, res) => {
    try {
      const appointments = await Appointment.find({
        'counselor.email': req.user.email,
        booked: true
      })

      res.json(appointments)
      
    } catch (error) {
      console.error('Error getting appointments:', error)
      res.status(500).send('Internal Server Error')
    }
  },

  // ---------- USER FUNCTION(S) ---------- //
  
  // Render counseling.ejs
  getCounseling: (req, res) => {
    try {
      const user = {
        firstName: req.user.firstName
      }

      res.render('counseling.ejs', { user })

    } catch (error) {
      console.error('Error rendering page:', error)
      res.status(500).send('Internal Server Error')
    }
  },

  // Send available appointments to calendar on counseling.ejs
  getAvailableAppointments: async (req, res) => {
    try {
      const appointments = await Appointment.find({ booked: false })
      res.json(appointments)
      
    } catch (error) {
      console.error('Error getting appointments:', error)
      res.status(500).send('Internal Server Error')
    }
  },

  // Book appointment and update its details in database
  bookAppointment: async (req, res) => {
    try {
      const user = {
        ID: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email
      }

      // Fetch appointment from database
      const appointmentID = req.params.appointmentID
      const appointment = await Appointment.findById(appointmentID)

      // Update appointment details in database
      appointment.set({
        booked: true,
        user: {
          ID: user.ID,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      })

      // Save appointment details in database
      await appointment.save()

      res.status(200).json(appointment)
      
    } catch (error) {
      console.error('Error booking appointment:', error)
      res.status(500).send('Internal Server Error')
    }
  }
}