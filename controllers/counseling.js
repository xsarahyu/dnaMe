const CounselorAvailability = require('../models/CounselorAvailability')

module.exports = {

  // Counselor controllers
  setAvailability: async (req, res) => {
    try {
      const counselorID = req.user._id
      const counselorFirstName = req.user.firstName
      const counselorLastName = req.user.lastName
      const counselorEmail = req.user.email
      const availability = req.body.availability

      // Remove existing availability for counselor
      await CounselorAvailability.deleteOne({ counselorID: counselorID })

      // Save new availability
      await CounselorAvailability.create({
        counselorID,
        counselorFirstName,
        counselorLastName,
        counselorEmail,
        sunStart: availability.Sunday.start,
        sunEnd: availability.Sunday.end,
        monStart: availability.Monday.start,
        monEnd: availability.Monday.end,
        tueStart: availability.Tuesday.start,
        tueEnd: availability.Tuesday.end,
        wedStart: availability.Wednesday.start,
        wedEnd: availability.Wednesday.end,
        thuStart: availability.Thursday.start,
        thuEnd: availability.Thursday.end,
        friStart: availability.Friday.start,
        friEnd: availability.Friday.end,
        satStart: availability.Saturday.start,
        satEnd: availability.Saturday.end
      })
      console.log('Availability updated')
    } catch (error) {
      console.log(error)
      res.status(500).send('Internal Server Error')
    }
  },

  // User controllers
  getCounseling: async (req, res) => {
    try {
      const userData = {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
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