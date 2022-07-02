const mongoose = require('mongoose');

const studentScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    mainClass: {
      type: String,
      required: true,
    },
  },
  { collection: 'students' }
);

module.exports = mongoose.model('Student', studentScheme);
