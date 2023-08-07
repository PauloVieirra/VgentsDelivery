import React from 'react';
import LogoutButton from '../../Components/Logout';
import './style.css';
import { useAuth } from '../../Context/AuthContext';
import AppLayout from '../../Components/AppLayoutMenu';

const Home = () => {
  const { user } = useAuth();
   
  return (
   
    <div className='container'>
      <div className='teste'/> 

      <p >Usuário logado: {user.tipo}</p>
      <h2>Bem-vindo à página Home</h2>
      {user ? (
        <p >Usuário logado: {user.email}</p>
      ) : (
        <p>Usuário não está logado</p>
      )}


      <LogoutButton/>

      



     </div>
  
  );
};

export default Home;
