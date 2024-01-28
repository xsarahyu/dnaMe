const mongoose = require('mongoose')

const AppointmentSchema = new mongoose.Schema({
  start: Date,
  end: Date,
  booked: { type: Boolean, default: false },
  counselor: {
    ID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    firstName: String,
    lastName: String,
    email: String
  },
  user: {
    ID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    email: { type: String, default: null }
  }
})

module.exports = mongoose.model('Appointment', AppointmentSchema)