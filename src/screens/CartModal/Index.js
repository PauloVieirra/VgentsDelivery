import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const CartModal = ({ cartItems, removeFromCart, onClose, userIsAuthenticated }) => {
  const navigate = useNavigate();
  const handleFinalizeOrder = () => {
    
    onClose();
    if (userIsAuthenticated ) {
      // Se o usuário estiver autenticado, vá para a tela de confirmação
      navigate('/ConfirmationPage', { state: { cartItems } });
     
    } else {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      // Se não estiver autenticado, vá para a tela de login
      navigate('/SignIn', { state: { cartItems } });
    } console.log(cartItems);
   
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.totalPrice || 0), 0);
  };

  return (
    <div className="cart-modal">
      <h2>Carrinho de Compras</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            {item.title} - Quantidade: {item.quantity} - Valor: R$ {item.totalPrice.toFixed(2)}
            <button onClick={() => removeFromCart(item)}>Remover</button>
          </li>
        ))}
        <li>
          <strong>Total:</strong> R$ {calculateTotalPrice().toFixed(2)}
        </li>
        <div onClick={handleFinalizeOrder}>Finalizar pedido</div>
      </ul>
      <button className="close-button" onClick={onClose}>
        X
      </button>
    </div>
  );
};

export default CartModal;
