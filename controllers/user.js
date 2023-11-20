// controllers/userController.js

const User = require('../models/User');

exports.getProfile = (req, res) => {
  // Retrieve user info from DB or req.user object
  // This is placeholder, modify it based on your actual user data retrieval logic
  const userData = {
    userName: req.user.userName,
    email: req.user.email,
  };

  res.render('profile', {
    title: 'Profile',
    user: userData, // Pass user data to the view
  });
};

exports.getEditProfile = (req, res) => {
  res.render('edit-profile', {
    title: 'Edit Profile',
    user: req.user, // Pass user data to the view
  });
};

exports.putEditProfile = (req, res) => {
  // Retrieve the updated profile information from the form
  const { ethnicity, birthdate } = req.body;

  // Update the user's profile information in the database
  // Modify this part based on your actual user data update logic
  User.findByIdAndUpdate(req.user.id, { ethnicity, birthdate }, (err, user) => {
    if (err) {
      console.error('Error updating user profile:', err);
      // Handle the error, e.g., redirect to an error page
      return res.redirect('/edit-profile');
    }

    // Redirect to the user's profile page after successful update
    res.redirect('/profile');
  });
};

exports.logout = (req, res) => {
  req.logout(() => {
    console.log('User has logged out.');
  });
  req.session.destroy((err) => {
    if (err) {
      console.log('Error: Failed to destroy the session during logout.', err);
    }
    req.user = null;
    res.redirect('/');
  });
};

// Add other user-related actions as needed