const { validateToken } = require("../services/authentication");
const UserModel = require('../models/userModel');

function checkForAuthenticationToken() {
  return async (req, res, next) => {
    if (!req.headers?.authorization) return next();

    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split(" ")[1];
      const userPayload = validateToken(token);
      const userData = await UserModel.findOne({ _id: userPayload.userId});
      req.body.user = userData;
      console.log(`user data in middleware ${userData}`);
    } catch (error) {
      console.log("error in token validation ", error);
    }
    return next();
  }
}

function restrictUserWithoutToken(req, res,next) {
  if(!req.headers?.authorization) return res.json({msg: "You are not authorized user"});
  return next();
}

module.exports = {
  checkForAuthenticationToken,
  restrictUserWithoutToken
};