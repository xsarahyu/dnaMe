// controllers/analysisController.js

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

      function analyzeAlzheimersRisk(rs429358Genotype, rs7412Genotype) {
        if (rs429358Genotype === 'TT' && rs7412Genotype === 'TT') {
          return 'APOE allele ε2/ε2, lower risk'
        } else if (rs429358Genotype === 'TT' && rs7412Genotype === 'CT') {
          return 'APOE allele ε2/ε3, lower risk'
        } else if (rs429358Genotype === 'CT' && rs7412Genotype === 'CT') {
          return 'APOE allele ε2/ε4, slightly higher risk than normal'
        } else if (rs429358Genotype === 'TT' && rs7412Genotype === 'CC') {
          return 'APOE allele ε3/ε3, normal risk'
        } else if (rs429358Genotype === 'CT' && rs7412Genotype === 'CC') {
          return 'APOE allele ε3/ε4, higher risk than normal'
        } else if (rs429358Genotype === 'CC' && rs7412Genotype === 'CC') {
          return 'APOE allele ε4/ε4, highest risk'
        } else {
          return 'Invalid genotypes'
        }
      }

      const rs429358Genotype = getGenotype('rs429358')
      const rs7412Genotype = getGenotype('rs7412')
      analyzeAlzheimersRisk(rs429358Genotype, rs7412Genotype)

    } catch (error) {
      console.error(error)
      res.status(500).send('Internal Server Error')
    }
  }
}