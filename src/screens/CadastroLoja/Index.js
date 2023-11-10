import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { isValidEmail, isValidPassword, isValidName, showErrorAlert } from '../../Components/Helpers';
import CreateStore from '../../Components/MinScreens/StoresCreator';
import './style.css';

const Cadastroloja = () => {
  const { signUpStore } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidName(name)) {
      showErrorAlert('Nome inválido. O nome deve conter apenas letras e espaços.');
      return;
    }

    if (!isValidEmail(email)) {
      showErrorAlert('Email inválido. Por favor, insira um email válido.');
      return;
    }

    if (!isValidPassword(password)) {
      showErrorAlert('Senha inválida. A senha deve conter pelo menos 6 caracteres com letras e números.');
      return;
    }

    const tipo = 'logista'; 
    const formulario = false;

    try {
      const result = await signUpStore(email, password, name, tipo, formulario);

    if (result.redirectToConfirmation && formulario === false) {
      // Redirecionar para a página de confirmação
      navigate('/DeliveryConfLogista'); // Substitua 'pagina-de-confirmacao' pelo caminho correto
    } else {
      // Redirecionar para a página inicial
      navigate('/');
    }
      
    } catch (error) {
      if (error.code === 'auth/weak-password') {
        showErrorAlert('Senha fraca. A senha deve conter pelo menos 6 caracteres com letras e números.');
      } else if (error.code === 'auth/email-already-in-use') {
        showErrorAlert('O email informado já está em uso por outra conta. Por favor, use outro email.');
      } else {
        showErrorAlert('Loja cadastrada com sucesso.');
      }
      console.error('Erro no cadastro:', error);
    }
  };


return (
  <div className='contcadloja'>
   {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <button type="submit">Cadastrar</button>
        </form>
     
  </div>
);
};

export default Cadastroloja;





