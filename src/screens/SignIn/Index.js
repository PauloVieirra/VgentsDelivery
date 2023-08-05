import React, { useState, useEffect } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const SignIn = () => {
  const { signInWithEmailAndPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

 
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(email, password);
      if (user) {
        navigate('/');
      } else {
        console.error('Credenciais inválidas: usuário não encontrado.');
      }
    } catch (error) {
      console.error('Erro no login:', error.message);
    } 
  
  };

  return (
    <div>
      <h2>Tela de Login</h2>
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
      <p>
        Ainda não tem uma conta? <Link to="/SignUp">Cadastre-se aqui</Link>
      </p>
    </div>
  );
};

export default SignIn;
