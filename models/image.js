const mongoose = require("mongoose")
const imageSchema = new mongoose.Schema({
    data: {
        type: Buffer,
    },
    contentType: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    childId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Child"
    }
}, { timestamps: true })
module.exports = mongoose.model("childImage", imageSchema)