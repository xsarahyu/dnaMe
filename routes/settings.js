const express = require('express')
const router = express.Router()
const settingsController = require('../controllers/settings')
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, settingsController.getSettings)
router.post('/update-password', ensureAuth, settingsController.updatePassword)

module.exports = router