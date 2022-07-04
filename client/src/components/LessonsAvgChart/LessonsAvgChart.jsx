import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import { Chart as ChartJS } from 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import env from 'react-dotenv';
import './LessonsAvgChart.css';
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
    setYearsAndQuarters(data.data);
  };
  const getChartData = async () => {
    setTimeout(clearInputs, 500);
    const { data } = await axios
      .get(`${env.SERVER_URL}/lesson/reports/avg-per-quarter-and-year`, {
        params: {
          year: inputData.year,
          quarter: inputData.quarter,
        },
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
    setChartData(data.data);
    // eslint-disable-next-line no-unused-expressions
    data.length === 0 ? alert('No records available') : null;
  };

  useEffect(() => {
    getYearsAndQuarters();
  }, []);

  return (
    <div className="a">
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
      <div className="form-content">
        <TextField
          className="form-block-field"
          id="standard-basic"
          variant="standard"
          type="text"
          value={inputData.year + '-' + inputData.quarter}
        />
      </div>

      <Button
        style={{ marginTop: 15 }}
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
