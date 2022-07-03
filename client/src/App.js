import './App.css';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Route, Routes } from 'react-router';

import Charts from './components/Chart/Chart';

import Home from './components/Home/Home';
import StudentForm from './components/StudentForm/StudentForm';
import GradeForm from './components/GradeForm/GradeForm';
import Header from './components/Header/Header';
import Chart from './components/Chart/Chart';

function App() {
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
