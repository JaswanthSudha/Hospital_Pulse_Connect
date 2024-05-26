const express = require("express")
const router = express.Router()
const { createNewAppointment, getAllAppointMents } = require("../controllers/appointment")
router.post("/", createNewAppointment)
router.get("/", getAllAppointMents)
module.exports = router