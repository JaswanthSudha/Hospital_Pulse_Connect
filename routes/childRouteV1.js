const { Router } = require('express');
const { addChild, childDetail, getChildByParentId, getRootChild } = require("../controllers/child");
const { restrictUserWithoutToken } = require('../middlewares/authentication');

const router = Router();

router.post('/addChild', restrictUserWithoutToken, addChild);
router.get("/rootChild", restrictUserWithoutToken, getRootChild)
router.get("/parent/:id", getChildByParentId)
router.get('/:id', childDetail);




module.exports = router;