import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, MenuItem, Select } from '@mui/material';
export default function StudentAvgChart() {
  const [yearsAndQuarters, setYearsAndQuarters] = useState([]);

  const [inputData, setInputData] = useState({
    year: '',
    quarter: '',
  });

  // const handleYearInput = (e) => {
  //   setInputData((prev) => ({ ...prev, year: e.target.value }));
  // };

  const handleInputData = (e) => {
    console.log(e.target.value);
    setInputData((prev) => ({
      year: e.target.value.year,
      quarter: e.target.value.quarter,
    }));
    console.log(inputData);
  };

  const clearInputs = () => {
    setInputData({
      year: '',
      quarter: '',
    });
  };

  const validateInput = () => {
    return inputData.year === '' || inputData.quarter === '';
  };

  const getYearsAndQuarters = async () => {
    const { data } = await axios.get('http://localhost:5000/get-years');
    setYearsAndQuarters(data);
  };
  const getData = async () => {
    console.log(inputData);
    setTimeout(clearInputs, 500);
    const { data } = await axios.post(
      'http://localhost:5000/lesson/reports/avg-per-quarter-and-year',
      {
        year: inputData.year,
        quarter: inputData.quarter,
      }
    );
    console.log(data);
  };

  useEffect(() => {
    getYearsAndQuarters();
  }, []);

  return (
    <div>
      <Select
        onChange={handleInputData}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={inputData.year + '-' + inputData.quarter}
        label="Quarter">
        {yearsAndQuarters.map((data) => {
          return (
            <MenuItem value={data._id}>
              {data._id.year + '-' + data._id.quarter}
            </MenuItem>
          );
        })}
      </Select>
      <Button disabled={validateInput()} onClick={getData} variant="contained">
        Submit
      </Button>
      LessonsAvgChart
    </div>
  );
}
