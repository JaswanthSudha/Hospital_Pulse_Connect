const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    require: true
  },
  firstName: {
    type: String,
    require: true
  },
  lastName: {
    type: String,
    require: true
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    require: true
  },
  dateOfBirth: {
    type: Date,
    require: true
  },
  phoneNumber: {
    type: Number,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  maritalStatus: {
    type: String,
    enum: ['single', 'married', 'divorced', 'widowed', 'other'],
    required: true
  },
  state: {
    type: String,
    required: true
  },

}, { timestamps: true });


const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;