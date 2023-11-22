// controllers/analysisController.js

module.exports = {
  analyze: async (req, res) => {
    try {
      if (!req.file) return res.status(400).send('No file uploaded!');
      const fileContent = req.file.buffer.toString('utf-8');

      if (!fileContent.trim()) return res.status(400).send('The file is empty!')

      if (fileContent.includes('rs59306338')) {
        res.send('The file contains rs59306338.');
      } else {
        res.send('The file does not contain rs59306338.');
      }
    } catch (error) {
      console.error(error)
      res.status(500).send('Internal Server Error');
    }
  }
};