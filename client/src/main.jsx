import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
// import customFetch from './utils/customFetch.js';

// const response = await customFetch.get('/test');
// console.log(response);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <ToastContainer postion="top-center"></ToastContainer>
  </React.StrictMode>
);
