import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import firebase from '../../config/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import FormularioComplemento from '../../Components/Formcomplit/Index';
import './style.css';

const ConfirmationPage = () => {
  const location = useLocation();
  const { state } = location;
  const { user, saveFormToFirebase } = useAuth();
  const navigate = useNavigate();
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(null);
  const [lastAddressData, setLastAddressData] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null); // Added state to hold selected address

  useEffect(() => {
    if (state && state.cartItems) {
      setIsFormSubmitted(state.formulario || false);
    }
  }, [state]);

  useEffect(() => {
    const savedIsFormSubmitted = localStorage.getItem('isFormSubmitted');
    setIsFormSubmitted(savedIsFormSubmitted === 'true');

    const userUid = user.uid;
    const userRef = firebase.database().ref(`users/${userUid}`);
    userRef.child('complemento').once('value', (snapshot) => {
      const data = snapshot.val();
      setLastAddressData(data);

      if (data && data.formulario) {
        localStorage.setItem('isFormSubmitted', 'true');
      }
    });
  }, [user]);

  if (!state || !state.cartItems) {
    return <div>Nenhum dado de carrinho encontrado.</div>;
  }

  const { cartItems, tipo } = state;

  const saveOrderToFirebase = async () => {
    setIsSending(true);
    const db = firebase.database();
    const ordersRef = db.ref('orders');

    const logistaOrdersMap = {};

    cartItems.forEach((item) => {
      const { logistaUid, id, quantity, totalPrice } = item;

      if (!logistaOrdersMap[logistaUid]) {
        logistaOrdersMap[logistaUid] = {
          logistaId: logistaUid,
          products: [],
          timestamp: firebase.database.ServerValue.TIMESTAMP,
        };
      }

      // Include selectedAddress in the order
      logistaOrdersMap[logistaUid].products.push({ id, quantity, totalPrice, selectedAddress });
    });

    const promises = Object.values(logistaOrdersMap).map(async (logistaOrder) => {
      const newLogistaOrderRef = ordersRef.child(logistaOrder.logistaId).push();

      // Store the selectedAddress under the order's node
      return newLogistaOrderRef.set({ ...logistaOrder, selectedAddress });
    });

    try {
      await Promise.all(promises);
      setIsSending(false);
      setIsSent(true);
      setIsFormSubmitted(true);

      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Erro ao gravar pedidos:', error);
      setIsSending(false);
    }
  };

  return (
    <div className='containerconfirm'>
      {isSent ? (
        <div>
          <p>Pedido enviado, obrigado!</p>
          <p>Você será redirecionado para a página principal em breve...</p>
        </div>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.title} - Quantidade: {item.quantity} - Valor: R$ {item.totalPrice.toFixed(2)}
              </li>
            ))}
          </ul>
          {isFormSubmitted === false && lastAddressData && user.complemento && (
            <div>
              <h3>Endereço de Complemento:</h3>
              <p>Endereço: {lastAddressData.enderecoEntrega}</p>
              <p>Cidade: {lastAddressData.cidade}</p>
              <p>Bairro: {lastAddressData.bairro}</p>
              {/* Add more fields as needed */}

              <h3>Selecione o Endereço:</h3>
              {Object.keys(user.complemento).map((key) => (
                <div key={key}>
                  <input
                    type='radio'
                    id={key}
                    name='addressSelection'
                    value={key}
                    onChange={() => setSelectedAddress(user.complemento[key])}
                  />
                  <label htmlFor={key}>
                    {user.complemento[key].enderecoEntrega}, {user.complemento[key].cidade}, {user.complemento[key].bairro}
                  </label>
                </div>
              ))}
            </div>
          )}
          <button onClick={saveOrderToFirebase} disabled={isSending}>
            {isSending ? 'Enviando...' : 'Confirmar Pedido'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ConfirmationPage;
