import React, { Dispatch, SetStateAction, useContext } from 'react';
import { Link } from 'react-router-dom';
import ActiveTagContext from '../../contexts/ActiveTagContext';
import { ViewType } from '../../interfaces/customTypes';
import { FaLayerGroup } from 'react-icons/fa';
import './Navbar.css';

interface Props {
  currentView: ViewType | null;
  setCurrentView: Dispatch<SetStateAction<ViewType | null>>;
}

export default function Navbar({ currentView, setCurrentView }: Props) {
  const { setActiveTag } = useContext(ActiveTagContext);

  const handleSetCurrentView = (currentView: 'All' | 'Latest' | 'About' | 'Other') => {
    setCurrentView(currentView);
    localStorage.setItem('currentView', currentView);
  };

  return (
    <div className="navbar">
      <h1 className="nav-title">
        {' '}
        <FaLayerGroup />
        Blog
      </h1>
      <div className="nav-list">
        <Link
          to="/all"
          className={`nav-list-item ${currentView === 'All' ? 'active' : ''}`}
          onClick={() => {
            handleSetCurrentView('All'), setActiveTag(null);
          }}>
          All
        </Link>
        <Link
          to="/latest"
          className={`nav-list-item ${currentView === 'Latest' ? 'active' : ''}`}
          onClick={() => {
            handleSetCurrentView('Latest'), setActiveTag(null);
          }}>
          Latest
        </Link>
        <Link
          to="/about"
          className={`nav-list-item ${currentView === 'About' ? 'active' : ''}`}
          onClick={() => {
            handleSetCurrentView('About'), setActiveTag(null);
          }}>
          About
        </Link>
      </div>
    </div>
  );
}
