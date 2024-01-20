const express = require('express')
const router = express.Router()
const counselingController = require('../controllers/counseling')

// Counselor routes
router.post('/set-schedule', counselingController.setSchedule)

// User routes
router.get('/', counselingController.getCounseling)

module.exports = router