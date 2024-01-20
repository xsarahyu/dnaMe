const CounselorSchedule = require('../models/CounselorSchedule')

module.exports = {

  // Counselor controllers
  setSchedule: async (req, res) => {
    try {
      const counselorData = {
        ID: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email
      }

      const schedule = req.body.schedule

      // Remove existing schedule for counselor
      await CounselorSchedule.deleteOne({
        'counselorData.ID': counselorData.ID
      })

      // Save new schedule
      await CounselorSchedule.create({ 
        counselorData,
        schedule
      })

      console.log('Schedule saved')
      res.json({ message: 'Schedule saved successfully!' })

    } catch (error) {
      console.log(error)
      res.status(500).send('Internal Server Error')
    }
  },

  // User controllers
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