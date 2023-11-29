// controllers/userController.js

const User = require('../models/User')

exports.getHome = (req, res) => {
  const userData = {
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email
  }
  if (req.user.role === 'user') {
    res.render('home-user.ejs', { user: userData })
  } else if (req.user.role === 'counselor') {
    res.render('home-counselor.ejs', { counselor: userData })
  }
}

exports.logout = (req, res) => {
  req.logout(() => {
    console.log('User has logged out.')
  })
  req.session.destroy((err) => {
    if (err) {
      console.log('Error: Failed to destroy the session during logout.', err)
    }
    req.user = null
    res.redirect('/')
  })
}