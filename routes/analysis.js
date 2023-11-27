const express = require("express")
const router = express.Router()
const upload = require("../middleware/multer")
const analysisController = require("../controllers/analysis")
const { ensureAuth, ensureGuest } = require("../middleware/auth")

router.post("/upload", ensureAuth, upload.single("file"), analysisController.analyze)

module.exports = router