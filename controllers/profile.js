// controllers/profileController.js

const Analysis = require('../models/Analysis')

exports.getProfile = async (req, res) => {
  try {
    const user = {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email
    }

    const analysis = {}

    // Fetch analysis data from DB
    const analysisDB = await Analysis.findOne({ 'user.email': req.user.email })

    // Add analysisDB to analysis object
    if (analysisDB) {
      analysis.rs429358Genotype = analysisDB.analysis.rs429358Genotype
      analysis.rs7412Genotype = analysisDB.analysis.rs7412Genotype
      analysis.APOE = analysisDB.analysis.APOE
      analysis.risk = analysisDB.analysis.risk
    }

    if (req.user.role === 'user') {
      res.render('profile-user.ejs', { user, analysis })
    } else if (req.user.role === 'counselor') {
      res.render('profile-counselor.ejs', { counselor: user })
    }

  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
}