// Pedidos.js
import React, { useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';
import './style.css';

export default function Pedidos() {
  const { user, userType, userOrders, fetchUserOrders } = useAuth();

  useEffect(() => {
    if (user) {
      fetchUserOrders(user.uid, userType);
    }
  }, [user, userType, fetchUserOrders]);

  return (
    <div className='contpedidos'>
      <div className='contleftpedido'>
          <div className='contdashpedido'>
            12121
          </div>
      </div>
      <div className='contrightpedido'>
        <div className='contcentralpedid'>
              {userOrders.map((order) => (
                <div className='cardpedido' key={order.orderId}>
                  <div>
                  <p> {order.products[0].title}</p>
                  <p>Quantidade: {order.products[0].quantity}</p>
                  <p>Total: {order.products[0].totalPrice}</p>
                  {order.totalPrice !== undefined && (
                    <p>Total: R$ {order.totalPrice.toFixed(2)}</p>
                  )}
                  </div>
                  {/* Renderize mais detalhes do pedido conforme necessário */}

                  <h4>Endereço</h4>
                  {order.selectedAddress && (
                    <div>
                      <p>Endereço: {order.selectedAddress.enderecoEntrega}</p>
                      <p>Cidade: {order.selectedAddress.cidade}</p>
                      <p>Bairro: {order.selectedAddress.bairro}</p>
                      {/* Renderize mais detalhes do endereço conforme necessário */}
                    </div>
                  )}
                </div>
              ))}
          
            </div>


      </div>
   
    </div>
  );
}
