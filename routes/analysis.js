const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
// const fs = require('fs');
const analysisController = require("../controllers/analysis")
// const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post("/upload", upload.single("file"), analysisController.consoleLog);

module.exports = router;