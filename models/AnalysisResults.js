const mongoose = require('mongoose')

const AnalysisResultsSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rs429358Genotype: String,
  rs7412Genotype: String,
  APOE: String,
  risk: String,
  error: String
})

module.exports = mongoose.model('AnalysisResults', AnalysisResultsSchema)