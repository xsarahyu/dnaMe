const mongoose = require('mongoose')

const AnalysisResultsSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  rs429358Genotype: String,
  rs7412Genotype: String,
  APOE: String,
  risk: String,
  error: String
})

module.exports = mongoose.model('AnalysisResults', AnalysisResultsSchema)