import './App.css';
import InputForm from './components/InputForm/InputForm';
import { Route, Routes } from 'react-router';
import axios from 'axios';
import Charts from './components/Chart/Chart';
import { useEffect } from 'react';
import Home from './components/Home/Home';
import StudentForm from './components/StudentForm/StudentForm';
import GradeForm from './components/GradeForm/GradeForm';
import Header from './components/Header/Header';
import Chart from './components/Chart/Chart';
function App() {
  const fetch = async () => {
    const { data } = await axios.get(
      'http://localhost:5000/student/report/subject-quarter-avg'
    );
    console.log(data);
  };

  // useEffect(() => {
  //   fetch();
  // }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/create-student" element={<StudentForm />}></Route>
        <Route path="/add-grade" element={<GradeForm />}></Route>
        <Route path="/charts" element={<Charts />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/reports" element={<Chart />}></Route>
      </Routes>
    </div>
  );
}

export default App;
