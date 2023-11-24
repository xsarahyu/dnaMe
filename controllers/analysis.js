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

      const name = req.user.firstName
      function analyzeAlzheimersRisk(rs429358Genotype, rs7412Genotype) {
        if (rs429358Genotype === 'TT' && rs7412Genotype === 'TT') {
          return `${name}, your APOE genotype is ε2/ε2. You have lower risk than normal of developing Alzheimer\'s disease.`
        } else if (rs429358Genotype === 'TT' && rs7412Genotype === 'CT') {
          return `${name}, your APOE genotype is ε2/ε3. You have lower risk than normal of developing Alzheimer\'s disease.`
        } else if (rs429358Genotype === 'CT' && rs7412Genotype === 'CT') {
          return `${name}, your APOE genotype is ε2/ε4. You have slightly higher risk than normal of developing Alzheimer\'s disease.`
        } else if (rs429358Genotype === 'TT' && rs7412Genotype === 'CC') {
          return `${name}, your APOE genotype is ε3/ε3. You have normal risk of developing Alzheimer\'s disease.`
        } else if (rs429358Genotype === 'CT' && rs7412Genotype === 'CC') {
          return `${name}, your APOE genotype is ε3/ε4. You have higher risk than normal of developing Alzheimer\'s disease.`
        } else if (rs429358Genotype === 'CC' && rs7412Genotype === 'CC') {
          return `${name}, your APOE genotype is ε4/ε4. You have high risk of developing Alzheimer\'s disease.`
        } else {
          return 'Invalid genotypes'
        }
      }

      const rs429358Genotype = getGenotype('rs429358')
      const rs7412Genotype = getGenotype('rs7412')
      const analysis = analyzeAlzheimersRisk(rs429358Genotype, rs7412Genotype)

      res.render('analysis', { analysis })

    } catch (error) {
      console.error(error)
      res.status(500).send('Internal Server Error')
    }
  }
}