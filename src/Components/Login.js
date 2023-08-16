import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styleLogin.css';



const LoginButton = () => {

  const navigate = useNavigate();

  const handleLogout = async () => {
      navigate('SignIn');
  };

  return (
    <button className='contbtnlogin' onClick={handleLogout}>Login</button>
  );
};

export default LoginButton;

