const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv').config();
const Student = require('./schemes/Student');
const Grade = require('./schemes/Grade');
const studentsController = require('./controllers/studentsController');
const reportsController = require('./controllers/reportsController');
const app = express();

app.use(express.json());

const start = async () => {
  try {
    await mongoose.connect(env.parsed.DB_URL);
    console.log('db connected');
  } catch (err) {
    console.error('error!!!', err.message);
  }
};

app.listen(env.parsed.PORT, () => {
  start();
  console.log('serv run');
});

app.get(
  '/lesson/reports/avg-per-quarter-and-year',
  reportsController.getLessonsAvgPerQuarterAndYear
);

app.get(
  '/lesson/report/per-quarter-avg',
  reportsController.getLessonQuarterAvg
);

app.get(
  '/student/report/per-quarter-avg',
  reportsController.getStudentQuarterAvg
);

app.get('/years', reportsController.getYears);

app.get('/students', studentsController.getStudents);

app.post('/create-student', studentsController.createStudent);

app.post('/create-grade', studentsController.createGrade);
