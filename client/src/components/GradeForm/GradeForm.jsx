import {
  Alert,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { ThreeDots } from 'react-loader-spinner';
import env from 'react-dotenv';
import React from 'react';
import './GradeForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  yearAction,
  quarterAction,
  lessonAction,
  gradeAction,
  studentIdAction,
} from '../../redux/acitons/gradeActions';
export default function GradeForm() {
  const dispatch = useDispatch();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    message: '',
    success: false,
  });
  const [inputData, setInputData] = useState({
    year: '',
    quarter: '',
    lesson: '',
    grade: null,
    studentName: '',
    studentId: '',
  });

  const gradeData = useSelector((state) => state.grade);
  const grades = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const quarters = ['q1', 'q2', 'q3', 'q4'];
  const lessons = ['Math', 'IT', 'Literature'];

  const yearHandle = (e) => {
    // eslint-disable-next-line no-unused-expressions
    e.target.value.length > 4
      ? (e.target.value = e.target.value.slice(0, -1))
      : e.target.value;
    setInputData((prev) => ({ ...prev, year: e.target.value }));
    dispatch(yearAction(e.target.value));
  };

  const getStudents = async () => {
    setLoading(!loading);
    await axios
      .get(`${env.SERVER_URL}/students`)
      .then((res) => setStudents(res.data))
      .then(() => {
        setLoading(false);
      });
  };
  const quarterHandle = (e) => {
    setInputData((prev) => ({ ...prev, quarter: e.target.value }));
    dispatch(quarterAction(e.target.value));
  };

  const lessonHandle = (e) => {
    setInputData((prev) => ({ ...prev, lesson: e.target.value }));
    dispatch(lessonAction(e.target.value));
  };

  const gradeHandle = (e) => {
    setInputData((prev) => ({ ...prev, grade: e.target.value }));
    dispatch(gradeAction(e.target.value));
  };

  const chooseStudentHandle = (e) => {
    const student = students.find((elem) => elem.name === e.target.value);
    setInputData((prev) => ({
      ...prev,
      studentName: student.name,
      studentId: student._id,
    }));
    dispatch(studentIdAction(student._id));
  };

  useEffect(() => {
    getStudents();
  }, []);

  const validateInput = () => {
    const { year, quarter, lesson, grade, studentName } = inputData;
    return (
      year === '' ||
      quarter === '' ||
      lesson === '' ||
      grade === '' ||
      studentName === ''
    );
  };

  const postGrade = async () => {
    const { year, quarter, lesson, grade, studentId } = gradeData;
    try {
      await axios
        .post(`${env.SERVER_URL}/create-grade`, {
          year: year,
          quarter: quarter,
          grade: grade,
          lesson: lesson,
          studentId: studentId,
        })
        .then((res) => {
          setStatus({ message: res.data.message, success: true });
        })
        .then(() => {
          setTimeout(clearData, 1000);
        })
        .catch((err) => {
          setStatus({ message: err.response.data.message, success: false });
          setTimeout(clearData, 1000);
        });
    } catch (error) {
      return error;
    }
  };

  const clearData = () => {
    setStatus({ message: '', success: false });
    setInputData({
      year: '',
      quarter: '',
      lesson: '',
      grade: '',
      studentName: '',
      studentId: '',
    });
  };

  return (
    <div className="form-block">
      {loading ? (
        <ThreeDots color="#00BFFF" height={80} width={80} />
      ) : (
        <>
          <div className="form-block-content">
            <Select
              onChange={(e) => chooseStudentHandle(e)}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={inputData.studentName}
              label="Quarter">
              {students.map((student) => {
                return <MenuItem value={student.name}>{student.name}</MenuItem>;
              })}
            </Select>
          </div>
          <div className="form-block-content">
            <InputLabel
              className="form-block-field"
              id="demo-simple-select-label">
              Year
            </InputLabel>
            <TextField
              className="form-block-field"
              onChange={yearHandle}
              id="standard-basic"
              variant="standard"
              type="number"
              value={inputData.year}
            />
          </div>
          <div className="form-block-content">
            <InputLabel id="demo-simple-select-label">Quarter</InputLabel>
            <Select
              className="form-block-field"
              onChange={(e) => quarterHandle(e)}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={inputData.quarter}
              label="Quarter">
              {quarters.map((quarter) => {
                return (
                  <MenuItem value={quarter}>{quarter.toUpperCase()}</MenuItem>
                );
              })}
            </Select>
          </div>
          <div className="form-block-content">
            <InputLabel id="demo-simple-select-label">Lesson</InputLabel>
            <Select
              onChange={(e) => lessonHandle(e)}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={inputData.lesson}
              label="Lesson">
              {lessons.map((lesson) => {
                return (
                  <MenuItem value={lesson}>{lesson.toUpperCase()}</MenuItem>
                );
              })}
            </Select>
            <InputLabel id="demo-simple-select-label">Grade</InputLabel>
          </div>
          <div className="form-block-content">
            <Select
              onChange={(e) => {
                gradeHandle(e);
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={inputData.grade}
              label="Grades">
              {grades.map((quarter) => {
                return (
                  <MenuItem value={quarter}>{quarter.toUpperCase()}</MenuItem>
                );
              })}
            </Select>
          </div>
          <div className="form-block-content">
            <Button
              disabled={validateInput()}
              onClick={postGrade}
              variant="contained">
              Create
            </Button>
          </div>
          <div style={status.message === '' ? { opacity: 0 } : { opacity: 1 }}>
            {status.success ? (
              <Alert severity="success">{status.message}</Alert>
            ) : (
              <Alert severity="error">{status.message}</Alert>
            )}
          </div>
        </>
      )}
    </div>
  );
}
