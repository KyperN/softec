import React from 'react';
import { useSelector } from 'react-redux';
import './InputForm.css';

import StudentForm from '../StudentForm/StudentForm';
import GradeForm from '../GradeForm/GradeForm';
import { Button } from '@mui/material';

export default function InputForm() {
  const studentData = useSelector((state) => state.student);

  const handle = () => {
    console.log(studentData);
  };

  return (
    <div className="form-content">
      <StudentForm />
      <GradeForm />
      <Button onClick={handle}>Primary</Button>
    </div>
  );
}
