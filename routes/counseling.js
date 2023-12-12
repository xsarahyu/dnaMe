const express = require('express')
const router = express.Router()
const counselingController = require('../controllers/counseling')

router.post('/set-availability', counselingController.setAvailability)

module.exports = router