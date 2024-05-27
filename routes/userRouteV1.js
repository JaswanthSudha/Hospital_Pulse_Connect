const { Router } = require('express');
const { signup, login, userDetail, addChild } = require("../controllers/user")

const router = Router();

router.post('/signup', signup); // add user or parent
router.post('/login', login);

router.get('/', userDetail);



module.exports = router;