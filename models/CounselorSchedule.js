const mongoose = require('mongoose')

const TimeSlotSchema = new mongoose.Schema({
  start: String,
  end: String,
  booked: { type: Boolean, default: false }
})

const CounselorScheduleSchema = new mongoose.Schema({
  counselorData: {
    ID: String,
    firstName: String,
    lastName: String,
    email: String
  },
  schedule: {
    Monday: {
      start: String,
      end: String,
      timeSlots: [TimeSlotSchema]
    },
    Tuesday: {
      start: String,
      end: String,
      timeSlots: [TimeSlotSchema]
    },
    Wednesday: {
      start: String,
      end: String,
      timeSlots: [TimeSlotSchema]
    },
    Thursday: {
      start: String,
      end: String,
      timeSlots: [TimeSlotSchema]
    },
    Friday: {
      start: String,
      end: String,
      timeSlots: [TimeSlotSchema]
    }
  }
})

module.exports = mongoose.model('CounselorSchedule', CounselorScheduleSchema)