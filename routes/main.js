const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const homeController = require('../controllers/home');
const userController = require('../controllers/user');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

// Main Routes
router.get('/', homeController.getIndex);
router.get('/profile', ensureAuth, userController.getProfile);
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/logout', userController.logout);
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);

module.exports = router;