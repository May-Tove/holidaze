import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';
import { HashRouter } from 'react-router-dom';
import LoginProvider from './context/LoginProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <HashRouter>
        <LoginProvider>
          <App />
        </LoginProvider>
      </HashRouter>
    </HelmetProvider>
  </React.StrictMode>
);
