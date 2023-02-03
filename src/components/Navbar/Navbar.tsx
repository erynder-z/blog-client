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
    <nav aria-label="Main navigation" className="navbar">
      <h1 className="nav-title">
        <FaLayerGroup aria-hidden="true" />
        ./code/blog
      </h1>
      <ul className="nav-list">
        <li className="nav-list-item">
          <Link
            to="/all"
            className={`${currentView === 'All' ? 'active' : ''}`}
            aria-current={currentView === 'All' ? 'page' : undefined}
            onClick={() => {
              handleSetCurrentView('All'), setActiveTag(null);
            }}>
            All Articles
          </Link>
        </li>
        <li className="nav-list-item">
          <Link
            to="/latest"
            className={`${currentView === 'Latest' ? 'active' : ''}`}
            aria-current={currentView === 'Latest' ? 'page' : undefined}
            onClick={() => {
              handleSetCurrentView('Latest'), setActiveTag(null);
            }}>
            Latest Articles
          </Link>
        </li>
        <li className="nav-list-item">
          <Link
            to="/about"
            className={`${currentView === 'About' ? 'active' : ''}`}
            aria-current={currentView === 'About' ? 'page' : undefined}
            onClick={() => {
              handleSetCurrentView('About'), setActiveTag(null);
            }}>
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}
