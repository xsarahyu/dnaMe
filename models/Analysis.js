const mongoose = require('mongoose')

const AnalysisSchema = new mongoose.Schema({
  user: {
    ID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
  },
  analysis: {
    rs429358Genotype: String,
    rs7412Genotype: String,
    APOE: String,
    risk: String,
    error: String
  }
})

module.exports = mongoose.model('Analysis', AnalysisSchema)