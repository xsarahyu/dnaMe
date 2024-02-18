// controllers/profileController.js

const Analysis = require('../models/Analysis')
const Appointment = require('../models/Appointment')

exports.getUserProfile = async (req, res) => {
  try {
    // Fetch user data from request
    const user = {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email
    }

    // Fetch analysis data from database
    const analysis = {}
    const analysisDB = await Analysis.findOne({ 'user.email': req.user.email })

    if (analysisDB) {
      analysis.rs429358Genotype = analysisDB.analysis.rs429358Genotype
      analysis.rs7412Genotype = analysisDB.analysis.rs7412Genotype
      analysis.APOE = analysisDB.analysis.APOE
      analysis.risk = analysisDB.analysis.risk
    }

    // Fetch appointment data from database
    const appointment = await Appointment.find({ 'user.email': req.user.email })

    // Update view
    res.render('profile/user.ejs', { user, analysis, appointment })

  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
}