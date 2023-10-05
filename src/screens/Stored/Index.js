import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import LogoutButton from '../../Components/Logout';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import CartModal from '../CartModal/Index';
import ProductDetailsModal from '../../Components/DetailsModalProduct';
import CitySelection from '../../Components/SearchCyty';
import Banners from '../../Components/Banners/BannerImpussion';
import CardList from '../../Components/ItensImpullss';
import icons1 from '../../images/icon1.png';
import icons2 from '../../images/icon2.png';
import icons3 from '../../images/icon3.png';
import icons4 from '../../images/icon4.png';
import icons5 from '../../images/icon5.png';
import icons6 from '../../images/icon6.png';
import icons7 from '../../images/icon7.png';

const Store = () => {
  const { lojistaId } = useParams();
  const { products, getProductsByUserId, isAuthenticated, openCartModal } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const resultsSectionRef = useRef(null);
  const searchInputRef = useRef(null);
  const [showCitySelection, setShowCitySelection] = useState(!lojistaId);
  const {user} = useAuth();

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

    setShowCitySelection(!lojistaId);

    return () => {
      unsubscribe();
    };
    }, [lojistaId, getProductsByUserId]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleIconClick = (category) => {
    setSelectedCategory(category);
    setSearchTerm('');
    localStorage.setItem('selectedCategory', category);
  };

  const filteredProducts = products.filter((product) => {
    const lowerCasedSearchTerm = searchTerm.toLowerCase();
    const lowerCasedCategory = selectedCategory.toLowerCase();

    return (
      (product.title.toLowerCase().includes(lowerCasedSearchTerm) ||
        product.description.toLowerCase().includes(lowerCasedSearchTerm)) &&
      (!selectedCategory || product.category.toLowerCase() === lowerCasedCategory)
    );
  });

  const openProductDetails = (product) => {
    setSelectedProduct({ product, selectedQuantity: 1 });
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  const handleSearchFocus = () => {
    // Redefina a pesquisa e a categoria quando o foco da busca for ativado
    setSearchTerm('');
    setSelectedCategory('');
    localStorage.removeItem('selectedCategory');
  };

  const addToCart = (product, selectedQuantity) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
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
    const updatedCart = cartItems.filter((item) => item.id !== itemToRemove.id);
    setCartItems(updatedCart);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  
  // Função para selecionar uma cidade
  const handleSelectCity = (city) => {
    setSelectedCity(city);
    // Aqui você pode fazer a busca de vendedores com base na cidade selecionada
  };

  


  return (
    <div className="contstore">
    
      <div className="cart-icon" onClick={toggleCart}>
        <FontAwesomeIcon icon={faShoppingCart} style={{ color: '#131313' }} />
        <span className={`cart-count ${cartItems.length !== 0 ? 'non-zero' : ''}`}>
          {cartItems.length}
        </span>
      </div>
      <Banners/>
      
      {showCitySelection ? ( // Renderize a seleção de cidade quando showCitySelection for true
      
       <div className='divsearchbarr'>
        
       <CitySelection onSelectCity={handleSelectCity} /> </div>
      
      ) : (
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
      <div className='contbaricons'>
        <div className='divbarricons'>
          <div className={`conticonsear ${selectedCategory === 'Cerveja' ? 'selected' : ''}`} onClick={() => handleIconClick('Cerveja')}>
            <img src={icons7} alt="" className='conticonsearsh' />
            Cervejas
          </div>
          <div className={`conticonsear ${selectedCategory === 'Drink' ? 'selected' : ''}`} onClick={() => handleIconClick('Drink')}>
            <img src={icons1} alt="" className='conticonsearsh' />
            Drink`s
          </div>
          <div className={`conticonsear ${selectedCategory === 'Lanche' ? 'selected' : ''}`} onClick={() => handleIconClick('Lanche')}>
            <img src={icons2} alt="" className='conticonsearsh'/>
            Lanche
          </div>
          <div className={`conticonsear ${selectedCategory === 'Petisco' ? 'selected' : ''}`} onClick={() => handleIconClick('Petisco')}>
            <img src={icons3} alt="" className='conticonsearsh'/>
            Petiscos
          </div>
          <div className={`conticonsear ${selectedCategory === 'Prato' ? 'selected' : ''}`} onClick={() => handleIconClick('Prato')}>
            <img src={icons4} alt="" className='conticonsearsh'/>
            Pratos
          </div>
          <div className={`conticonsear ${selectedCategory === 'Vinho' ? 'selected' : ''}`} onClick={() => handleIconClick('Vinho')}>
            <img src={icons5} alt="" className='conticonsearsh'/>
            Vinhos
          </div>
          <div className={`conticonsear ${selectedCategory === 'Sobremesa' ? 'selected' : ''}`} onClick={() => handleIconClick('Sobremesa')}>
            <img src={icons6} alt="" className='conticonsearsh'/>
            Doces
          </div>
         </div>
        </div>
      </div>
      )}

      <div ref={resultsSectionRef}></div>
      <div className='contprodclient' >
        {filteredProducts.map((product) => (
          <div key={product.id} className='product-card' onClick={() => openProductDetails(product)}>
            <img src={product.imageUrl} alt={product.title} className='contimg' />
          <div style={{ margin: '10px' }}>
              <h3 style={{ color: '#000' }}>{product.title}</h3>
              <p>{product.description}</p>
              <p>Preço: R$ {product.price}</p>
          </div>
          </div>
        ))}
      
      </div>
      <div className="product-list"></div>
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
