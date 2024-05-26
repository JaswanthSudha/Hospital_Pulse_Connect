const UserModel = require('../models/userModel');
const ChildModel = require('../models/childModel');


async function addChild(req, res) {
  if (!req.body.user) return res.status(401).json({ msg: "Unauthorized" });
  const { firstName, lastName, gender, dateOfBirth } = req.body;
  // Define required fields
  const requiredFields = ["firstName", "lastName", "gender", "dateOfBirth"];

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

  try {
    child = await ChildModel.create({
      firstName: firstName,
      lastName: lastName,
      userId: req.body.user._id,
      gender: gender,
      dateOfBirth: new Date(dateOfBirth), //  dateOfBirth is a string like '27 Oct 2004' 
    });
    // parent = await UserModel.findOne({ _id: req.body.user._id});
    // parent.childList.push( child._id);
    // parent.save();
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: 'problem to create child' });
  }
  return res.status(200).json({ msg: 'Child created', childId: child._id });
}

async function childDetail(req, res) {
  if (req.params.id.trim() === "") return res.status(401).json({ msg: "Give valid params" });
  const child = await ChildModel.findOne({ _id: req.params.id });
  return res.status(200).json({ data: child });
}

module.exports = {
  addChild,
  childDetail
};