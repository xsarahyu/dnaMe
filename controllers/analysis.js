module.exports = {
  consoleLog: async (req, res) => {
    try {
      if (!req.file) return res.status(400).send('No file uploaded!');

      const fileContent = req.file.buffer.toString('utf-8'); // Convert buffer to string

      console.log(req.file)
      console.log(fileContent)

      if (!fileContent.trim()) return res.status(400).send('The file is empty!')

      if (fileContent.includes('rs59306338')) {
        console.log('The file contains rs59306338.');
        res.send('The file contains rs59306338.');
      } else {
        console.log('The file does not contain rs59306338.');
        res.send('The file does not contain rs59306338.');
      }
    } catch (error) {
      console.error(error)
      res.status(500).send('Internal Server Error');
    }
  }
};