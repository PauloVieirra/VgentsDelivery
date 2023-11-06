import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { useCart } from '../../Context/CartContext';
import { userData, form, identidade } from '../../Components/localStorageComponent';
import localforage from 'localforage';
import firebase from '../../config/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import FormularioComplemento from '../../Components/Formcomplit/Index';
import FormularioComplementoLogista from '../../Components/FormcomplitLogista/Index';
import { v4 as uuidv4 } from 'uuid';
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
  const [isAddressButtonVisible, setIsAddressButtonVisible] = useState(true);
  const [isUserForm, setIsUserForm] = useState('');
  const { cartItems, getTotalPrice, clearCart } = useCart();
  

  const isFormSented = (form  || null );
  const idStore = (identidade);
  const saveUserType = localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).tipo;
  

  const handleUseAddressClick = () => {
    setSelectedAddress(lastAddressData);
    setIsAddressButtonVisible(false);
  };

  useEffect(() => {
    if (isFormSented === true) {
      setTimeout(() => {
        navigate('/ConfirmationPage');
      }, 3000);
    } else {
      return;
    }
  }, [state, isFormSented, navigate]);

  useEffect(() => {
    if (user) {
      setIsFormSubmitted( isFormSented );
      
    }
  }, [state]);

  useEffect(() => {
    const savedIsFormSubmitted = localStorage.getItem('isFormSubmitted');
    setIsFormSubmitted(savedIsFormSubmitted === 'true');

    const userUid = user.uid;
   
    if (userUid) {
      const userRef = firebase.database().ref(`users/${userUid}`);
      userRef.child('complemento').once('value', (snapshot) => {
        const data = snapshot.val();
        setLastAddressData(data);


        if (data && data.formulario) {
          setIsFormSubmitted(true);
          localStorage.setItem('isFormSubmitted', 'true');
        }
      });
    }
  }, [user]);

  if (!cartItems) {
    return <div>Nenhum dado de carrinho encontrado.</div>;
  }

  const saveOrderToFirebase = async () => {
    setIsSending(true);
    const db = firebase.database();
    const ordersRef = db.ref('orders');
  
    const userUid = user.uid;
  
    if (!userUid) {
      console.error('Usuário não logado');
      setIsSending(false);
      return;
    }
  
    try {
      const logistaOrdersMap = {};
  
      cartItems.forEach((item) => {
        const { isUrl, id, quantity, price, title } = item;
  
        if (!logistaOrdersMap[isUrl]) {
          logistaOrdersMap[isUrl] = {};
        }
  
        const orderId = uuidv4().substr(0, 4);
  
        if (!logistaOrdersMap[isUrl][orderId]) {
          logistaOrdersMap[isUrl][orderId] = {
            selectedAddress: selectedAddress,
            products: [],
          };
        }
  
        logistaOrdersMap[isUrl][orderId].products.push({ id, quantity, price, title });
  
        const userOrderHistoryRef = db.ref(`users/${userUid}/orderhistory`);
        userOrderHistoryRef.child(isUrl).push().set(orderId);
        clearCart();
      });
  
      const promises = Object.keys(logistaOrdersMap).map(async (isUrl) => {
        const logistaOrderRef = ordersRef.child(isUrl);
        return logistaOrderRef.update(logistaOrdersMap[isUrl]);
      });
  
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
  

  

  const handleAddressChange = (newAddressData) => {
    setSelectedAddress(newAddressData);
    setLastAddressData(newAddressData);
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
                Quantidade: {item.quantity} - {item.title} - Valor: R$ {item.price}
              </li>
            ))}
             {getTotalPrice().toFixed(2)}
          </ul>
          {isFormSubmitted === false && lastAddressData && (
            <div>
              <h3>Endereço de Complemento:</h3> 
              <p>Cidade: {lastAddressData.cidade}</p>
              <p>Bairro: {lastAddressData.bairro}</p>
              <p>Bairro: {lastAddressData.rua}</p>
              <p>Endereço: {lastAddressData.numero}</p>
              <p>Endereço: {lastAddressData.telefoneContato}</p>
             
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
              {isAddressButtonVisible && (
                <button onClick={handleUseAddressClick}>Usar este Endereço</button>
              )}
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

  
      {lastAddressData && isAddressButtonVisible === false && (
            <button onClick={saveOrderToFirebase} disabled={isSending}>
              {isSending ? 'Enviando...' : 'Confirmar Pedido '}
            </button>
          )}
        </div>
      )}

    
       <div>
        {saveUserType === 'cliente' && isFormSented === false && (
          <FormularioComplemento onSubmit={handleAddressChange} />
        )}

        {saveUserType === 'logista' &&  isFormSented === false && (
          <FormularioComplementoLogista onSubmit={handleAddressChange} />
        )}
      </div>

      <div></div>
    </div>
  );
};

export default ConfirmationPage;