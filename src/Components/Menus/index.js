import React,{useState,useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { userData, email, name, userimage } from "../localStorageComponent";
import logoTop from '../../images/logodfoodg.png';
import CartModal from "../../screens/CartModal/Index";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'; // Importe os ícones necessários
import iconbarmenuclose from '../../images/closemenu.png';
import iconbarmenu from '../../images/menuicon.png'
import SideMenu from "../SideMenu";

import './style.css';





const MenuLogista = () => {
    return(
    <div className='contdeskmenu'>
        <div className="divdeskinto">
          <div className="divcenetrelogo">
            <img src={logoTop} className="logomobi" />
          </div>
          <div className="divbtns">
             <div className="btnmenudesk">
              <Link to="/" className="divlink" style={{textDecoration:'none', color:'#131313'}}>
                Inicio
              </Link>
            </div>
            <div className="btnmenudesk">
              <Link to="/Products" style={{textDecoration:'none', color:'#131313'}}>
                Produtos
              </Link>
            </div>
            <div className="btnmenudesk">
              <Link to="/Pedidos" style={{textDecoration:'none', color:'#131313'}}>
                Pedidos
              </Link>
            </div>
          </div>
          <div className="contnotify">
          </div>
          <div className='dataper'>
            <div className="contdatauser">
             <div style={{fontSize:'14px', fontWeight:'600'}}>
             {name} 
             </div>  
             <div  style={{fontSize:'14px'}}>
              {email}
             </div>
            </div>
            <div className="contdatauser">
            <img src={userimage} alt="" className="contimguser"/>    
            </div>
          </div>
        </div>
        
    </div>
    );
};



const MenuClient = () => {
    const { signOut, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0); 
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(''); 
  

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };
   
    const updateCartCount = (count) => {
      setCartCount(count);
    };

    const removeFromCart = (itemToRemove) => {
        const updatedCart = cartItems.filter((item) => item.id !== itemToRemove.id);
        setCartItems(updatedCart);
      };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
      };
  
    const handleLogout = async () => {
      try {
        await signOut();
        // Após o logout, redirecione para a tela de login
        navigate('/');
      } catch (error) {
        console.error('Erro ao fazer logout:', error.message);
      }
    };

    const teste = () => {
        setIsMenuOpen(true);
    }
  
    return (
        <>
      <div className="contdeskmenu">
        <div className="divdeskinto">
          <div className="divcenetrelogo">
            <img src={logoTop} className="logomobi" />
          </div>
          <div className="divbtns">
            <div className="btnmenudesk">
              <Link to="/" className="divlink" style={{ textDecoration: 'none', color: '#131313' }}>
                Inicio
              </Link>
            </div>
            <div className="btnmenudesk">
              <Link to="/MeusPedidos" style={{ textDecoration: 'none', color: '#131313' }}>
                Historico
              </Link>
            </div>
          </div>
          <div className="contnotify">
          <div onClick={toggleCart} className="divcart">
           <FontAwesomeIcon icon={faShoppingCart}  fontSize='22px' color='#000'/>
          </div>
          </div>
          <div className="dataper">
            <div className="contdatauser">
              <div style={{ fontSize: '14px', fontWeight: '600' }}>
                {name}
              </div>
              <div style={{ fontSize: '14px' }}>
                {email}
              </div>
            </div>
            <div className="contdatauser">
              <img src={userimage} alt="" className="contimguser" />
            </div>
            <div className="contsair" onClick={handleLogout}>
              Sair
            </div>

            <div>
            </div>
          </div>
        </div>
        {isCartOpen && (
        <CartModal cartItems={cartItems} removeFromCart={removeFromCart} onClose={toggleCart} userIsAuthenticated={isAuthenticated} />
         )}
       {isMenuOpen && (
         <SideMenu/> 
        )}
      </div>
    
        {isMenuOpen && (
           <img src={iconbarmenuclose} alt="" className="botmenuside"  onClick={toggleMenu}/>  
        )}

        {!isMenuOpen && (
           <img src={iconbarmenu} alt="" className="botmenuside"  onClick={toggleMenu} /> 
        )}
     
      </>
    );
  };

export  {MenuLogista, MenuClient};