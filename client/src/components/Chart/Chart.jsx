import { MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import StudentAvgChart from '../StudentAvgChart/StudentAvgChart';
import LessonAvgChart from '../LessonAvgChart/LessonAvgChart';
import LessonsAvgChart from '../LessonsAvgChart/LessonsAvgChart';
export default function Charts() {
  const reports = [
    'Student Average Per Quarter',
    'Lesson Average Per Quarter',
    'Lessons Average Per Quarter',
  ];

  const [report, setReport] = useState(null);

  const reportTypeHandle = (e) => {
    setReport(e.target.value);
  };

  const displayChart = () => {
    switch (report) {
      case 'Student Average Per Quarter':
        return <StudentAvgChart />;
      case 'Lesson Average Per Quarter':
        return <LessonAvgChart />;
      case 'Lessons Average Per Quarter':
        return <LessonsAvgChart />;
      default: {
        return;
      }
    }
  };

  return (
    <div>
      <Select
        value={report}
        onChange={reportTypeHandle}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Student Class">
        {reports.map((report) => {
          return <MenuItem value={report}>{report}</MenuItem>;
        })}
      </Select>
      {displayChart()}
    </div>
  );
}
