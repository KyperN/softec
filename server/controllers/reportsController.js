const Grade = require('../schemes/Grade');
const mongoose = require('mongoose');
const getYears = async (req, res) => {
  try {
    const data = await Grade.aggregate([
      {
        $group: {
          _id: { year: '$year', quarter: '$quarter' },
          year: { $max: '$year' },
          quarter: { $max: '$quarter' },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.status(200).send(data);
    console.log(data);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
};

const getLessonQuarterAvg = async (req, res) => {
  try {
    const data = await Grade.aggregate([
      {
        $match: {
          lesson: req.body.lesson,
          year: req.body.year,
        },
      },
      {
        $group: {
          _id: '$quarter',
          averageGrade: { $avg: '$grade' },
        },
      },
    ]);

    res.status(200).send(data);
  } catch (err) {
    console.log(err.message);
  }
};

const getStudentQuarterAvg = async (req, res) => {
  const { studentId } = req.body;
  try {
    const data = await Grade.aggregate([
      {
        $match: {
          studentId: mongoose.Types.ObjectId(studentId),
        },
      },
      {
        $group: {
          _id: { $concat: ['$year', '-', '$quarter'] },
          year: { $max: '$year' },
          quarter: { $max: '$quarter' },
          averageGrade: { $avg: '$grade' },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.status(200).send(data);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  getYears: getYears,
  getLessonQuarterAvg: getLessonQuarterAvg,
  getStudentQuarterAvg: getStudentQuarterAvg,
};
