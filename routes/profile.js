const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const profileController = require('../controllers/profile')
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, profileController.getProfile)

module.exports = router