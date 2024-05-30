const reportModel = require("../models/reportModel")
const getReports = async (req, res) => {
    try {
        const userId = req.body.user._id
        const reports = await reportModel.find({ userId })
        if (!reports) {
            return res.status(200).json({ "message": "Reports Not Generated" })
        }
        res.status(200).json(reports)
    }
    catch (error) {
        res.status(500).json(error)

    }
}
module.exports = { getReports }