import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import './style.css';



const CartModal = ({ onClose, userIsAuthenticated }) => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, getItemCount, getTotalPrice  } = useCart();
  const [ contItens, setContItens] = useState();

  const handleRemoveItem = (item) => {
    removeFromCart(item);
  };

  useEffect(() => {
    const updateItemCount = () => {
      if (getItemCount() >= 1) {
        setContItens(getItemCount());
      } else {
        setContItens('');
      }
    };

    // Adicione um ouvinte para chamar updateItemCount quando a quantidade de itens mudar
    updateItemCount();

    // Retorne uma função de limpeza para remover o ouvinte quando o componente for desmontado
    return () => {
      // Remova o ouvinte
    };
  }, [getItemCount]);

  

  return (
    <div className="cart-modal">
      <div className='contleftmodalcart'>
          {contItens && (
            <div className='contcarttittle'>Lista de pedidos</div>
          )}
           {!contItens && (
            <div className='divnoitenscart'>Seu carrinho esta vazio!!!</div>  
           )}
        {cartItems.map(item => (
          <div className='contlineitemcart' key={item.id}>
            <div className='contimgcartitem'>
              <img src={item.imageUrl} alt="" className='contimgcartitem' />
            </div>
            <div className='contdatacart'>
              <div className='tittlecart'>
                {item.title} 
                <div>
                <DeleteIcon onClick={() => handleRemoveItem(item)}/>
               </div>
              </div>
              <div>
                {item.category}
              </div>
              <div className='contcartvalor'>
                <small>R$ {item.price}</small>
              </div>
              <div>
              Quantidade: {item.quantity}
              <ButtonGroup variant="contained" aria-label="outlined primary button group">
              <Button size="small" onClick={() => increaseQuantity(item)}>+</Button>
              <Button size="small" onClick={() => decreaseQuantity(item)}>-</Button>
             </ButtonGroup>
              </div>
             
            <div className='divdataintcart'>
              
              
            </div>


            </div>
            
          </div>
        ))}
      </div>
      <div className='contrightmodalcart'>
        <div className='conttotalcart'>
          <strong>Total:</strong> R$  {getTotalPrice().toFixed(2)}
        </div>
        <div className='contbtns'>
        {contItens && (
        <button className='btnconfirmar'>Confirmar pedido</button>
        )}
          

          <button className="btnclosemodal" onClick={onClose}>Continuar comprando</button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
