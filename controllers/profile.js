// controllers/profileController.js

const AnalysisResults = require('../models/AnalysisResults');

exports.getProfile = async (req, res) => {
  try {
    const userData = {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      userID: req.user._id
    };

    // Fetch analysis results from DB based on user's ID
    const analysisResults = await AnalysisResults.findOne({ userID: req.user._id });

    if (analysisResults) {
      userData.rs429358Genotype = analysisResults.rs429358Genotype;
      userData.rs7412Genotype = analysisResults.rs7412Genotype;
      userData.APOE = analysisResults.APOE;
      userData.risk = analysisResults.risk;
      userData.error = analysisResults.error || 'none';
    }

    if (req.user.role === 'user') {
      res.render('profile-user', { user: userData });
    } else if (req.user.role === 'counselor') {
      res.render('profile-counselor', { counselor: userData });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};