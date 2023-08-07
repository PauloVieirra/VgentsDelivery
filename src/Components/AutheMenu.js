import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const AuthenticatedMenu = ({ userType }) => {
  return (
    <div className='contmenu'>
      <ul>
        {userType === 'adm' && (
          <> 
            <li>
            <Link to="/">Início</Link>
            </li>
            <li>
              <Link to="/Products">Produto</Link>
            </li>
            <li>
              <Link to="/Store">Loja</Link>
            </li>
            <li>
              <Link to="/Cadastroloja">Cadastro</Link>
            </li>
            <li>
              <Link to="/Dashboard">Dashboard</Link>
            </li>
            
          </>
        )}
        {userType === 'logista' && (
          <>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/Products">Produtos</Link>
            </li>
            <li>
              <Link to="/Pedidos">Pedidos</Link>
            </li>
          </>
        )}
        {userType === 'cliente' && (
          <>
          <li>
          <Link to="/">Inicio</Link>
          </li>
          <li>
          <Link to="/ClienteHome">Historico</Link>
          </li>
          </>
        )}
        {!userType && (
          <>
            <li>
              <Link to="/SignIn">Entrar</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default AuthenticatedMenu;
