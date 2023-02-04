import React, { useContext, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import AllArticles from './components/Main/AllArticles/AllArticles';
import LatestArticles from './components/Main/LatestArticles/LatestArticles';
import About from './components/Main/About/About';
import ArticlePage from './components/Main/ArticlePage/ArticlePage';
import { FaAngleDoubleUp } from 'react-icons/fa';
import { ViewType } from './interfaces/customTypes';
import NotFoundPage from './components/Main/NotFoundPage/NotFoundPage';
import ThemeContext from './contexts/ThemeContext';
import SearchResults from './components/Main/SearchResults/SearchResults';

function App() {
  const { theme } = useContext(ThemeContext);
  const [currentView, setCurrentView] = useState<ViewType | null>(
    (localStorage.getItem('currentView') as ViewType) || null
  );
  const [sidebarActive, setSidebarActive] = useState<boolean>(false);

  const toggleSidebarActive = () => {
    setSidebarActive(!sidebarActive);
  };

  return (
    <div className={`app-container ${theme}`}>
      <div className="main-container">
        <nav>
          <Navbar currentView={currentView} />
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Navigate replace to="/latest" />} />
            <Route path="/all" element={<AllArticles setCurrentView={setCurrentView} />} />
            <Route path="/latest" element={<LatestArticles setCurrentView={setCurrentView} />} />
            <Route path="/about" element={<About setCurrentView={setCurrentView} />} />
            <Route path="/article/:id" element={<ArticlePage setCurrentView={setCurrentView} />} />
            <Route path="/search" element={<SearchResults setCurrentView={setCurrentView} />} />
            <Route path="*" element={<NotFoundPage setCurrentView={setCurrentView} />} />
          </Routes>
        </main>
      </div>
      <aside>
        <FaAngleDoubleUp
          aria-label="Toggle Sidebar"
          className={`sidebar_toggle ${sidebarActive ? 'active' : ''}`}
          onClick={toggleSidebarActive}
        />
        <div className={`side-container ${sidebarActive ? 'active' : ''}`}>
          <Sidebar />
        </div>
      </aside>
    </div>
  );
}

export default App;
