import {
  Alert,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import env from 'react-dotenv';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import {
  nameAction,
  dobAction,
  classAction,
} from '../../redux/acitons/studentActions';
import './StudentForm.css';
import axios from 'axios';

export default function StudentForm() {
  const dispatch = useDispatch();

  const [inputData, setInputData] = useState({
    name: '',
    dateOfBirth: '',
    mainClass: '',
  });

  const [status, setStatus] = useState('');
  const studentData = useSelector((state) => state.student);

  const handleName = (e) => {
    setInputData((prev) => ({ ...prev, name: e.target.value }));
    dispatch(nameAction(e.target.value));
  };

  const handleDateOfBirth = (e) => {
    setInputData((prev) => ({ ...prev, dateOfBirth: e.target.value }));
    dispatch(dobAction(e.target.value));
  };

  const handleStudentClass = (e) => {
    setInputData((prev) => ({ ...prev, mainClass: e.target.value }));
    dispatch(classAction(e.target.value));
  };

  const validateInput = () => {
    const { name, dateOfBirth, mainClass } = inputData;
    return name === '' || dateOfBirth === '' || mainClass === '' ? true : false;
  };

  const clearData = () => {
    setStatus('');
    setInputData({
      name: '',
      dateOfBirth: '',
      mainClass: '',
    });
  };

  const postStudent = async () => {
    const { name, dateOfBirth, mainClass } = studentData;
    console.log(studentData);
    try {
      await axios
        .post(`${env.SERVER_URL}/create-student`, {
          name: name,
          dateOfBirth: dateOfBirth,
          mainClass: mainClass,
        })
        .then((res) => {
          setStatus(res.status);
        })
        .then(() => {
          setTimeout(clearData, 1000);
        });
    } catch (error) {
      setStatus(400);
      setTimeout(clearData, 1000);
      return error;
    }
  };

  return (
    <div className="content">
      <InputLabel id="demo-simple-select-label">Students Name</InputLabel>
      <TextField
        value={inputData.name}
        onChange={handleName}
        type="text"
        id="standard-basic"
        variant="standard"
      />
      <InputLabel id="demo-simple-select-label">D.O.B</InputLabel>
      <TextField
        value={inputData.dateOfBirth}
        onChange={handleDateOfBirth}
        type="date"
        id="standart-basic"
      />
      <InputLabel id="demo-simple-select-label">Student Class</InputLabel>
      <Select
        value={inputData.mainClass}
        onChange={handleStudentClass}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Student Class">
        <MenuItem value={'it'}>IT</MenuItem>
        <MenuItem value={'math'}>Math</MenuItem>
        <MenuItem value={'literature'}>Literature</MenuItem>
      </Select>
      <Button
        disabled={validateInput()}
        onClick={postStudent}
        variant="contained">
        Create
      </Button>
      <div style={status === '' ? { opacity: 0 } : { opacity: 1 }}>
        {status === 201 ? (
          <Alert severity="success">Success</Alert>
        ) : (
          <Alert severity="error">Failed</Alert>
        )}
      </div>
    </div>
  );
}
