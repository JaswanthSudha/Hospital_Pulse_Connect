const mongoose = require("mongoose")
const reportModel = new mongoose.Schema({
    value: {
        type: Number,
        require: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true
    }
    , childId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Child",
        require: true
    }
})
module.exports = mongoose.model("Report", reportModel)