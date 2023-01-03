import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import AllPosts from './components/Main/AllPosts/AllPosts';
import LatestPosts from './components/Main/LatestPosts/LatestPosts';
import About from './components/Main/About/About';
import PostPage from './components/Main/PostPage/PostPage';

function App() {
  return (
    <div className="app-container">
      <div className="main-container">
        <nav>
          <Navbar />
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Navigate replace to="/latest" />} />
            <Route path="/all" element={<AllPosts />} />
            <Route path="/latest" element={<LatestPosts />} />
            <Route path="/about" element={<About />} />
            <Route path="/post/:id" element={<PostPage />} />
          </Routes>
        </main>
      </div>
      <aside>
        <div className="side-container">
          <Sidebar />
        </div>
      </aside>
    </div>
  );
}

export default App;
