import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { isValidEmail, isValidPassword, isValidName, showErrorAlert } from '../../Components/Helpers';

const SignUp = () => {
  const { signUpWithEmailAndPassword } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

    const tipo = 'cliente'; // Substitua 'cliente' pelo valor do tipo de usuário desejado
    const formulario = false;

    try {
      await signUpWithEmailAndPassword(email, password, name, tipo, formulario);
      navigate('/UpdateProfileForm');
    } catch (error) {
      if (error.code === 'auth/weak-password') {
        showErrorAlert('Senha fraca. A senha deve conter pelo menos 6 caracteres com letras e números.');
      } else if (error.code === 'auth/email-already-in-use') {
        showErrorAlert('O email informado já está em uso por outra conta. Por favor, use outro email.');
      } else {
        showErrorAlert('Erro no cadastro. Por favor, tente novamente mais tarde.');
      }
      console.error('Erro no cadastro:', error);
    }
  };


return (
  <div>
    <h2>Tela de Cadastro</h2>
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
    <p>Já tem uma conta? <Link to="/">Faça o login aqui</Link></p>
  </div>
);
};

export default SignUp;





