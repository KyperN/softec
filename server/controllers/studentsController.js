const Student = require('../schemes/Student');
const Grade = require('../schemes/Grade');
const getStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).send(students);
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const createStudent = async (req, res) => {
  const { name, dateOfBirth, mainClass } = req.body;
  const existingUsers = await Student.find({ name: name });
  try {
    if (existingUsers.length > 0) {
      return res.status(409).send({
        success: false,
        message: 'Student exists',
      });
    } else {
      const student = await Student.create({
        name: name,
        dateOfBirth: dateOfBirth,
        mainClass: mainClass,
      });
      await student.save();
      res.status(201).send({
        success: true,
        message: 'Successfully created',
      });
    }
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: 'Server error',
    });
  }
};

const createGrade = async (req, res) => {
  const { year, quarter, grade, lesson, studentId } = req.body;
  const foundGrade = await Grade.find({
    studentId: studentId,
    quarter: quarter,
    lesson: lesson,
    year: year,
  });
  try {
    if (foundGrade.length > 0) {
      return res.status(409).send({
        success: false,
        message: 'Grade already exists',
      });
    } else {
      const record = await Grade.create({
        year: year,
        quarter: quarter,
        grade: grade,
        lesson: lesson,
        studentId: studentId,
      });
      await record.save();
      res.status(201).send({
        success: true,
        message: 'Successfully created',
      });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: 'Server error',
    });
  }
};

module.exports = {
  getStudents: getStudents,
  createStudent: createStudent,
  createGrade: createGrade,
};
