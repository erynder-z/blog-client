import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import AllPosts from './components/Main/AllPosts/AllPosts';
import LatestPosts from './components/Main/LatestPosts/LatestPosts';
import About from './components/Main/About/About';
import ArticlePage from './components/Main/ArticlePage/ArticlePage';
import { ITag } from './Interfaces/Tag';

function App() {
  const [activeTag, setActiveTag] = useState<ITag | null>(null);
  return (
    <div className="app-container">
      <div className="main-container">
        <nav>
          <Navbar />
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Navigate replace to="/latest" />} />
            <Route path="/all" element={<AllPosts activeTag={activeTag} />} />
            <Route path="/latest" element={<LatestPosts activeTag={activeTag} />} />
            <Route path="/about" element={<About />} />
            <Route path="/post/:id" element={<ArticlePage />} />
          </Routes>
        </main>
      </div>
      <aside>
        <div className="side-container">
          <Sidebar setActiveTag={setActiveTag} />
        </div>
      </aside>
    </div>
  );
}

export default App;
