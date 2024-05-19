const {Router} = require('express');
const { signup, login, userDetail} = require("../controllers/user")

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/',userDetail);


module.exports = router;