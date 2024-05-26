const express = require("express")
const router = express.Router()
const { upload } = require("../middlewares/imageUpload")
const { uploadImage } = require("../controllers/image")
const { restrictUserWithoutToken } = require("../middlewares/authentication")
// router.use(restrictUserWithoutToken)
router.post("/upload", upload.single("image"), uploadImage)
module.exports = router
