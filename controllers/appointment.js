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
const completedAppointments = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({ state: true })
        if (appointments.length == 0) {
            return res.status(200).json({ "message": "No Appointments Completed Yet" })
        }
        res.status(200).json({ "message": "Completed Appointments", appointments })
    }
    catch (error) {
        res.status(500).json({ "message": "Error while Fetching CompletedAppointments ", error })

    }

}
const upcomingAppointements = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({ state: false })
        if (appointments.length == 0) {
            return res.status(200).json({ "message": "No future Appointments" })
        }
        res.status(200).json(appointments)
    }
    catch (error) {
        res.status(500).json({ "message": "Error While Fetching FutureAppointments", error })
    }
}
const markAppointementCompleted = async (req, res) => {
    try {
        const { id } = req.params
        const appointment = await appointmentModel.findByIdAndUpdate({ _id: id }, { state: true })
        res.status(200).json({ "message": "Appointemet is Completed Successfully", appointment })
    }
    catch (error) {
        res.status(500).json({ "message": "Error While Updating Appointment" })

    }
}
module.exports = { createNewAppointment, getAllAppointMents, completedAppointments, upcomingAppointements, markAppointementCompleted }