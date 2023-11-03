import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

export default function MeusPedidos() {
  const location = useLocation();
  const { getUserOrders, userOrders, user } = useAuth();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.pathname === '/meus-pedidos') {
      // Verifique se o usuário está logado antes de buscar os pedidos
      if (user) {
        getUserOrders(user.uid)
          .then(() => {
            setLoading(false);
          })
          .catch((error) => {
            console.error('Erro ao buscar pedidos do usuário:', error);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    }
  }, [location.pathname, user, getUserOrders]);

  return (
    <div className='clienthome'>
      {loading ? (
        <p>Carregando pedidos...</p>
      ) : userOrders.length > 0 ? (
        <div>
          <h2>Meus Pedidos</h2>
          <ul>
            {userOrders.map((order) => (
              <li key={order.orderId}>
                {/* Renderize os detalhes do pedido, por exemplo: */}
                <p>ID do Pedido: {order.orderId}</p>
                <p>Data do Pedido: {order.orderDate}</p>
                {/* Adicione mais informações do pedido conforme necessário */}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Você não possui pedidos ainda.</p>
      )}
    </div>
  );
}
