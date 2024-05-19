const mongoose = require('mongoose');

const childSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  // Calculating age dynamically
  age: {
    type: Number,
    get: function() {
      // Calculate age from date of birth
      const dob = this.dateOfBirth;
      if (!dob) return null;

      const now = new Date();
      const age = now.getFullYear() - dob.getFullYear();
      const monthDiff = now.getMonth() - dob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dob.getDate())) {
        return age - 1;
      }
      return age;
    },
    set: function(value) {
      // Not allowing to set age directly
      return value;
    }
  }
});

const ChildModel = mongoose.model('Child', childSchema);

module.exports = ChildModel;
