const doctorModel = require("../models/doctorModel")
const createDoctor = async (req, res) => {
    try {
        const { name, specialization, available } = req.body
        const doctor = await doctorModel.create({ name, specialization, available })
        res.status(200).json(doctor)
    }
    catch (error) {
        res.status(500).json(error.message)
    }
}
const getDoctorById = async (req, res) => {
    try {
        const { id } = req.params.id;
        const doctor = await doctorModel.findById({ _id: id })
        res.status(200).json(doctor)
    }
    catch (error) {
        res.status(500).json(error.message)
    }

}
const getAllDoctors = async (req, res) => {
    try {

        const doctors = await doctorModel.find({})
        res.status(200).json(doctors)
    }
    catch (error) {
        res.status(500).json(error.message)
    }

}
module.exports = { createDoctor, getDoctorById, getAllDoctors }