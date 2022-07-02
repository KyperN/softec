import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, MenuItem, Select } from '@mui/material';
export default function StudentAvgChart() {
  const a = [{ year: 2019, quarter: 'q1' }];

  const [inputData, setInputData] = useState({
    year: '',
    quarter: '',
  });

  const handleYearInput = (e) => {
    setInputData((prev) => ({ ...prev, year: e.target.value }));
  };

  const handleQuarterInput = (e) => {
    setInputData((prev) => ({ ...prev, quarter: e.target.value }));
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

  const getData = async () => {
    console.log(inputData);
    setTimeout(clearInputs, 500);
    const { data } = await axios.post('http://localhost:5000', {
      year: inputData.year,
      quarter: inputData.quarter,
    });
    console.log(data);
  };

  return (
    <div>
      <Select
        onChange={handleYearInput}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={inputData.year}
        label="Year">
        {a.map((data) => {
          return <MenuItem value={data.year}>{data.year}</MenuItem>;
        })}
      </Select>
      <Select
        onChange={handleQuarterInput}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={inputData.quarter}
        label="Quarter">
        {a.map((data) => {
          return <MenuItem value={data.quarter}>{data.quarter}</MenuItem>;
        })}
      </Select>
      <Button disabled={validateInput()} onClick={getData} variant="contained">
        Submit
      </Button>
      StudentAvgChart
    </div>
  );
}
