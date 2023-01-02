import React from 'react';
import './Navbar.css';

export default function Navbar() {
  return (
    <div className="navbar">
      <h1 className="nav-title">Blog</h1>
      <div className="nav-list">
        <a href="/all" className="nav-list-item">
          All
        </a>
        <a href="/latest" className="nav-list-item">
          Latest
        </a>
        <a href="/tags" className="nav-list-item">
          Tags
        </a>
        <a href="/about" className="nav-list-item">
          About
        </a>
      </div>
    </div>
  );
}
