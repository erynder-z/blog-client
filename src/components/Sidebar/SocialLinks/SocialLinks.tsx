import React from 'react';
import './SocialLinks.css';
import { FaGithub, FaEnvelope } from 'react-icons/fa';

export default function SocialLinks() {
  const handleGithubClick = () => {
    window.open('https://github.com/erynder-z', '_blank');
  };

  return (
    <div className="socialBtn">
      <button>
        <FaGithub onClick={handleGithubClick} />
      </button>
      <a className="mailto" href="mailto:stfn.bgr@gmail.com">
        {' '}
        <FaEnvelope />
      </a>
    </div>
  );
}
