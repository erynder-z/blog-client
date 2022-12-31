import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import AllPosts from './components/Main/AllPosts/AllPosts';
import LatestPosts from './components/Main/LatestPosts/LatestPosts';

function App() {
  return (
    <div className="app-container">
      <nav>
        <Navbar />
      </nav>
      <div className="main-container">
        <main className="main">
          <Routes>
            <Route path="/" element={<Navigate replace to="/latest" />}></Route>
            <Route path="/all" element={<AllPosts />}></Route>
            <Route path="/latest" element={<LatestPosts />}></Route>
          </Routes>
        </main>
        <aside>
          <Sidebar />
        </aside>
      </div>
    </div>
  );
}

export default App;
