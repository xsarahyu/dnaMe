const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const indexController = require('../controllers/index')
const userController = require('../controllers/user')
const { ensureAuth } = require('../middleware/auth')

// Main Routes
router.get('/', indexController.getIndex)
router.get('/home', ensureAuth, userController.getHome)

router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)

router.get('/logout', userController.logout)

router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)

module.exports = router