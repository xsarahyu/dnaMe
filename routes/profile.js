const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profile')
const { ensureAuth } = require('../middleware/auth')

router.get('/user', ensureAuth, profileController.getUserProfile)
router.get('/counselor', ensureAuth, profileController.getCounselorProfile)

module.exports = router