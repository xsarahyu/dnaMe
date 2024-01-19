const CounselorAvailability = require('../models/CounselorAvailability')

module.exports = {

  // Counselor controllers
  setAvailability: async (req, res) => {
    try {
      const counselorData = {
        ID: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email
      }

      const availability = req.body.availability

      // Remove existing availability for counselor
      await CounselorAvailability.deleteOne({
        'counselorData.ID': counselorData.ID
      })

      // Save new availability
      await CounselorAvailability.create({ 
        counselorData,
        availability
      })

      console.log('Availability updated')
      res.json({ message: 'Availability updated successfully!' })

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

      // Get counselor availability data
      const counselorAvailability = await CounselorAvailability.find()

      // Pass counselor availability data to counseling.ejs
      res.render('counseling.ejs', {
        user: userData,
        counselorAvailability
      })

    } catch (error) {
      console.log(error)
      res.status(500).send('Internal Server Error')
    }
  }
}