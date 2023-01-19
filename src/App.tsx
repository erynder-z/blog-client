import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import AllArticles from './components/Main/AllArticles/AllArticles';
import LatestArticles from './components/Main/LatestArticles/LatestArticles';
import About from './components/Main/About/About';
import ArticlePage from './components/Main/ArticlePage/ArticlePage';
import { ITag } from './interfaces/Tag';
import { FaAngleDoubleUp } from 'react-icons/fa';
import { ViewType } from './interfaces/customTypes';

function App() {
  const [currentView, setCurrentView] = useState<ViewType | null>(
    (localStorage.getItem('currentView') as ViewType) || null
  );
  const [filter, setFilter] = useState<ITag | string | null>(null);
  const [sidebarActive, setSidebarActive] = useState<boolean>(false);

  const handleTagFilter = (tag: ITag) => {
    tag !== filter ? setFilter(tag) : setFilter(null);
  };

  const handleSearch = (query: string) => {
    setFilter(query);
  };

  const toggleSidebarActive = () => {
    setSidebarActive(!sidebarActive);
  };

  return (
    <div className="app-container">
      <div className="main-container">
        <nav>
          <Navbar currentView={currentView} setCurrentView={setCurrentView} />
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Navigate replace to="/latest" />} />
            <Route path="/all" element={<AllArticles filter={filter} />} />
            <Route path="/latest" element={<LatestArticles filter={filter} />} />
            <Route path="/about" element={<About />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </main>
      </div>
      <aside>
        <FaAngleDoubleUp
          className={`sidebar_toggle ${sidebarActive ? 'active' : ''}`}
          onClick={toggleSidebarActive}
        />
        <div className={`side-container ${sidebarActive ? 'active' : ''}`}>
          <Sidebar handleTagFilter={handleTagFilter} handleSearch={handleSearch} />
        </div>
      </aside>
    </div>
  );
}

export default App;
