import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';
import firebase from '../../config/firebaseConfig';
import './style.css';

const Pedidos = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextStatus, setNextStatus] = useState('');
  const { user } = useAuth();
  console.log(userOrders);


  const updateOrderStatus = async (orderId, newStatus) => {
  setNextStatus(newStatus);
  try {
    const userUid = user.uid;
    const orderRef = firebase.database().ref(`orders/${userUid}/${orderId}`);
    await orderRef.update({ status: newStatus });
  } catch (error) {
    console.error('Erro ao atualizar o status do pedido:', error);
  }
};

  

 // ... Seu código existente ...

useEffect(() => {
  const fetchUserOrders = () => {
    try {
      if (user) {
        const userUid = user.uid;
        const userOrderHistoryRef = firebase.database().ref(`orders/${userUid}`);

        // Usando 'on' para ouvir as alterações em tempo real
        userOrderHistoryRef.on('value', (snapshot) => {
          if (snapshot.exists()) {
            const orderIds = Object.keys(snapshot.val());
            const userOrdersArray = [];

            for (const orderId of orderIds) {
              const orderDetailsSnapshot = snapshot.child(orderId);
              const orderDetails = orderDetailsSnapshot.val();
              userOrdersArray.push(orderDetails);
            }

            setUserOrders(userOrdersArray);
          } else {
            setUserOrders([]);
          }
        });

       
      }
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchUserOrders();
}, [user]);

// ... Restante do seu código ...


  return (
    <div className="meus-pedidos-container">
      <h2>Meus Pedidos</h2>
      {loading ? (
        <p>Carregando...</p>
      ) : userOrders.length > 0 ? (
        <div className="cards-container">
{userOrders.map((order, index) => (
  <div key={index} className="cardty">
    <div className='line'>
      <div> </div>

      {order.products && order.products.map((product, productIndex) => (
        <>
        <div key={productIndex}>
          <div>{product.orderId}</div>
          <strong>Produto:</strong> {product.title}<br />
          <strong>Quantidade:</strong> {product.quantity}<br />
          <strong>Preço:</strong> R$ {product.price}
        </div>

          <div>
          {order.selectedAddress.cidade} {order.selectedAddress.bairro} {order.selectedAddress.rua} {order.selectedAddress.numero} {order.selectedAddress.telefoneContato}
          </div>
          </>
      ))}
    </div>

  

    <div>
      {order.products && order.products.map((product, productIndex) => (
        <React.Fragment key={productIndex}>
          <button onClick={() => updateOrderStatus(product.orderId, 'Pedido aceito')}>Aceitar</button>
          <button onClick={() => updateOrderStatus(product.orderId, 'Em Preparação')}>Em Preparação</button>
          <button onClick={() => updateOrderStatus(product.orderId, 'Pronto para Entrega')}>Pronto para Entrega</button>
          <button onClick={() => updateOrderStatus(product.orderId, 'Em Entrega')}>Em Entrega</button>
        </React.Fragment>
      ))}
    </div>
  </div>
))}

        </div>
      ) : (
        <p>Você não possui pedidos ainda.</p>
      )}
    </div>
  );
};

export default Pedidos;
