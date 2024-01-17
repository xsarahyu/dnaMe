const mongoose = require('mongoose')

const CounselorAvailabilitySchema = new mongoose.Schema({
  counselorID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  counselorFirstName: String,
  counselorLastName: String,
  counselorEmail: String,
  sunStart: String,
  sunEnd: String,
  monStart: String,
  monEnd: String,
  tueStart: String,
  tueEnd: String,
  wedStart: String,
  wedEnd: String,
  thuStart: String,
  thuEnd: String,
  friStart: String,
  friEnd: String,
  satStart: String,
  satEnd: String
})

module.exports = mongoose.model('CounselorAvailability', CounselorAvailabilitySchema)