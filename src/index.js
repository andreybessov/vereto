import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
<<<<<<< Updated upstream
import './css/main.min.css'
=======
import '../src/css/main.min.css'
>>>>>>> Stashed changes

const app = ReactDOM.createRoot(document.getElementById('app'));
app.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);