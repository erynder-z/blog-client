import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { FilterContextProvider } from './contexts/FilterContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeContextProvider>
        <FilterContextProvider>
          <App />
        </FilterContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
