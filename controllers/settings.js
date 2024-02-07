// controllers/settingsController.js

const bcrypt = require('bcrypt')
const validator = require('validator')
const User = require('../models/User')

exports.getSettings = (req, res) => {
  const user = {
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email
  }

  if (req.user.role === 'user') {
    res.render('settings/user.ejs', { user })
  } else if (req.user.role === 'counselor') {
    res.render('settings/counselor.ejs', { counselor: user })
  }
}

exports.updatePassword = async (req, res) => {
  try {
    const { old, new: newPassword, confirmNew } = req.body

    // Validate new password
    const validationErrors = []
    if (!validator.isLength(newPassword, { min: 8 })) {
      validationErrors.push('Password must be at least 8 characters long.')
    }
    if (newPassword !== confirmNew) {
      validationErrors.push('Passwords do not match.')
    }
    if (validationErrors.length > 0) {
      return res.status(400).json({ validationErrors })
    }

    // Retrieve user from database
    const user = await User.findOne({ email: req.user.email })
    if (!user) {
      return res.status(404).json({ message: 'User not found.' })
    }

    // Compare old password with hashed password from database
    const isPasswordMatch = await bcrypt.compare(old, user.password)
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Incorrect password.' })
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10)

    // Update password in database
    await User.findOneAndUpdate(
      { email: req.user.email },
      { $set: { password: hashedNewPassword } }
    )

    res.json({ message: 'Password updated successfully.' })

  } catch (error) {
    console.error('Error updating password:', error)
    res.status(500).json({ message: 'An error occurred. Please try again.' })
  }
}

exports.deleteAccount = async (req, res) => {
  try {
    await User.findOneAndDelete({ email: req.user.email })
    res.status(200).json({ message: 'Account deleted successfully.' })

  } catch (error) {
    console.error('Error deleting account:', error)
    res.status(500).json({ message: 'An error occurred. Please try again.' })
  }
}