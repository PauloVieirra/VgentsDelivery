import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const AuthenticatedMenu = () => {
  return (
    <div className='contmenu'>
    <nav>
      <ul>
        <li>
          <Link to="/">Início</Link>
        </li>
        <li>
          <Link to="/products">Produtos</Link>
        </li>
        <li>
          <Link to="/pedidos">Pedidos</Link>
        </li>
        <li>
          <Link to="/conta">Conta</Link>
        </li>
        <li>
          <Link to="/suporte">Suporte</Link>
        </li>
      </ul>
    </nav>
    </div>
  );
};

export default AuthenticatedMenu;
