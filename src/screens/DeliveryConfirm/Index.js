import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import firebase from '../../config/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const ConfirmationPage = () => {
  const location = useLocation();
  const { state } = location;
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(null);
  console.log(isFormSubmitted);
  useEffect(() => {
    if (state && state.cartItems) {
      setIsFormSubmitted(state.formulario || false); // Set isFormSubmitted with the value from state.formulario
    }
  }, [state]);

  if (!state || !state.cartItems) {
    return <div>Nenhum dado de carrinho encontrado.</div>;
  }
   //use o valor desse fomulario para definir o state
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

      logistaOrdersMap[logistaUid].products.push({ id, quantity, totalPrice });
    });

    const promises = Object.values(logistaOrdersMap).map(async (logistaOrder) => {
      const newLogistaOrderRef = ordersRef.child(logistaOrder.logistaId).push();

      await newLogistaOrderRef.set(logistaOrder);
    });

    try {
      await Promise.all(promises);
      // Limpar o carrinho após gravar os pedidos
      localStorage.removeItem('cartItems');

      setIsSending(false);
      setIsSent(true);

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
          <button onClick={saveOrderToFirebase} disabled={isSending}>
            {isSending ? 'Enviando...' : 'Confirmar Pedido'}
          </button>
        </div>
      )}
      {isFormSubmitted === false && (
        <div>Formulário</div>
      )}
    </div>
  );
};

export default ConfirmationPage;
