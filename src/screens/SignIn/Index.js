import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import './style.css';

const SignIn = () => {
  const { signInWithEmailAndPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const signInResult = await signInWithEmailAndPassword(email, password, []);

      if (signInResult.redirectToConfirmation) {
        // Redirecionar para a página de confirmação
        navigate('/', { state: { cartItems: [] } });
      } else {
        const storedCartItems = localStorage.getItem('cartItems');
        const cartItems = JSON.parse(storedCartItems || '[]');

        navigate('/ConfirmationPage', { state: { cartItems } });
      }
    } catch (error) {
      console.error('Erro no login:', error.message);
    }
  };

  const handleSignUp = () => {
    const storedCartItems = localStorage.getItem('cartItems');
    const cartItems = JSON.parse(storedCartItems || '[]');
    console.log(cartItems);
    navigate('/SignUp', { state: { cartItems } });
  };

  return (
    <div className='container'>
      <div  className='divform'>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
     
        <button type="submit">Entrar</button>
          </form> 
          <div>
           <button onClick={handleSignUp}> Criar conta </button>
           </div>
        </div>
    </div>
  );
};

export default SignIn;
