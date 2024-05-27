const mongoose = require("mongoose")
const paymentSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    amount: Number,
    date: { type: Date, default: Date.now },
    status: String,
});
module.exports = mongoose.model("Payment", paymentSchema)