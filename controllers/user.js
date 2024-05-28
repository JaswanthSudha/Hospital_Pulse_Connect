const bcrypt = require('bcrypt');

const UserModel = require('../models/userModel');
const childModel = require('../models/childModel');

const { createToken } = require("../services/authentication");
const ChildModel = require('../models/childModel');





async function signup(req, res) {
  const { userName, password, phoneNumber, firstName, lastName, gender, dateOfBirth, maritalStatus, state } = req.body;
  // Define required fields
  const requiredFields = ["userName", "password", "phoneNumber", "firstName", "lastName", "gender", "dateOfBirth", "maritalStatus", "state"];

  // Function to validate the request body
  function validateRequestBody(reqBody, requiredFields) {
    return requiredFields.filter(field => {
      if (typeof reqBody[field] === 'number') {
        return isNaN(reqBody[field]);
      } else {
        return !reqBody[field] || reqBody[field].trim() === "";
      }
    });
  }

  // Validate the request body
  const missingFields = validateRequestBody(req.body, requiredFields);
  if (missingFields.length > 0) {
    return res.status(400).json({
      msg: `Missing or empty fields: ${missingFields.join(', ')}`
    });
  }
  let user = await UserModel.findOne({ phoneNumber });
  let user1 = await UserModel.findOne({ userName })

  if (user) return res.status(404).json({ msg: "This phoneNumber is already used" });
  if (user1) return res.status(404).json({ "msg": "This userName is already used" })
  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = await UserModel.create({
      userName: userName.toLowerCase(),
      phoneNumber: phoneNumber,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      dateOfBirth: new Date(dateOfBirth), //  dateOfBirth is a string like '27 Oct 2004' 
      maritalStatus: maritalStatus,
      state: state
    });
  } catch (e) {
    return res.status(500).json({ msg: 'problem to create user' });
  }

  const token = createToken(user);

  return res.status(200).json({ msg: 'User created', token, userName, "userId": user._id });

}

async function login(req, res) {
  const { userName, password } = req.body;
  if (!userName) {
    return res.status(404).json({ "msg": "Enter UserName" })
  }
  if (!password) {
    return res.status(404).json({ "msg": "Enter Password" })
  }
  const user = await UserModel.findOne({ "userName": userName.toLowerCase() });

  if (!user) return res.status(404).json({ msg: 'User not found with this phoneNumber' });

  const comparPassword = await bcrypt.compare(password, user.password);

  // if (password !== user.password) return res.status(401).json({ msg: 'Wrong password' });
  if (!comparPassword) return res.status(401).json({ msg: 'Wrong password' });

  const token = createToken(user);
  return res.status(200).json({ token, userName, "userId": user._id });
}

async function userDetail(req, res) {
  if (!req.body.user) return res.status(401).json({ msg: "Unauthorized" });
  return res.json({ data: req.body.user });
}
async function userDetails(req, res) {
  try {
    const users = await UserModel.find({})
    if (!users) {
      return res.status(401).json({ "msg": "Users Not Found" })
    }
    res.status(200).json(users)

  }
  catch (error) {
    res.status(500).json(error)
  }
}



module.exports = {
  signup,
  login,
  userDetail,
  userDetails
};