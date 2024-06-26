const imageModel = require("../models/image")
const reportModel = require("../models/reportModel")
const mlPrediction = require("./ml")
const uploadImage = async (req, res) => {
    try {
        const { childId } = req.body;
        const userId = req.body.user._id
        // console.log(userId)
        // console.log(childId)
        if (!req.file) {
            return res.status(500).json({ "message": "Image not Uploaded" })
        }
        const image = await imageModel.create({ data: req.file.buffer, contentType: req.file.mimetype, userId, childId })
        if (!image) {
            return res.status(500).json("image not uploaded")
        }
        // console.log("Buffer", req.file)
        const reportValue = await mlPrediction.prediction(image.data)
        const report = await reportModel.create({ value: reportValue, userId, childId })
        if (!report) {
            return res.status(500).json("report is not generated")
        }
        res.json({
            report: report,
            image: {
                data: image.data,
                contentType: image.contentType
            }
        });
    }
    catch (error) {
        res.status(500).json(error.message)
    }
}
module.exports = { uploadImage }