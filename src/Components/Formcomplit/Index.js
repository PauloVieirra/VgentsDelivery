import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import './style.css';
import { isValidEmail, isValidPassword, isValidName, showErrorAlert } from '../../Components/Helpers';

const UpdateProfileForm = ({ isModalOpen, closeModal }) => {

  const { user, signUpWithEmailAndPassword } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formulario, setFormulario] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the form was already submitted and set the state accordingly
    const isFormSubmitted = JSON.parse(localStorage.getItem('isFormSubmitted'));
    setFormulario(isFormSubmitted);
  }, []);

  useEffect(() => {
    // Check if the user type is 'cliente' and if the form has not been submitted
    if (user && user.ROLE && user.ROLE.tipo === 'cliente' && !formulario && isModalOpen) {
      // Open the modal automatically if the user is 'cliente' and formulario is false
      // and isModalOpen is true
     
    } else {
      // Redirect to a different page or show an error message for non-'cliente' users.
      navigate('/not-allowed'); // Replace '/not-allowed' with the desired path or display an error message.
    }
  }, [user, formulario, isModalOpen, navigate]);

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

    // Additional validations for address and phoneNumber can be added here.

    const tipo = 'cliente';

    try {
      await signUpWithEmailAndPassword(email, password, name, tipo, formulario, address, phoneNumber);

      // If the form was submitted successfully, set the flag to true in localStorage
      localStorage.setItem('isFormSubmitted', JSON.stringify(true));
      setFormulario(true);

      closeModal();
      navigate('/');
     
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

  // If the user is not 'cliente', don't display the form
  if (!user || (user && user.ROLE && user.ROLE.tipo !== 'cliente')) {
    return (
      <div className="food-sales-container">
        <h2>Ops! Apenas clientes podem acessar esta página.</h2>
        {/* You can provide a link to redirect them to the appropriate page or display an error message. */}
        <p>Ir para a <Link to="/">página inicial</Link></p>
      </div>
    );
  }

  return (
    <div className="food-sales-container">
      <h2>Atualizar Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="address">Endereço:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="phoneNumber">Telefone:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <button type="submit">Atualizar Cadastro</button>
      </form>
      <p>Já tem uma conta? <Link to="/">Faça o login aqui</Link></p>
    </div>
  );
};

export default UpdateProfileForm;
