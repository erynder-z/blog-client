import React from 'react';
import './AdminSection.css';
import { FaUserLock } from 'react-icons/fa';

export default function AdminSection() {
  const handleClick = () => {
    window.open('https://www.example.com', '_blank');
  };

  return (
    <div className="admin-container">
      <button className="adminBtn" onClick={handleClick}>
        Admin Login <FaUserLock />
      </button>
    </div>
  );
}
