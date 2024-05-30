const express = require("express")
const router = express.Router()
const { getReports } = require("../controllers/report")
const { restrictUserWithoutToken } = require("../middlewares/authentication")
router.use(restrictUserWithoutToken)
router.get("/", getReports)
module.exports = router