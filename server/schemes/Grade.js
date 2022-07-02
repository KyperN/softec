const mongoose = require('mongoose');

const gradeScheme = new mongoose.Schema(
  {
    year: {
      type: String,
      required: true,
    },
    quarter: {
      type: String,
      required: true,
    },
    grade: {
      type: Number,
      required: true,
    },
    lesson: {
      type: String,
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'student',
    },
  },
  { collection: 'grade' }
);

module.exports = mongoose.model('Grade', gradeScheme);
