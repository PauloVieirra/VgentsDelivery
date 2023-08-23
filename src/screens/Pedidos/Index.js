import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import firebase from '../../config/firebaseConfig'; // Import your Firebase config

import './style.css';

export default function Pedidos() {
  const { user, userType, userOrders, fetchUserOrders } = useAuth();
  const db = firebase.database(); // Get the Firebase database instance

  useEffect(() => {
    if (user) {
      fetchUserOrders(user.uid);
    }
  }, [user, fetchUserOrders]);

  const [orderStatuses, setOrderStatuses] = useState({}); // State to store order statuses

  function handleStatusChange(logistaUid, orderId, newStatus) {
    updateOrderStatus(logistaUid, orderId, newStatus);
    setOrderStatuses(prevStatuses => ({
      ...prevStatuses,
      [orderId]: newStatus
    }));
  }

  function updateOrderStatus(logistaUid, orderId, newStatus) {
    if (userType === 'logista' && logistaUid && orderId && newStatus) {
      db.ref(`stores/${logistaUid}/orders/${orderId}/status`)
        .set(newStatus)
        .then(() => {
          console.log('Order status updated successfully.');
        })
        .catch((error) => {
          console.error('Error updating order status:', error);
        });
    }
  }
  return (
    <div className='contpedidos'>
      <div className='contleftpedido'>
        <div className='contdashpedido'>
          orderId
        </div>
      </div>

      <div className='contrightpedido'>
        <div className='contcentralpedid'>
          {userOrders.map((order) => (
            <div className='cardpedido' key={order.orderId}>
              <div>
                {/* Render the order image here */}
              </div>
              <div className='contmincards'>
                {order.products && order.products.length > 0 ? (
                  order.products.map((product) => (
                    <div className='mincard' key={product.id}>
                      <div>
                        <p>{product.title}</p>
                        <p>Quantidade: {product.quantity}</p>
                      </div>
                      <p>Valor: {product.totalPrice}</p>
                      <p>Chave do Pedido: {user.uid}</p>
                      <p>Chave do Pedido: {product.orderId}</p>
                    </div>
                  ))
                ) : (
                  <p>No products to display.</p>
                )}

                {order.totalPrice !== undefined && (
                  <p>Total: R$ {order.totalPrice.toFixed(2)}</p>
                )}
              </div>
              <div className='contcomplementar'>
                <h4 className='texttitlepedidos'>Endereço</h4>
                {order.selectedAddress && (
                  <div className='textspedidos'>
                    <p>Endereço: {order.selectedAddress.enderecoEntrega}</p>
                    <p>Cidade: {order.selectedAddress.cidade}</p>
                    <p>Bairro: {order.selectedAddress.bairro}</p>
                    <h4 className='texttitlepedidos'>Observação</h4>
                  </div>
                )}
              </div>
              <div>
                {/* Render the logista ID and order identifier key */}
                <p>ID do Logista: {order.logistaUid}</p>
      <p>Chave do Pedido: {order.orderId}</p>
      <button
              onClick={() => handleStatusChange(order.logistaUid, order.orderId, 'aceito')}
              style={{ backgroundColor: orderStatuses[order.orderId] === 'aceito' ? 'green' : 'white' }}
            >
              Aceito
            </button>
            <button
              onClick={() => handleStatusChange(order.logistaUid, order.orderId, 'preparando')}
              style={{ backgroundColor: orderStatuses[order.orderId] === 'preparando' ? 'yellow' : 'white' }}
              disabled={orderStatuses[order.orderId] !== 'aceito'}
            >
              Preparando
            </button>
            <button
              onClick={() => handleStatusChange(order.logistaUid, order.orderId, 'saiu_para_entrega')}
              style={{ backgroundColor: orderStatuses[order.orderId] === 'saiu_para_entrega' ? 'orange' : 'white' }}
              disabled={orderStatuses[order.orderId] !== 'preparando'}
            >
              Saiu para Entrega
            </button>
            <button
              onClick={() => handleStatusChange(order.logistaUid, order.orderId, 'finalizado')}
              style={{ backgroundColor: orderStatuses[order.orderId] === 'finalizado' ? 'blue' : 'white' }}
              disabled={orderStatuses[order.orderId] !== 'saiu_para_entrega'}
            >
              Finalizado
            </button>
          </div>
        </div>
      ))}
        </div>
      </div>
    </div>
  );
}
