const mongoose = require("mongoose")
const subscriptionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId
    }
    ,

    plan: { type: String },
    startDate: {
        type: Date, default: Date.now

    },
    endDate: { type: Date },
    features: { type: [String] }
})
module.exports = mongoose.model("Subscription", subscriptionSchema)