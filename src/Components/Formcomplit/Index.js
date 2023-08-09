import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import firebase from '../../config/firebaseConfig';
import './style.css';
import { showErrorAlert } from '../../Components/Helpers';

const UpdateProfileForm = ({ isModalOpen, closeModal }) => {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formulario, setFormulario] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const isFormSubmitted = JSON.parse(localStorage.getItem('isFormSubmitted'));
    setFormulario(isFormSubmitted);
  }, []);

  useEffect(() => {
    if (user && user.ROLE && user.ROLE.tipo === 'cliente' && !formulario && isModalOpen) {
      // Open the modal automatically if the user is 'cliente' and formulario is false
      // and isModalOpen is true
      // ...
    } else {
      navigate('/not-allowed');
    }
  }, [user, formulario, isModalOpen, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Additional validations can be added here.

    // Update the user's data in Firebase
    const userRef = firebase.database().ref(`users/${user.uid}`);
    userRef.update({
      name,
      address,
      phoneNumber,
      formulario: true, // Set the formulario flag to true
    });

    // Set the flag to true in localStorage
    localStorage.setItem('isFormSubmitted', JSON.stringify(true));
    setFormulario(true);

    closeModal();
    navigate('/ConfirmationPage', { state: { cartItems: [] } });
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
