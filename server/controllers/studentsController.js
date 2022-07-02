const Student = require('../schemes/Student');
const Grade = require('../schemes/Grade');
const getStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).send(students);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const createStudent = async (req, res) => {
  const { name, dateOfBirth, mainClass } = req.body;
  const existingUsers = await Student.find({ name: name });
  try {
    if (existingUsers.length > 0) {
      res.status(409).send('Error');
    } else {
      const student = await Student.create({
        name: name,
        dateOfBirth: dateOfBirth,
        mainClass: mainClass,
      });
      await student.save();
      res.status(201).send('Success');
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
};

const createGrade = async (req, res) => {
  const { year, quarter, grade, lesson, studentId } = req.body;

  try {
    const record = await Grade.create({
      year: year,
      quarter: quarter,
      grade: grade,
      lesson: lesson,
      studentId: studentId,
    });
    await record.save();
    res.status(201).send('OK');
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
};

module.exports = {
  getStudents: getStudents,
  createStudent: createStudent,
  createGrade: createGrade,
};
