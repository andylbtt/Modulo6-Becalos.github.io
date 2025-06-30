import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Puedes colocar estilos globales o importar solo el del componente desde App

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);