import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/Inicio.css';
import './styles/Tarjetas.css';
import './styles/Loader.css';
import './styles/Pagination.css';
import './styles/Pokedex.css';
import Path from './routes/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Path/>
    </BrowserRouter>
  </React.StrictMode>
  
);
