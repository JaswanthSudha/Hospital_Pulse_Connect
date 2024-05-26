const express = require("express")
const router = express.Router()
const { createDoctor, getDoctorById, getAllDoctors } = require("../controllers/doctor")
router.post("/", createDoctor)
router.get("/:id", getDoctorById)
router.get("/", getAllDoctors)
module.exports = router