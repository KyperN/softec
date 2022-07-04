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

    res.status(200).send({
      success: true,
      data: data,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: 'Couldnt query',
    });
  }
};

const getLessonQuarterAvg = async (req, res) => {
  const { lesson, year } = req.query;
  try {
    const data = await Grade.aggregate([
      {
        $match: {
          lesson: lesson,
          year: year,
        },
      },
      {
        $group: {
          _id: '$quarter',
          averageGrade: { $avg: '$grade' },
        },
      },
    ]);

    res.status(200).send({
      success: true,
      data: data,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: 'Server error',
    });
  }
};

const getStudentQuarterAvg = async (req, res) => {
  const studentId = req.query.studentId;
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
    res.status(200).send({
      success: true,
      data: data,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: 'Server error',
    });
  }
};

const getLessonsAvgPerQuarterAndYear = async (req, res) => {
  const { year, quarter } = req.query;
  try {
    const data = await Grade.aggregate([
      {
        $mach: {
          year: year,
          quarter: quarter,
        },
      },
      {
        $group: {
          _id: '$lesson',
          averageGrade: { $avg: '$grade' },
        },
      },
    ]);
    res.status(200).send({
      success: true,
      data: data,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: 'Server error',
    });
  }
};

module.exports = {
  getYears: getYears,
  getLessonQuarterAvg: getLessonQuarterAvg,
  getStudentQuarterAvg: getStudentQuarterAvg,
  getLessonsAvgPerQuarterAndYear: getLessonsAvgPerQuarterAndYear,
};
