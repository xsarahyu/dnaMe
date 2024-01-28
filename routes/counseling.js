const express = require('express')
const router = express.Router()
const counselingController = require('../controllers/counseling')

// Counselor routes
router.post('/schedule', counselingController.generateAppointments)

// User routes
router.get('/', counselingController.getCounseling)

module.exports = router