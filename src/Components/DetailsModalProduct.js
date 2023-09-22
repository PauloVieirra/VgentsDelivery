
import React,{useState} from 'react';
import './styles.css';


const ProductDetailsModal = ({ product, onClose, addToCart }) => {
    const [selectedQuantity, setSelectedQuantity] = useState(1);
  
    const handleQuantityChange = (event) => {
      const newQuantity = parseInt(event.target.value, 10);
      setSelectedQuantity(newQuantity);
    };
  
    const totalPrice = product.price * selectedQuantity;
  
    return (
      <div className="product-details-modal">
        <div className="modal-content">
         
          <div>
          <img src={product.imageUrl} alt={product.title} className="product-ig" />
          </div>

          <div className='contdatadtls'>

          <h2>{product.title}</h2>
          <div className='contdescriptiondtls'>
             <p>{product.description}</p>
          </div>
         
          <div className='contpricedtls'>
            <p>Preço: R$ {product.price}</p>
          </div>
          
          
          <label htmlFor="quantity">Quantidade:</label>

          <input
            type="number"
            id="quantity"
            value={selectedQuantity}
            onChange={handleQuantityChange}
            min="1"
          />  <p>Total: R$ {totalPrice.toFixed(2)}</p>

          
           <div className='contbtnaddcart'>
          
             <button onClick={() => addToCart(product, selectedQuantity)}>Adicionar ao Carrinho</button>
           </div>
         

          </div>
          <button className="close-button" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    );
  };

export default ProductDetailsModal;
