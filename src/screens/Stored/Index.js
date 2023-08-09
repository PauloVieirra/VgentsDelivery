import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import LogoutButton from '../../Components/Logout';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import food from '../../images/lanchedef.png';
import molhosone from '../../images/molho1.png';
import molhosthow from '../../images/molho2.png';
import molhosthree from '../../images/molho3.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import CartModal from '../CartModal/Index';
import ProductDetailsModal from '../../Components/DetailsModalProduct';

const Store = () => {
  const { lojistaId } = useParams();
  const { products, getProductsByUserId, isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);



  useEffect(() => {
    const unsubscribe = getProductsByUserId(lojistaId);
  
     // Carrega os itens do carrinho do localStorage quando o componente é montado
     const storedCartItems = localStorage.getItem('cartItems');
     if (storedCartItems) {
       setCartItems(JSON.parse(storedCartItems));
     }
 
     return () => {
       unsubscribe();
     };
   }, [lojistaId, getProductsByUserId]);
   
 
   useEffect(() => {
     // Salva os itens do carrinho no localStorage sempre que o carrinho é alterado
     localStorage.setItem('cartItems', JSON.stringify(cartItems));
   }, [cartItems]);


  const openProductDetails = (product) => {
    setSelectedProduct({ product, selectedQuantity: 1 });
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  const [searchTerm, setSearchTerm] = useState('');
  const filteredProducts = products.filter((product) => {
    const lowerCasedSearchTerm = searchTerm.toLowerCase();
    return (
      product.title.toLowerCase().includes(lowerCasedSearchTerm) ||
      product.description.toLowerCase().includes(lowerCasedSearchTerm)
    );
  });

  const resultsSectionRef = useRef(null);
  const searchInputRef = useRef(null);


  const handleSearchFocus = () => {
    const scrollPosition = resultsSectionRef.current.offsetTop - 160; // Subtrai 60px da posição
    window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
  };

  const addToCart = (product, selectedQuantity) => {
    const existingItem = cartItems.find(item => item.id === product.id);
  
    if (existingItem) {
      // Update the quantity and total price of the existing item
      const updatedCart = cartItems.map(item =>
        item.id === existingItem.id
          ? {
              ...item,
              quantity: selectedQuantity,
              totalPrice: product.price * selectedQuantity,
            }
          : item
      );
      setCartItems(updatedCart);
    } else {
      // Add a new item to the cart
      setCartItems([...cartItems, { ...product, quantity: selectedQuantity, totalPrice: product.price * selectedQuantity,logistaUid: lojistaId }]);
    }
  
    // Close the product details modal
    closeProductDetails();
  };

  const removeFromCart = (itemToRemove) => {
    const updatedCart = cartItems.filter(item => item.id !== itemToRemove.id);
    setCartItems(updatedCart);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  
  

  return (
    <div className="contstore">
      <div className="cart-icon" onClick={toggleCart}>
      <FontAwesomeIcon icon={faShoppingCart} style={{color:'#fff'}} />
        <span className="cart-count">{cartItems.length}</span>
      </div>
      <div className='contclient'>
        <div className='contleft'>
          <div className='texttittle'>
            Mais que comida,
            <br/>é experiência,
            </div>
        </div>
        <div className='contright'>
          <div className='contclientbanner'>
            <img src={food} alt="" className='food-image'/>
          </div>
          <div className='contmolhos'>
            <div> <img src={molhosthree} alt="" className='contmolho1' /> </div>
            <div> <img src={molhosthow} alt=""  className='contmolho2'/> </div>
            <div> <img src={molhosone} alt=""  className='contmolho3'/> </div>
          </div>
        </div>
      </div>
      <div className='cliensearshbar'> 
        <input
          type='text'
          placeholder='Pesquisar..'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleSearchFocus}
          ref={searchInputRef}
        />
      </div>
      <div ref={resultsSectionRef}></div>
      <div className='contprodclient' >
        {filteredProducts.map((product) => (
          <div key={product.id} className='product-card' onClick={() => openProductDetails(product)}>
           
              <img src={product.imageUrl} alt={product.title} className='contimg' />
              <div style={{margin:'10px'}}>
                <h3 style={{ color: '#000' }}>{product.title}</h3>
              <p>{product.description}</p>
              <p>Preço: R$ {product.price}</p>
            

              </div>
              
          
          </div>
        ))}
       

      </div>
      <div className="product-list">
        <LogoutButton />
        <Link to={`/${lojistaId}`}>Acessar Loja</Link>
      </div>
      {selectedProduct && (
  <ProductDetailsModal
    product={selectedProduct.product}
    onClose={closeProductDetails}
    addToCart={(product, quantity) => addToCart(product, quantity)}
  />
)}

      {isCartOpen && (
        <CartModal cartItems={cartItems} removeFromCart={removeFromCart} onClose={toggleCart} userIsAuthenticated={isAuthenticated} />
      )}

      
    </div>
  );
};

export default Store;
