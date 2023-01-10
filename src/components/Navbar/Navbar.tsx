import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <div className="navbar">
      <h1 className="nav-title">Blog</h1>
      <div className="nav-list">
        <Link to="/all" className="nav-list-item">
          All
        </Link>
        <Link to="/latest" className="nav-list-item">
          Latest
        </Link>
        <Link to="/about" className="nav-list-item">
          About
        </Link>
      </div>
    </div>
  );
}
