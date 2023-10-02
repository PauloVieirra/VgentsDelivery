import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import './style.css';

const SignIn = () => {
  const { signInWithEmailAndPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Novo estado para armazenar o valor do 'formulario'
  const [userFormulario, setUserFormulario] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    // Recupere o valor do 'formulario' do 'userData' do localStorage
    const savedUserFormulario =
      localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).formulario;
    setUserFormulario(savedUserFormulario || '');
  }, []); // Executa apenas uma vez quando o componente é montado

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const signInResult = await signInWithEmailAndPassword(email, password, []);

      // Verifica se o tipo de usuário é "cliente" ou "logista"
      const userType = localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).tipo;
      const userForm = localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).formulario;
      console.log(userForm);

      if (userType === 'cliente' && userForm === false) {
        navigate('/ConfirmationPage', { state: { cartItems: [] } });
      } else if (userType === 'cliente' && userForm === true) {
        navigate('/', { state: { cartItems: [] } });
      } else if (userType === 'logista' && userForm === false) {
        navigate('/ConfirmationPage');  
      } else if (userType === 'logista' && userForm === true) {
        navigate('/');
      } else {
        console.error('Tipo de usuário não reconhecido:', userType);
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
    <div className='containerlogin'>
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
