const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');

const { createToken } = require("../services/authentication");




async function signup(req, res) {
  const { password, phoneNumber, firstName, lastName, gender, dateOfBirth,maritalStatus, state} = req.body;
  let user = await UserModel.findOne({ phoneNumber });

  if (user) return res.status(404).json({ msg: "This phoneNumber is already used" });

  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = await UserModel.create({
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

  return res.status(200).json({ msg: 'User created', token });

}

async function login(req, res) {
  const { phoneNumber, password } = req.body;
  const user = await UserModel.findOne({ phoneNumber });

  if (!user) return res.status(404).json({ msg: 'User not found with this phoneNumber' });

  const comparPassword = await bcrypt.compare(password, user.password);

  // if (password !== user.password) return res.status(401).json({ msg: 'Wrong password' });
  if (!comparPassword) return res.status(401).json({ msg: 'Wrong password' });

  const token = createToken(user);
  return res.status(200).json({ token });
}

async function userDetail(req, res){
  if(!req.body.user) return res.status(401).json({ msg: "Unauthorized"});
  return res.json({data: req.body.user});
}

module.exports ={
  signup,
  login,
  userDetail
};