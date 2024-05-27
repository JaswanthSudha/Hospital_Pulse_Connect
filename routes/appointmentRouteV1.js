const express = require("express")
const router = express.Router()
const { createNewAppointment, getAllAppointMents } = require("../controllers/appointment")
const { restrictUserWithoutToken } = require("../middlewares/authentication")
router.use(restrictUserWithoutToken)
router.post("/", createNewAppointment)
router.get("/", getAllAppointMents)
module.exports = router