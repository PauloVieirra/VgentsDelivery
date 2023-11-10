import React from 'react';
import './style.css';
import { useAuth } from '../../Context/AuthContext';
import LogoutButton from '../../Components/Logout';

export default function LogistaHome() {
  const {user} = useAuth();
  return (
    <div className='contlogista'>
      <div className='logista-info'>
        {/* Módulo de informações da empresa */}
        <h2>{user.email}</h2>
        {/* Adicione dados da empresa aqui */}
      </div>
      <div className='logista-modules'>
        <div className='logista-module'>
          {/* Módulo 1 */}
          <h3>Módulo 1</h3>
          {/* Conteúdo do Módulo 1 */}
        </div>
        <div className='logista-module'>
          {/* Módulo 2 */}
          <h3>Módulo 2</h3>
          {/* Conteúdo do Módulo 2 */}
        </div>
        <div className='logista-module'>
          {/* Módulo 3 */}
          <h3>Módulo 3</h3>
          {/* Conteúdo do Módulo 3 */}
        </div>
        <div className='logista-module'>
          {/* Módulo 4 */}
          <h3>Módulo 4</h3>
          {/* Conteúdo do Módulo 4 */}
        </div>
        {/* Adicione mais módulos conforme necessário */}
      </div>
      <LogoutButton/>
    </div>
  );
}
