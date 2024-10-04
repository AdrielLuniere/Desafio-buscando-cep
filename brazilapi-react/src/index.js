import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';  // Importa o componente App

// Renderiza o componente App no elemento com o ID 'root'
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
