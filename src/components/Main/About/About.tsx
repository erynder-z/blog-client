import React from 'react';
import './About.css';

export default function About() {
  return (
    <main className="about-container">
      <h1>About this blog</h1>
      <p>
        Welcome to my blog! I am Stefan, a self-taught developer and writer with a passion for
        learning and sharing my knowledge with others. I have created this platform to share my
        thoughts, ideas, and experiences on a variety of topics that interest me.
      </p>
      <p>
        I built this blog using React on the frontend and created a self-coded REST API with Express
        and MongoDB on the backend. I have also coded a CMS to provide the content you see here.
      </p>
      <p>
        I believe in providing my readers with a seamless and personalized experience, that's why
        I've integrated features like commenting, keyword search, and article filtering by tags. My
        readers can also change the theme of the website to suit their preferences.
      </p>
      <p>
        I hope you find my blog informative, engaging, and thought-provoking. I welcome your
        comments and feedback and look forward to hearing from you. Thank you for visiting my blog!
      </p>
    </main>
  );
}
