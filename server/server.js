const express = require('express');
const mongoose = require('mongoose');
const Student = require('./schemes/Student');
const Grade = require('./schemes/Grade');
const studentsController = require('./controllers/studentsController');
const reportsController = require('./controllers/reportsController');
const app = express();
const PORT = 5000;

app.use(express.json());

const start = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://admin:admin@cluster0.8rkr9hz.mongodb.net/students?retryWrites=true&w=majority'
    );
    console.log('db connected');
  } catch (err) {
    console.error('error!!!', err.message);
  }
};

app.listen(PORT, () => {
  start();
  console.log('serv run');
});

app.post('/lesson/reports/avg-per-quarter-and-year', async (req, res) => {
  try {
    const data = await Grade.aggregate([
      {
        $match: {
          year: req.body.year,
          quarter: req.body.quarter,
        },
      },
      {
        $group: {
          _id: '$lesson',
          averageGrade: { $avg: '$grade' },
        },
      },
    ]);
    console.log(data);
  } catch (err) {}
});

app.get(
  '/lesson/report/subject-quarter-avg',
  reportsController.getLessonQuarterAvg
);

app.get(
  '/student/report/per-quarter-avg',
  reportsController.getStudentQuarterAvg
);

app.get('/get-years', reportsController.getYears);

app.get('/students', studentsController.getStudents);

app.post('/create-student', studentsController.createStudent);

app.post('/create-grade', studentsController.createGrade);
