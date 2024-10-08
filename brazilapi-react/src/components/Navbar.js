import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Catálogo de Corretoras</Link>
        </li>
        <li>
          <Link to="/cep">Buscar CEP</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
