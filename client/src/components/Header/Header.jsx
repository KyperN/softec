import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

export default function Header() {
  return (
    <header className="header">
      <Link to="/">
        <Button style={{ textDecoration: 'none' }} variant="text">
          Home
        </Button>
      </Link>
    </header>
  );
}
