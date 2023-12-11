const CounselorAvailability = require('../models/CounselorAvailability')

module.exports = {
  setAvailability: async (req, res) => {
    try {
      const counselorID = req.user._id
      const availability = req.body.availability

      // Remove existing availability for counselor
      await CounselorAvailability.deleteOne({ counselorID: counselorID })

      // Save new availability
      await CounselorAvailability.create({
        counselorID,
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
    }
  }
}