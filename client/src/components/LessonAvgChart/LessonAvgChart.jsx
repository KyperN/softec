import React from 'react';
import axios from 'axios';
import { Chart as ChartJS } from 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import env from 'react-dotenv';
import { useState, useEffect } from 'react';
import { Button, InputLabel, MenuItem, Select } from '@mui/material';
export default function StudentAvgChart() {
  const [years, setYears] = useState([]);
  const [chartData, setChartData] = useState([]);
  const lessons = ['Math', 'IT', 'Literature'];
  const [inputData, setInputData] = useState({
    year: '',
    lesson: '',
  });

  const handleChosenLesson = (e) => {
    setInputData((prev) => ({ ...prev, lesson: e.target.value }));
  };

  const handleChosenYear = (e) => {
    setInputData((prev) => ({ ...prev, year: e.target.value }));
  };

  const getYears = async () => {
    const { data } = await axios.get(`${env.SERVER_URL}/years`);
    const years = [...new Set(data.data.map((elem) => elem.year))];
    setYears(years);
  };

  const getChartData = async () => {
    setTimeout(clearInputs, 500);
    try {
      const { data } = await axios
        .get(`${env.SERVER_URL}/lesson/report/per-quarter-avg`, {
          params: {
            lesson: inputData.lesson,
            year: inputData.year,
          },
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
      setChartData(data.data);
      // eslint-disable-next-line no-unused-expressions
      data.data.length === 0 ? alert('No records available') : '';
    } catch (e) {
      return e;
    }
  };

  const validateInput = () => {
    return inputData.lesson === '' || inputData.year === '';
  };

  const clearInputs = () => {
    setInputData({
      year: '',
      lesson: '',
    });
  };

  useEffect(() => {
    getYears();
  }, []);

  return (
    <div>
      <Select
        style={{ marginLeft: 20, marginTop: 25 }}
        onChange={handleChosenLesson}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={inputData.lesson}
        label="Lesson">
        {lessons.map((lesson, i) => {
          return (
            <MenuItem key={i} value={lesson}>
              {lesson}
            </MenuItem>
          );
        })}
      </Select>
      <Select
        style={{ marginLeft: 30 }}
        onChange={handleChosenYear}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={inputData.year}
        label="Year">
        {years.map((year, i) => {
          return (
            <MenuItem key={i} value={year}>
              {year}
            </MenuItem>
          );
        })}
      </Select>
      <Button
        style={{ marginLeft: 30 }}
        disabled={validateInput()}
        onClick={getChartData}
        variant="contained">
        Submit
      </Button>
      <div className="bar">
        <Bar
          options={{
            scales: {
              y: {
                max: 10,
                min: 0,
              },
            },
          }}
          data={{
            labels: chartData

              .map((elem) => {
                return elem._id.toUpperCase();
              })
              .sort(),
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
    </div>
  );
}
