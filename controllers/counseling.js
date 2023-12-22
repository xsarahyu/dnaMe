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
        const day = startDate.toLocaleDateString('en-US', { weekday: 'long' }) 

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

            await Appointment.create(appointment)

            // Move to next hour
            startTime.setTime(startTime.getTime() + 60 * 60 * 1000)
          }
        }
        
        // Move to next day
        startDate.setDate(startDate.getDate() + 1)
      }
      
      console.log('Appointments saved successfully')
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
          booked: true,
          'counselor.email': req.user.email
        })
        res.json(appointments)
        
      } catch (error) {
        console.error('Error getting appointments:', error)
        res.status(500).send('Internal Server Error')
      }
    },

  // ---------- USER FUNCTION(S) ---------- //
  
  // Render counseling.ejs
  getCounseling: async (req, res) => {
    try {
      const user = {
        ID: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email
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

  // Book appointment and update its details
  bookAppointment: async (req, res) => {
    try {
      const user = {
        ID: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email
      }

      const appointmentID = req.params.appointmentID
      
      // Find appointment
      const appointment = await Appointment.findById(appointmentID)

      // Update appointment details
      appointment.set({
        booked: true,
        user: {
          ID: user.ID,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      })

      await appointment.save()

      res.status(200).json(appointment)
      
    } catch (error) {
      console.error('Error booking appointment:', error)
      res.status(500).send('Internal Server Error')
    }
  }
}