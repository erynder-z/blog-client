import React from 'react';
import { FaGithub, FaEnvelope } from 'react-icons/fa';
import './SocialLinks.css';

export default function SocialLinks() {
  const handleGithubClick = () => {
    window.open('https://github.com/erynder-z', '_blank');
  };

  return (
    <div className="socialBtn">
      <button aria-label="Github link" onClick={handleGithubClick}>
        <FaGithub />
      </button>
      <a className="mailto" href="mailto:stfn.bgr@gmail.com" aria-label="Email link">
        {' '}
        <FaEnvelope />
      </a>
    </div>
  );
}
