const appointmentModel = require("../models/appointmentModel")
const doctorModel = require("../models/doctorModel")
const createNewAppointment = async (req, res) => {
    try {
        // const appointmentDate = new Date(date).toISOString();
        const { doctorId, date, time } = req.body
        const userId = req.body.user._id
        const doctor = await doctorModel.findById({ _id: doctorId })
        if (!doctor.available) {
            return res.status(400).json({ "message": "Doctor is not Available" })
        }
        const appointment = await appointmentModel.create({ doctorId, userId, time, date })
        res.status(200).json(appointment)
    }
    catch (error) {
        res.status(500).json(error.message)

    }

}
const getAllAppointMents = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({})
        res.status(200).json(appointments);
    }
    catch (error) {
        res.status(500).json(error.message)
    }
}
module.exports = { createNewAppointment, getAllAppointMents }