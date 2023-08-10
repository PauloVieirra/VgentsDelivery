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
                {/* Renderize a imagem do pedido aqui */}
              </div>
              <div className='contmincards'>
                {order.products.map((product) => (
                  <div className='mincard'>
                  <div key={product.id}>
                    <p>{product.title}</p>
                    <p>Quantidade: {product.quantity}</p></div>
                    <p>Valor: {product.totalPrice}</p>
                  </div>
                ))}
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
               
              </div>
            </div>
          ))}
            </div>
      </div>
   
    </div>
  );
}
