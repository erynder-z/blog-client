import React from 'react';
import './AdminSection.css';
import { FaUserLock } from 'react-icons/fa';

export default function AdminSection() {
  const handleClick = () => {
    window.open('https://www.example.com', '_blank');
  };

  return (
    <button className="adminBtn" onClick={handleClick}>
      Author Login <FaUserLock />
    </button>
  );
}
