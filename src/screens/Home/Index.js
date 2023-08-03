import React from 'react';
import LogoutButton from '../../Components/Logout';
import './style.css';
import { useAuth } from '../../Context/AuthContext';

const Home = () => {
  const { user } = useAuth();
  console.log(user.nome);
  return (
    <div className='container'>
      <h2>Bem-vindo à página Home</h2>
      {user ? (
        <p>Usuário logado: {user.email}</p>
      ) : (
        <p>Usuário não está logado</p>
      )}


      <LogoutButton/>





    </div>
  );
};

export default Home;
