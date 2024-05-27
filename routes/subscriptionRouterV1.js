const express = require('express')
const router = express.Router()
const { restrictUserWithoutToken } = require("../middlewares/authentication")
const { createSubscription, getSubscriptions } = require("../controllers/subscription")
router.use(restrictUserWithoutToken)
router.post("/", createSubscription)
router.get("/", getSubscriptions)
module.exports = router
