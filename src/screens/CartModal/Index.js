import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const CartModal = ({ cartItems, removeFromCart, onClose, userIsAuthenticated }) => {
  const navigate = useNavigate();
  const [savedCartItems, setSavedCartItems] = useState([]);

  useEffect(() => {
    // Retrieve cart items from localStorage on component mount
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setSavedCartItems(JSON.parse(savedCart));
    }
  }, []);

  const handleRemoveItem = (item) => {
    // Call removeFromCart function and then update savedCartItems
    removeFromCart(item);
    // Update the saved cart items in local storage
    const updatedSavedCart = savedCartItems.filter(savedItem => savedItem.id !== item.id);
    localStorage.setItem('cartItems', JSON.stringify(updatedSavedCart));
    setSavedCartItems(updatedSavedCart);
  };

  const handleFinalizeOrder = () => {
    onClose();
    if (userIsAuthenticated) {
      navigate('/ConfirmationPage', { state: { cartItems } });
    } else {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      navigate('/SignIn', { state: { cartItems } });
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.totalPrice || 0), 0);
  };

  return (
    <div className="cart-modal">
      <div className='contleftmodalcart'>
        <div className='contcarttittle'>Lista de pedidos</div>
        {savedCartItems.map(item => (
          <div className='contlineitemcart' key={item.id}>
            <div className='contimgcartitem'>
              <img src={item.imageUrl} alt="" className='contimgcartitem' />
            </div>
            <div className='contdatacart'>
              <div className='tittlecart'>
                {item.title} 
              </div>
              <div>
                Quantidade: {item.quantity}
              </div>
              <div>
               {item.category}
              </div>
            </div>
            <div className='divdataintcart'>
              <div className='contcartvalor'>
                <small>R$</small> {item.totalPrice.toFixed(2)}
              </div>
              <div>
                 <button className='btnremove' onClick={() => handleRemoveItem(item)}>Remover</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='contrightmodalcart'>
        <div className='conttotalcart'>
          <strong>Total:</strong> R$ {calculateTotalPrice().toFixed(2)}
        </div>
        <div className='contbtns'>
          <button className='btnconfirmar' onClick={handleFinalizeOrder}>Confirmar pedido</button>
          <button className="btnclosemodal" onClick={onClose}>Cancelar pedido</button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
