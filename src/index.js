import React from 'react';
import { createRoot } from 'react-dom/client'; // Importa createRoot en lugar de ReactDOM
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Obtén el elemento raíz en el DOM
const container = document.getElementById('root');

// Usa createRoot para crear el root en React 18
const root = createRoot(container);

// Renderiza la aplicación
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Para medir el rendimiento de la app (opcional)
reportWebVitals();
