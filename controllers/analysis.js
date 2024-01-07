// controllers/analysisController.js

const Analysis = require('../models/Analysis')

module.exports = {
  analyze: async (req, res) => {
    try {
      // Process and split DNA file into lines
      if (!req.file) return res.status(400).send('No file uploaded!')
      const fileContent = req.file.buffer.toString('utf-8')
      if (!fileContent.trim()) return res.status(400).send('The file is empty!')
      const dataLines = fileContent.split('\n')

      // Function 1: Given rsID, get genotype
      function getGenotype(rsID) {
        for (const row of dataLines) {
          if (row.startsWith(`${rsID}\t`)) {
            const columns = row.split('\t')
            return genotype = columns[3].trim()
          }
        }
        return 'Not found'
      }

      // Function 2: Given genotype, get APOE gene and Alzheimer's risk
      let APOE, risk, error
      function getAlzheimersRisk(rs429358Genotype, rs7412Genotype) {
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
          error = 'there was an issue with your raw DNA file. Your APOE type and risk could not be determined.'
        }
        return { APOE, risk, error }
      }

      // Call functions and store results in variables
      const rs429358Genotype = getGenotype('rs429358')
      const rs7412Genotype = getGenotype('rs7412')
      const analysisResults = getAlzheimersRisk(rs429358Genotype, rs7412Genotype)

      const user = {
        ID: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email
      }

      const analysis = {
        rs429358Genotype: rs429358Genotype,
        rs7412Genotype: rs7412Genotype,
        APOE: analysisResults.APOE,
        risk: analysisResults.risk,
        error: analysisResults.error || 'N/A'
      }

      // Save data to database
      await Analysis.create({ user, analysis })

      // Update view
      res.render('analysis.ejs', { user, analysis })

    } catch (error) {
      console.error(error)
      res.status(500).send('Internal Server Error')
    }
  }
}