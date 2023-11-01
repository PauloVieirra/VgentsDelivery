import React,{useState,useEffect} from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useCart } from "../../Context/CartContext";
import { userData, email, name, userimage, local } from "../localStorageComponent";
import logoTop from '../../images/logodfoodg.png';
import CartModal from "../../screens/CartModal/Index";
import { faHome, faHistory, faShoppingCart, faUser, } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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


const MenuOutSide = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [isCartOpen, setIsCartOpen] = useState(false);


  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };



  const handlenavegue = () => {
    navigate('Signin');
  };
  const handlenavegueInit = () => {
    navigate('/');
  };
  const handlenavegueSignin = () => {
    navigate('/Signin');
  };
  
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
            <Link to="/Sobre" style={{textDecoration:'none', color:'#131313'}}>
              Sobre
            </Link>
          </div>
          <div className="btnmenudesk">
            <Link to="/Parceiros" style={{textDecoration:'none', color:'#131313'}}>
              Clientes
            </Link>
          </div>
          <div className="btnmenudesk">
            <Link to="/Termos" style={{textDecoration:'none', color:'#131313'}}>
              Termos
            </Link>
          </div>
        </div>
        <div className="contnotify">
          <div onClick={toggleCart} className="divcart">
           <FontAwesomeIcon icon={faShoppingCart}  fontSize='22px' color='#000'/>
          </div>
          </div>
        <div className='dataper'>
          <div className="contdatauser">
           <div style={{fontSize:'14px', fontWeight:'600'}}>
          
           </div>  
           <div  style={{fontSize:'14px'}}>
            
           </div>
          </div>
          
        </div>
        {isCartOpen && (
        <CartModal  onClose={toggleCart} />
         )}
        { location.pathname === '/'  && (
           
            <button className="btnback" onClick={handlenavegue}>Login</button>
        
        )}
        { location.pathname === '/Signin'  && (
            <div className="contbtngo">
            <button className="btnback" onClick={handlenavegueInit}>Voltar</button>
            </div>
        )}
         { location.pathname === '/SignUp'  && (
            <div className="contbtngo">
            <button className="btnback" onClick={handlenavegueSignin}>Voltar</button>
            </div>
        )}

        
         </div>
      
  </div>
  );
};

const MenuClient = () => {
    const { signOut, isAuthenticated,user } = useAuth();
    const navigate = useNavigate();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(''); 
    
    

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
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

    const handleHomes = () => {
      navigate('/');
    };
    const handleHistory = () => {
      navigate('/MeusPedidos');
    };
    const handleCart = () => {
      navigate('/CartModal');
    };
    const handleMaps = () => {
      navigate('/Maps');
    };
  
    return (
        <>
      <div className="contdeskmenu">
        <div className="divdeskinto" style={{height:'auto',alignItems:'center'}}>
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
        <CartModal  onClose={toggleCart} userIsAuthenticated={isAuthenticated} />
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

       <div className='containerfooter'>
        <div className='btnmenu' style={{ marginLeft: '30px' }} onClick={handleHomes}>
          <FontAwesomeIcon icon={faHome} fontSize='22px' color='#000' />
          
        </div>
     
        <div className='btnmenu' onClick={handleHistory}>
          <FontAwesomeIcon icon={faHistory} fontSize='22px'/>
       
        </div>
     
      
        <div className='btnmenu' onClick={toggleCart}>
          <FontAwesomeIcon icon={faShoppingCart}  fontSize='22px' color='#000'/>
        </div>
     
    
        <div className='btnmenu' style={{ marginRight: '30px' }}  onClick={handleMaps}>
          <FontAwesomeIcon icon={faUser} fontSize='22px' />
        
        </div>
     
    </div>
     
      </>
    );
  };


export  {MenuLogista, MenuClient, MenuOutSide};