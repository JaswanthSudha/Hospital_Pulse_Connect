const express = require("express")
const router = express.Router()
const { createDocument, getAllDocuments, getDocumentById } = require("../controllers/document")
const { upload } = require("../middlewares/imageUpload")
const { restrictUserWithoutToken } = require("../middlewares/authentication")
router.post("/", upload.single("document"), restrictUserWithoutToken, createDocument)
router.get("/", getAllDocuments)
router.get("/:id", restrictUserWithoutToken, getDocumentById)
module.exports = router;