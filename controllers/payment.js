const paymentModel = require("../models/paymentModel")
const createPayment = async (req, res) => {
    try {
        const userId = req.body.user._id
        const { amount, date, status } = req.body;
        const payment = await paymentModel.create({ userId, amount, date, status })
        res.status(200).json(payment);
    }
    catch (error) {
        res.status(500).json(error)
    }
}
const getPayment = async (req, res) => {
    try {
        const userId = req.body.user._id
        const payment = await paymentModel.find({ userId })
        res.status(200).json(payment)
    }
    catch (error) {
        res.status(500).json(error)
    }

}
const updatePayment = async (req, res) => {
    try {
        const userId = req.body.user._id
        const updatedPayment = await paymentModel.findOneAndUpdate({ userId }, { ...req.body })
        res.status(500).json(updatedPayment)
    }
    catch (error) {
        res.status(500).json(error)
    }
}
module.exports = { createPayment, updatePayment, getPayment }