const express = require('express')
const router = express.Router()
const counselingController = require('../controllers/counseling')

// Counselor routes
router.post('/schedule', counselingController.generateAppointments)
router.get('/booked-appointments', counselingController.getBookedAppointments)

// User routes
router.get('/', counselingController.getCounseling)
router.get('/available-appointments', counselingController.getAvailableAppointments)
router.put('/book-appointment/:appointmentID', counselingController.bookAppointment)

module.exports = router