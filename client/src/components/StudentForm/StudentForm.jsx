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

  const [status, setStatus] = useState({
    message: '',
    success: false,
  });
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
    setStatus({ message: '', success: false });
    setInputData({
      name: '',
      dateOfBirth: '',
      mainClass: '',
    });
  };

  const postStudent = async () => {
    const { name, dateOfBirth, mainClass } = studentData;
    try {
      await axios
        .post(`${env.SERVER_URL}/create-student`, {
          name: name,
          dateOfBirth: dateOfBirth,
          mainClass: mainClass,
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
      setStatus(400);
      setTimeout(clearData, 1000);
      return error;
    }
  };

  return (
    <div className="form-block">
      <div className="form-block-content">
        <InputLabel id="demo-simple-select-label">Students Name</InputLabel>
        <TextField
          value={inputData.name}
          onChange={handleName}
          type="text"
          id="standard-basic"
          variant="standard"
        />
      </div>
      <div className="form-block-contet">
        <TextField
          value={inputData.dateOfBirth}
          onChange={handleDateOfBirth}
          type="date"
          id="standart-basic"
        />
      </div>
      <div className="form-block-content">
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
      </div>
      <div className="form-block-content">
        <Button
          disabled={validateInput()}
          onClick={postStudent}
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
    </div>
  );
}
