import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth.js';
import 'antd/dist/reset.css';
import { SearchProvider } from './context/search.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <SearchProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
    </SearchProvider>
  </BrowserRouter>
);



reportWebVitals();
