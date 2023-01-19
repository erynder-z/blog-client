import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ActiveTagContextProvider } from './contexts/ActiveTagContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ActiveTagContextProvider>
        <App />
      </ActiveTagContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
