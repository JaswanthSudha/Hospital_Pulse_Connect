const { Router } = require('express');
const { signup, login, userDetail, userDetails, verifyEmail } = require("../controllers/user")

const router = Router();

router.post('/signup', signup); // add user or parent
router.post('/login', login);
router.get("/:token", verifyEmail)
router.get('/user', userDetail);
router.get("/", userDetails)



module.exports = router;