const { Router } = require('express');
const { signup, login, userDetail, addChild, userDetails } = require("../controllers/user")

const router = Router();

router.post('/signup', signup); // add user or parent
router.post('/login', login);

router.get('/user', userDetail);
router.get("/", userDetails)



module.exports = router;