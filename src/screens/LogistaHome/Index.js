import React, { useState } from 'react';
import './style.css';
import { useAuth } from '../../Context/AuthContext';
import LogoutButton from '../../Components/Logout';
import SettingsSite from '../../Components/WebbConfig/Index';

const Module1Content = () => (
  <div>
    {/* Conteúdo do Módulo 1 */}
    <p>Conteúdo do Módulo 1</p>
  </div>
);

const Module2Content = () => (
  <div>
    <SettingsSite/>
  </div>
);

const Module3Content = () => (
  <div>
    {/* Conteúdo do Módulo 3 */}
    <p>Conteúdo do Módulo 3</p>
  </div>
);

const Module4Content = () => (
  <div>
    {/* Conteúdo do Módulo 4 */}
    <p>Conteúdo do Módulo 4</p>
  </div>
);

export default function LogistaHome() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(1);

  const renderModuleContent = () => {
    switch (activeTab) {
      case 1:
        return <Module1Content />;
      case 2:
        return <Module2Content />;
      case 3:
        return <Module3Content />;
      case 4:
        return <Module4Content />;
      default:
        return null;
    }
  };

  return (
    <div className='contlogista'>
      <div className='logista-info'>
        {/* Módulo de informações da empresa */}
        <h2>{user.email}</h2>
        {/* Adicione dados da empresa aqui */}
        <LogoutButton />
      </div>
      <div className='logista-modules-center'>
      <div className='logista-modules'>
        <div
          className={`logista-module ${activeTab === 1 ? 'active' : ''}`}
          onClick={() => setActiveTab(1)}
        >
          {/* Módulo 1 */}
          <h3>Status</h3>
        </div>
        <div
          className={`logista-module ${activeTab === 2 ? 'active' : ''}`}
          onClick={() => setActiveTab(2)}
        >
          {/* Módulo 2 */}
          <h3>Configurar Site</h3>
        </div>
        <div
          className={`logista-module ${activeTab === 3 ? 'active' : ''}`}
          onClick={() => setActiveTab(3)}
        >
          {/* Módulo 3 */}
          <h3>Clientes</h3>
        </div>
        <div
          className={`logista-module ${activeTab === 4 ? 'active' : ''}`}
          onClick={() => setActiveTab(4)}
        >
          {/* Módulo 4 */}
          <h3>Suporte</h3>
        </div>
        {/* Adicione mais módulos conforme necessário */}
      </div>

      <div className='logista-content'>
        {/* Renderize o conteúdo do módulo ativo */}
        {renderModuleContent()}
      </div>
      </div>
     
    </div>
  );
}
