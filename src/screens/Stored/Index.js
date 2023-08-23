import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import LogoutButton from '../../Components/Logout';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import icons1 from '../../images/icon1.png';
import icons2 from '../../images/icon2.png';
import icons3 from '../../images/icon3.png';
import icons4 from '../../images/icon4.png';
import icons5 from '../../images/icon5.png';
import icons6 from '../../images/icon6.png';
import icons7 from '../../images/icon7.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import CartModal from '../CartModal/Index';
import BannersCarousel from '../../Components/Banners/BnnerLoja';
import ProductDetailsModal from '../../Components/DetailsModalProduct';

const Store = () => {
  const { lojistaId } = useParams();
  const { products, getProductsByUserId, isAuthenticated, openCartModal } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const resultsSectionRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const unsubscribe = getProductsByUserId(lojistaId);

    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }

    const storedCategory = localStorage.getItem('selectedCategory');
    if (storedCategory) {
      setSelectedCategory(storedCategory);
    }

    return () => {
      unsubscribe();
    };
  }, [lojistaId, getProductsByUserId]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleIconClick = (category) => {
    setSearchTerm('');
    setSelectedCategory(category);
    localStorage.setItem('selectedCategory', category);
  };

  const filteredProducts = products.filter((product) => {
    const lowerCasedSearchTerm = searchTerm.toLowerCase();
    const lowerCasedCategory = selectedCategory.toLowerCase(); // Converta a categoria selecionada para minúsculas

    return (
      (product.title.toLowerCase().includes(lowerCasedSearchTerm) ||
        product.description.toLowerCase().includes(lowerCasedSearchTerm)) &&
      (!selectedCategory || product.category.toLowerCase().includes(lowerCasedCategory)) // Compare com a categoria do produto em minúsculas
    );
  });

  const openProductDetails = (product) => {
    setSelectedProduct({ product, selectedQuantity: 1 });
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  const handleSearchFocus = (category) => {
   
    const scrollPosition = resultsSectionRef.current.offsetTop - 280;
    window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
     setSelectedCategory('');
  };

  const addToCart = (product, selectedQuantity) => {
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
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
      setCartItems([...cartItems, { ...product, quantity: selectedQuantity, totalPrice: product.price * selectedQuantity, logistaUid: lojistaId }]);
    }

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
  <FontAwesomeIcon icon={faShoppingCart} style={{color:'#131313'}} />
  <span className={`cart-count ${cartItems.length !== 0 ? 'non-zero' : ''}`}>
      {cartItems.length}
      </span>
  </div>
  <div className='contclient'>
     <BannersCarousel/>
      </div>
       <div className='divsearchbarr'>
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
         <div className='divbarricons'>
         <div className={`conticonsear ${selectedCategory === 'Shopp' ? 'selected' : ''}`} onClick={() => handleIconClick('Shopp')}>
              <img src={icons7} alt="" className='conticonsearsh' />
              Chopp
            </div>
            <div className={`conticonsear ${selectedCategory === 'Bebida' ? 'selected' : ''}`} onClick={() => handleIconClick('Bebida')}>
              <img src={icons1} alt="" className='conticonsearsh' />
              Drink
            </div>
            <div className='conticonsear'>
            <img src={icons2} alt=""className='conticonsearsh'/>
              Combo
            </div>
            <div className='conticonsear'>
            <img src={icons3} alt=""className='conticonsearsh'/>
              Petisco
            </div>
            <div className='conticonsear'>
            <img src={icons4} alt=""className='conticonsearsh'/>
              Prato
            </div>
            <div className='conticonsear'>
            <img src={icons5} alt="" className='conticonsearsh'/>
              Vinho
            </div>
            <div className='conticonsear'>
            <img src={icons6} alt="" className='conticonsearsh'/>
              Doces
            </div>
         </div>
       
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
