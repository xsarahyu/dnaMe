const Appointment = require('../models/Appointment')

module.exports = {

  // Generate appointments for counselor based on provided schedule
  generateAppointments: async (req, res) => {
    try {
      const counselorData = {
        ID: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email
      }

      const schedule = req.body.schedule

      // Remove existing appointments for counselor
      await Appointment.deleteMany({ 'counselor.ID': counselorData.ID })
      
      const startDate = new Date('2024-01-01') // Start from beginning of 2024

      while (startDate.getFullYear() <= 2024) { // Iterate over each day, until end of year
        const day = startDate.toLocaleDateString('en-US', { weekday: 'long' }) // Get day name

        if (schedule[day]) { // Check if schedule exists for current day (no schedule for weekends)
          const startTime = new Date(startDate)
          const endTime = new Date(startDate)

          const [startHour, startMinute] = schedule[day].start.split(':')
          const [endHour, endMinute] = schedule[day].end.split(':')

          startTime.setHours(startHour)
          startTime.setMinutes(startMinute)

          endTime.setHours(endHour)
          endTime.setMinutes(endMinute)

          while (startTime < endTime) {
            const appointment = {
              counselor: counselorData,
              start: new Date(startTime),
              end: new Date(startTime.getTime() + 60 * 60 * 1000) // Hour-long appointments
            }

            await Appointment.create(appointment)

            startTime.setTime(startTime.getTime() + 60 * 60 * 1000) // Move to next hour
          }
        }
        
        startDate.setDate(startDate.getDate() + 1) // Move to next day
      }
      
      console.log('Appointments saved successfully!')
      res.status(200).json({ message: 'Schedule saved successfully!' })

    } catch (error) {
      console.error('Error saving appointments:', error)
      res.status(500).send('Internal Server Error')
    }
  },

  // User functions
  getCounseling: async (req, res) => {
    try {
      const userData = {
        ID: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email
      }

      // Get counselor schedule data
      const counselorSchedule = await CounselorSchedule.find()

      // Pass counselor schedule data to counseling.ejs
      res.render('counseling.ejs', {
        user: userData,
        counselorSchedule
      })

    } catch (error) {
      console.log(error)
      res.status(500).send('Internal Server Error')
    }
  }
}