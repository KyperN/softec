import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

export default function Header() {
  return (
    <header className="header">
      <Link style={{ textDecoration: 'none' }} to="/">
        <h2>Home</h2>
      </Link>
    </header>
  );
}
