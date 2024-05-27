const { createPayment, updatePayment, getPayment } = require("../controllers/payment")
const express = require('express')
const router = express.Router()
const { restrictUserWithoutToken } = require("../middlewares/authentication")
router.use(restrictUserWithoutToken)
router.post("/", createPayment)
router.get("/", getPayment)
router.patch("/", updatePayment)
module.exports = router
