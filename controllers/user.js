// controllers/userController.js

const User = require('../models/User')

exports.getProfile = (req, res) => {
  // Retrieve user info from DB or req.user object
  const userData = {
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email
  }
  res.render('profile', {
    title: 'Profile',
    user: userData // Pass user data to view
  })
}

exports.getEditProfile = (req, res) => {
  res.render('edit-profile', {
    title: 'Edit Profile',
    user: req.user // Pass user data to view
  })
}

exports.putEditProfile = (req, res) => {
  // Retrieve updated profile info from form
  const { ethnicity, birthdate } = req.body

  // Update user's profile info in DB
  User.findByIdAndUpdate(req.user.id, { ethnicity, birthdate }, (err, user) => {
    if (err) {
      console.error('Error updating user profile:', err)
      return res.redirect('/edit-profile')
    }
    res.redirect('/profile')
  })
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