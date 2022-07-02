import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
export default function Home() {
  return (
    <div className="content">
      <Link style={{ textDecoration: 'none' }} to="/create-student">
        <div className="btn">
          <Button variant="contained">Create student</Button>
        </div>
      </Link>

      <Link style={{ textDecoration: 'none' }} to="/add-grade">
        <div className="btn">
          <Button variant="contained">Add grade</Button>
        </div>
      </Link>
      <Link style={{ textDecoration: 'none' }} to="/reports">
        <div className="btn">
          <Button variant="contained">Charts</Button>
        </div>
      </Link>
    </div>
  );
}
