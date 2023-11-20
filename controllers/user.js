// controllers/userController.js
const User = require('../models/User');

exports.getProfile = (req, res) => {
    // Retrieve user information from the database or use data from the req.user object
    // This is just a placeholder, modify it based on your actual user data retrieval logic
    const userData = {
        userName: req.user.userName,
        email: req.user.email,
    };

    res.render('profile', {
        title: 'Profile',
        user: userData, // Pass user data to the view
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