const mongoose = require('mongoose')

const CounselorAvailabilitySchema = new mongoose.Schema({
  counselorData: {
    ID: String,
    firstName: String,
    lastName: String,
    email: String
  },
  availability: {
    Sunday: {
      start: String,
      end: String
    },
    Monday: {
      start: String,
      end: String
    },
    Tuesday: {
      start: String,
      end: String
    },
    Wednesday: {
      start: String,
      end: String
    },
    Thursday: {
      start: String,
      end: String
    },
    Friday: {
      start: String,
      end: String
    },
    Saturday: {
      start: String,
      end: String
    }
  }
})

module.exports = mongoose.model('CounselorAvailability', CounselorAvailabilitySchema)