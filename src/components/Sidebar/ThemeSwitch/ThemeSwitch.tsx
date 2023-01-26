import React, { useContext } from 'react';
import './ThemeSwitch.css';
import ThemeContext from '../../../contexts/ThemeContext';
import { ThemeType } from '../../../interfaces/customTypes';

export default function ThemeSwitch() {
  const { theme, setTheme } = useContext(ThemeContext);
  const themes = ['Default', 'Matte', 'Dark', 'Bright'];
  const currentIndex = themes.indexOf(theme as ThemeType);
  const nextIndex = (currentIndex + 1) % themes.length;

  const handleClick = () => {
    setTheme(themes[nextIndex] as ThemeType);
    localStorage.setItem('theme', themes[nextIndex]);
  };

  return (
    <div className="theme-switch">
      <button className="theme_switch-button" onClick={handleClick}>
        Theme: {theme}
      </button>
    </div>
  );
}