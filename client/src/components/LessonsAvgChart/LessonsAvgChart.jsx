import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, MenuItem, Select } from '@mui/material';
import { Chart as ChartJS } from 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import env from 'react-dotenv';
export default function StudentAvgChart() {
  const [yearsAndQuarters, setYearsAndQuarters] = useState([]);

  const [inputData, setInputData] = useState({
    year: '',
    quarter: '',
  });
  const [chartData, setChartData] = useState([]);

  const handleInputData = (e) => {
    setInputData(() => ({
      year: e.target.value.year,
      quarter: e.target.value.quarter,
    }));
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
    const { data } = await axios.get(`${env.SERVER_URL}/years`);
    setYearsAndQuarters(data);
  };
  const getChartData = async () => {
    setTimeout(clearInputs, 500);
    const { data } = await axios.get(
      `${env.SERVER_URL}/lesson/reports/avg-per-quarter-and-year`,
      {
        params: {
          year: inputData.year,
          quarter: inputData.quarter,
        },
      }
    );
    setChartData(data);
  };

  useEffect(() => {
    getYearsAndQuarters();
  }, []);

  return (
    <div>
      <Select
        style={{ marginRight: 20, marginTop: 25 }}
        onChange={handleInputData}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={inputData.year + '-' + inputData.quarter}
        label="Quarter">
        {yearsAndQuarters.map((data, i) => {
          return (
            <MenuItem key={i} value={data._id}>
              {data._id.year + '-' + data._id.quarter}
            </MenuItem>
          );
        })}
      </Select>
      <Button
        disabled={validateInput()}
        onClick={getChartData}
        variant="contained">
        Submit
      </Button>
      <Bar
        options={{}}
        data={{
          labels: chartData.map((elem) => elem._id),
          datasets: [
            {
              label: 'Lesson Avg Per Quarter',
              data: chartData.map((elem) => elem.averageGrade),
              backgroundColor: ['orange'],
            },
          ],
        }}
      />
    </div>
  );
}
