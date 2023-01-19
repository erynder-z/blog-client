import React, { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { ViewType } from '../../interfaces/customTypes';
import './Navbar.css';

interface Props {
  currentView: ViewType | null;
  setCurrentView: Dispatch<SetStateAction<ViewType | null>>;
}

export default function Navbar({ currentView, setCurrentView }: Props) {
  const handleSetCurrentView = (currentView: 'All' | 'Latest' | 'About' | 'Other') => {
    setCurrentView(currentView);
    localStorage.setItem('currentView', currentView);
  };

  return (
    <div className="navbar">
      <h1 className="nav-title">Blog</h1>
      <div className="nav-list">
        <Link
          to="/all"
          className={`nav-list-item ${currentView === 'All' ? 'active' : ''}`}
          onClick={() => handleSetCurrentView('All')}>
          All
        </Link>
        <Link
          to="/latest"
          className={`nav-list-item ${currentView === 'Latest' ? 'active' : ''}`}
          onClick={() => handleSetCurrentView('Latest')}>
          Latest
        </Link>
        <Link
          to="/about"
          className={`nav-list-item ${currentView === 'About' ? 'active' : ''}`}
          onClick={() => handleSetCurrentView('About')}>
          About
        </Link>
      </div>
    </div>
  );
}
