const express = require('express');
const mongoose = require('mongoose');
const Student = require('./schemes/Student');
const Grade = require('./schemes/Grade');
const app = express();

const PORT = 5000;
const studentsController = require('./controllers/studentsController');

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

app.post('/student/report/per-quarter-avg', async (req, res) => {
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
});

app.post('/lesson/report/subject-quarter-avg', async (req, res) => {
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
    console.log(data);
    res.status(200).send(data);
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/get-years', async (req, res) => {
  try {
    const data = await Grade.aggregate([
      {
        $group: {
          _id: { $concat: ['$year', ' - ', '$quarter'] },
          year: { $max: '$year' },
          quarter: { $max: '$quarter' },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.status(200).send(data);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

app.get('/lesson/reports/avg-per-quarter-and-year', async (req, res) => {
  const data = await Grade.aggregate([
    {
      $match: {
        year: '2022',
        quarter: 'q1',
      },
    },
    {
      $group: {
        _id: '$subject',
        averageGrade: { $avg: '$grade' },
      },
    },
  ]);
  console.log(data);
});

app.get('/students', studentsController.getStudents);

app.post('/create-student', studentsController.createStudent);

app.post('/create-grade', studentsController.createGrade);
