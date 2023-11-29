// controllers/profileController.js

const AnalysisResults = require('../models/AnalysisResults')

exports.getProfile = async (req, res) => {
  try {
    const userData = {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
    }

    // Fetch analysis results from DB based on user's email
    const analysisResults = await AnalysisResults.findOne({ email: req.user.email })

    // If analysis results found, add it to userData
    if (analysisResults) {
      userData.rs429358Genotype = analysisResults.rs429358Genotype
      userData.rs7412Genotype = analysisResults.rs7412Genotype
      userData.APOE = analysisResults.APOE
      userData.risk = analysisResults.risk
    }

    // Render profiles with userData
    if (req.user.role === 'user') {
      res.render('profile-user.ejs', { user: userData })
    } else if (req.user.role === 'counselor') {
      res.render('profile-counselor.ejs', { counselor: userData }) // Counselors don't have analysis results, so this only contains firstName, lastName, email
    } 
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
}