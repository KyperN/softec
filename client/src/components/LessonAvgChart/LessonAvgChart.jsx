import React from 'react';
import axios from 'axios';
import { Chart as ChartJS } from 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import { Button, MenuItem, Select } from '@mui/material';
export default function StudentAvgChart() {
  const [chosenLesson, setChosenLesson] = useState('');
  const [chosenYear, setChosenYear] = useState('');
  const [years, setYears] = useState([]);
  const [chartData, setChartData] = useState([]);
  const lessons = ['Math', 'IT', 'Literature'];

  const handleChosenLesson = (e) => {
    setChosenLesson(e.target.value);
  };

  const handleChosenYear = (e) => {
    setChosenYear(e.target.value);
  };

  const getYears = async () => {
    const { data } = await axios.get('http://localhost:5000/get-years');
    const years = [...new Set(data.map((elem) => elem.year))];
    setYears(years);
    console.log(years);
  };

  const getChartData = async () => {
    setTimeout(clearInputs, 500);
    const { data } = await axios.get(
      'http://localhost:5000/lesson/report/subject-quarter-avg',
      {
        params: {
          lesson: chosenLesson,
          year: chosenYear,
        },
      }
    );
    setChartData(data);
    console.log(chartData);
  };

  const validateInput = () => {
    return chosenLesson === '' || chosenYear === '';
  };

  const clearInputs = () => {
    setChosenLesson('');
  };

  useEffect(() => {
    getYears();
  }, []);

  return (
    <div>
      <Select
        onChange={handleChosenLesson}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={chosenLesson}
        label="Lesson">
        {lessons.map((lesson) => {
          return <MenuItem value={lesson}>{lesson}</MenuItem>;
        })}
      </Select>
      <Select
        onChange={handleChosenYear}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={chosenYear}
        label="Year">
        {years.map((year) => {
          return <MenuItem value={year}>{year}</MenuItem>;
        })}
      </Select>
      <Button
        disabled={validateInput()}
        onClick={getChartData}
        variant="contained">
        Submit
      </Button>
      <div className="bar">
        <Bar
          options={{}}
          data={{
            labels: chartData
              .map((elem) => `${chosenYear} - ${elem._id}`)
              .sort(),
            datasets: [
              {
                label: 'Average per Quarter',
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
