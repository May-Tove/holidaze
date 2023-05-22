import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import LoginProvider from './context/LoginProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <LoginProvider>
          <App />
        </LoginProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
