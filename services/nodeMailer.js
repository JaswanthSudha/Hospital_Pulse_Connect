require("dotenv").config()
const nodemailer = require("nodemailer")
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "jaswanthsudha2021@gmail.com",
        pass: "bkokgfhekmojalqp"
    }
})
module.exports = { transporter }