// controllers/analysisController.js

const AnalysisResults = require('../models/AnalysisResults')

module.exports = {
  analyze: async (req, res) => {
    try {
      if (!req.file) return res.status(400).send('No file uploaded!')
      const fileContent = req.file.buffer.toString('utf-8')
      if (!fileContent.trim()) return res.status(400).send('The file is empty!')
      const dataLines = fileContent.split('\n')

      function getGenotype(rsID) {
        for (const row of dataLines) {
          if (row.startsWith(`${rsID}\t`)) {
            const columns = row.split('\t')
            return columns[3].trim()
          }
        }
        return 'Not found'
      }

      let APOE, risk, error
      function analyzeAlzheimersRisk(rs429358Genotype, rs7412Genotype) {
        if (rs429358Genotype === 'TT' && rs7412Genotype === 'TT') {
          APOE = 'ε2/ε2'
          risk = 'lower risk than normal'
        } else if (rs429358Genotype === 'TT' && rs7412Genotype === 'CT') {
          APOE = 'ε2/ε3'
          risk = 'lower risk than normal'
        } else if (rs429358Genotype === 'CT' && rs7412Genotype === 'CT') {
          APOE = 'ε2/ε4'
          risk = 'slightly higher risk than normal'
        } else if (rs429358Genotype === 'TT' && rs7412Genotype === 'CC') {
          APOE = 'ε3/ε3'
          risk = 'normal risk'
        } else if (rs429358Genotype === 'CT' && rs7412Genotype === 'CC') {
          APOE = 'ε3/ε4'
          risk = 'higher risk than normal'
        } else if (rs429358Genotype === 'CC' && rs7412Genotype === 'CC') {
          APOE = 'ε4/ε4'
          risk = 'high risk'
        } else {
          error = 'there was an issue with your raw DNA file. Your APOE type and risk could not be ascertained.'
        }
        return { APOE, risk, error }
      }

      const firstName = req.user.firstName
      const lastName = req.user.lastName
      const email = req.user.email
      const rs429358Genotype = getGenotype('rs429358')
      const rs7412Genotype = getGenotype('rs7412')
      const analysis = analyzeAlzheimersRisk(rs429358Genotype, rs7412Genotype)

      // Save data to DB
      await AnalysisResults.create({
        firstName,
        lastName,
        email,
        rs429358Genotype,
        rs7412Genotype,
        APOE: analysis.APOE,
        risk: analysis.risk,
        error: analysis.error || 'none'
      })

      // Update view
      res.render('analysis.ejs', { firstName, analysis })

    } catch (error) {
      console.error(error)
      res.status(500).send('Internal Server Error')
    }
  }
}