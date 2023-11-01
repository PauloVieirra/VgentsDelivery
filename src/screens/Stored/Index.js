import React, { useState, useEffect, useRef,useContext } from 'react';
import './style.css';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import CitySelection from '../../Components/SearchCyty';
import icons1 from '../../images/icon1.png';
import icons2 from '../../images/icon2.png';
import icons3 from '../../images/icon3.png';
import icons4 from '../../images/icon4.png';
import icons5 from '../../images/icon5.png';
import icons6 from '../../images/icon6.png';
import icons7 from '../../images/icon7.png';
import { CartContext } from '../../Context/CartContext';



const Store = () => {
  const { lojistaId } = useParams();
  const { products, getProductsByUserId, isAuthenticated, openCartModal } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const resultsSectionRef = useRef(null);
  const searchInputRef = useRef(null);
  const [showCitySelection, setShowCitySelection] = useState(!lojistaId);
  const {user} = useAuth();
  const navigate = useNavigate();
  const [logistaUsers, setLogistaUsers] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [lojistaData, setLojistaData] = useState({
    url:'',
    img: '',
    name: '', 
    email: '', 
    phone:'',
  });

 


  



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

  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem('logistaUsers')) || [];
    const logistaUsers = allUsers.filter(user => user.ROLE.tipo === 'logista');
    setLogistaUsers(logistaUsers);
  
    // Verifique se lojistaId corresponde à URL antes de carregar os dados
    if (lojistaId) {
      const lojistaCorrespondente = logistaUsers.find(user => user.url === lojistaId);
  
      if (lojistaCorrespondente) {
        const { url,img, name, email, phone } = lojistaCorrespondente;
        setLojistaData({
          url,
          img,
          name, 
          email, 
          phone,
        });
        setDataLoaded(true);
      } else {
        console.log("Lojista não encontrado");
        // Se o lojista não for encontrado, você pode limpar os dados
        setLojistaData({
          url:'',
          img: '',
          name: '',
          email: '',
          phone: '',
        });
        setDataLoaded(true);
      }
    }
  }, [lojistaId]);
  
  
 
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

  

  

  const handleSearchFocus = () => {
    // Redefina a pesquisa e a categoria quando o foco da busca for ativado
    setSearchTerm('');
    setSelectedCategory('');
    localStorage.removeItem('selectedCategory');
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

  const handlenavegue = () => {
    navigate('Signin');
  };

  return (
    <div className="contstore">
      <div className='cont' >
       </div>
       <div className="contstore">
          
       {dataLoaded && lojistaId === lojistaData.url && ( // Renderize apenas se os dados foram carregados e o lojistaId corresponde à URL
        <div className="lojista-info">
          <div className='cardstore'>
            <div className='contimgstore'>
             <img src={lojistaData.img} alt="" className='imgstore'/>
            </div>
          <div className='contdatastore'>
            <div style={{display:'flex'}}>
               <div className='dicdatainto'>{lojistaData.name || 'Nome da Loja'}</div>
               <div style={{display:'flex', flexDirection:'row', width:'40px', marginRight:'2%'}}>A4.3</div>
            </div>
            
             <div className='dicdatainto'>{lojistaData.phone || 'Nome da Loja'}</div>
             <div className='dicdatainto'>{lojistaData.email || 'Email da Loja'}</div>
          </div>
          </div>
        </div>
      )}
      
    </div>
       {user && (
      <div className="cart-icon" onClick={toggleCart}>
        <FontAwesomeIcon icon={faShoppingCart} style={{ color: '#131313' }} />
        <span className={`cart-count ${cartItems.length !== 0 ? 'non-zero' : ''}`}>
          {cartItems.length}
        </span>
      </div>
         )}
      
      
       <div className='divsearchbarr'>
       <CitySelection onSelectCity={handleSelectCity} /> </div>
      
     
       

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


export default Store;
