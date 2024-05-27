const express = require("express")
const router = express.Router()
const { upload } = require("../middlewares/imageUpload")
const { uploadImage } = require("../controllers/image")
const { restrictUserWithoutToken } = require("../middlewares/authentication")
router.post("/upload", upload.single("image"), restrictUserWithoutToken, uploadImage)
module.exports = router
