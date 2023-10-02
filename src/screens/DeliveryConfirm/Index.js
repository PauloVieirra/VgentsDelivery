import React, { useState, useEffect, useId } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
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

  const isFormSented = localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).formulario;
  const saveUserType = localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).tipo;

  
 
  const handleUseAddressClick = () => {
    setSelectedAddress(lastAddressData);
    setIsAddressButtonVisible(false);
  };

   useEffect(() => {
    if (isFormSented === true) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }else{
      return;
    }
  }, [state, isFormSented, navigate]);
  
  //Continuar onfigurando o complemento do formulario do logista
  useEffect(() => {
    if (state && state.cartItems) {
      setIsFormSubmitted(state.formulario || false);
    }
  }, [state]);




  useEffect(() => {
    const savedIsFormSubmitted = localStorage.getItem('isFormSubmitted');
    setIsFormSubmitted(savedIsFormSubmitted === 'true');

    const userUid = user?.uid;
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

  if (!state || !state.cartItems) {
    return <div>Nenhum dado de carrinho encontrado.</div>;
  }

  const { cartItems, tipo } = state;

  const saveOrderToFirebase = async () => {
    setIsSending(true);
    const db = firebase.database();
    const ordersRef = db.ref('orders');
    
    const userUid = user?.uid; // Use optional chaining to avoid errors if user is not available
    
    if (!userUid) {
      console.error('Usuário não logado');
      setIsSending(false);
      return;
    }
  
    try {
      const orderId = uuidv4().substr(0, 4); // Generate a unique 4-digit code for the order
  
      const logistaOrdersMap = {};
  
      cartItems.forEach((item) => {
        const { logistaUid, id, quantity, totalPrice, title } = item;
  
        if (!logistaOrdersMap[logistaUid]) {
          logistaOrdersMap[logistaUid] = {};
        }
  
        if (!logistaOrdersMap[logistaUid][orderId]) {
          logistaOrdersMap[logistaUid][orderId] = {
            selectedAddress: selectedAddress,
            products: [],
          };
        }
  
        logistaOrdersMap[logistaUid][orderId].products.push({ id, quantity, totalPrice, title });
      });
  
      const promises = Object.keys(logistaOrdersMap).map(async (logistaUid) => {
        const logistaOrderRef = ordersRef.child(logistaUid);
  
        return logistaOrderRef.update(logistaOrdersMap[logistaUid]);
      });
  
      await Promise.all(promises);
      setIsSending(false);
      setIsSent(true);
      setIsFormSubmitted(true);
  
      setTimeout(() => {
        navigate('/');
      }, 3000); // Redirecionar após 3 segundos
    } catch (error) {
      console.error('Erro ao gravar pedidos:', error);
      setIsSending(false);
    }
  };
  
  const handleAddressChange = (newAddressData) => {
    setSelectedAddress(newAddressData); // Atualize o estado com os novos dados de endereço
    setLastAddressData(newAddressData); // Atualize os últimos dados de endereço exibidos
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
            Quantidade: { item.quantity} - {item.title} - Valor: R$ {item.totalPrice.toFixed(2)}
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

  
        {  lastAddressData  &&
          <button onClick={saveOrderToFirebase} disabled={isSending}>
            {isSending ? 'Enviando...' : 'Confirmar Pedido '}
          </button>
        }


        </div>
      )}

    
          <div>
            
            {saveUserType === 'cliente' && isFormSubmitted === false && ( 
            <FormularioComplemento onSubmit={handleAddressChange} />
            )}

             {saveUserType === 'logista' && ( 
            <FormularioComplementoLogista onSubmit={handleAddressChange} />
            )}
            </div>
        
         <div>
    </div>
    </div>
  );
};

export default ConfirmationPage;