
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
          <button className="close-button" onClick={onClose}>
            Close
          </button>
          <div>
          <img src={product.imageUrl} alt={product.title} className="product-image" />
          </div>
          <div>

         
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>Preço: R$ {product.price}</p>
          <label htmlFor="quantity">Quantidade:</label>
          <input
            type="number"
            id="quantity"
            value={selectedQuantity}
            onChange={handleQuantityChange}
            min="1"
          />
          <p>Total: R$ {totalPrice.toFixed(2)}</p>
          <button onClick={() => addToCart(product, selectedQuantity)}>Adicionar ao Carrinho</button>
          </div>
        </div>
      </div>
    );
  };

export default ProductDetailsModal;
