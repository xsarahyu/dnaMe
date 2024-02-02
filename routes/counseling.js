const express = require('express')
const router = express.Router()
const counselingController = require('../controllers/counseling')

// Counselor routes
router.post('/schedule', counselingController.generateAppointments)

// User routes
router.get('/', counselingController.getCounselingPage)
router.get('/get-appointments', counselingController.getAppointments)
router.put('/book-appointment/:appointmentID', counselingController.bookAppointment)

module.exports = router