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
    } catch (error) {
      console.log("error in token validation ", error);
    }
    return next();
  }
}

function restrictUserWithoutToken(req, res,next) {
  return async (req, res, next) =>{
    if(!req.headers?.authorization) return res.json({msg: "You are not authorized user"});
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split(" ")[1];
      const userPayload = validateToken(token);
      const userData = await UserModel.findOne({ _id: userPayload.userId});
      if(!userData) return res.json({msg: "You are not authorized user"})
      req.body.user = userData;
    } catch (error) {
      return res.json({msg: `error: ${error}`})
    }
    return next();
  }
}

module.exports = {
  checkForAuthenticationToken,
  restrictUserWithoutToken
};