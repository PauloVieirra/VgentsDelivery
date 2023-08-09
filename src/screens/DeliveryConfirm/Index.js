import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import firebase from '../../config/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import FormularioComplemento from '../../Components/Formcomplit/Index';
import './styles.css';

const ConfirmationPage = () => {
  const location = useLocation();
  const { state } = location;
  const { user, saveFormToFirebase } = useAuth();
  const navigate = useNavigate();
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(null);
  const [lastAddressData, setLastAddressData] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  console.log(selectedAddress);
  useEffect(() => {
    if (state && state.cartItems) {
      setIsFormSubmitted(state.formulario || false);
    }
  }, [state]);

  useEffect(() => {
    const savedIsFormSubmitted = localStorage.getItem('isFormSubmitted');
    setIsFormSubmitted(savedIsFormSubmitted === 'true');

    const userUid = user?.uid; // Use optional chaining to avoid errors if user is not available
    if (userUid) {
      const userRef = firebase.database().ref(`users/${userUid}`);
      userRef.child('complemento').once('value', (snapshot) => {
        const data = snapshot.val();
        setLastAddressData(data);

        if (data && data.formulario) {
          setIsFormSubmitted(true); // Set isFormSubmitted to true if complemento.formulario is true
          localStorage.setItem('isFormSubmitted', 'true');
        }
      });
    }
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
          selectedAddress: selectedAddress, // Include selected address here
        };
      }
  
      logistaOrdersMap[logistaUid].products.push({ id, quantity, totalPrice });
    });
  
    const promises = Object.values(logistaOrdersMap).map(async (logistaOrder) => {
      const newLogistaOrderRef = ordersRef.child(logistaOrder.logistaId).push();
  
      return newLogistaOrderRef.set(logistaOrder);
    });
  
    try {
      await Promise.all(promises);
      setIsSending(false);
      setIsSent(true);
      setIsFormSubmitted(true); // Set isFormSubmitted to true after successful order submission
  
      setTimeout(() => {
        navigate('/');
      }, 3000); // Redirecionar após 3 segundos
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
          {isFormSubmitted === false && lastAddressData && (
            <div>
              <h3>Endereço de Complemento:</h3>
              <p>Endereço: {lastAddressData.enderecoEntrega}</p>
              <p>Cidade: {lastAddressData.cidade}</p>
              <p>Bairro: {lastAddressData.bairro}</p>
              {/* Add more fields as needed */}
              
              <h3>Selecione o Endereço:</h3>
              {Object.keys(user?.complemento || {}).map((key) => (
                <div key={key} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button onClick={() => setSelectedAddress(user.complemento[key])}>Escolher Endereço</button>
                    <label style={{ marginLeft: '10px' }}>
                      {user.complemento[key].enderecoEntrega}, {user.complemento[key].cidade}, {user.complemento[key].bairro}
                    </label>
                  </div>
                </div>
              ))}
              
              {/* Botão ou div para selecionar o endereço */}
              <button onClick={() => setSelectedAddress(lastAddressData)}>Usar este Endereço</button>
              
              <button onClick={saveOrderToFirebase} disabled={isSending}>
                {isSending ? 'Enviando...' : 'Confirmar Pedido'}
              </button>
            </div>
          )}


          {isFormSubmitted === true && lastAddressData && (
            <div>
              <h3>Endereço de Complemento:</h3>
              <p>Endereço: {lastAddressData.enderecoEntrega}</p>
              <p>Cidade: {lastAddressData.cidade}</p>
              <p>Bairro: {lastAddressData.bairro}</p>
              {/* Add more fields as needed */}
              
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
