import React,{useState,useEffect} from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { userData, email, name, userimage, local } from "../localStorageComponent";
import logoTop from '../../images/logodfoodg.png';
import CartModal from "../../screens/CartModal/Index";
import { useCart } from "../../Context/CartContext";
import { faHome, faHistory, faShoppingCart, faUser, } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import iconbarmenuclose from '../../images/closemenu.png';
import iconbarmenu from '../../images/menuicon.png'
import firebase from '../../config/firebaseConfig';
import Notification from "../Notification";
import SideMenu from "../SideMenu";
import './style.css';


const MenuAdm = () => {
  const { signOut, isAuthenticated,user } = useAuth();
  const navigate = useNavigate();
  const { getItemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(''); 
  
  
const [contItems, setContItems] = useState(false);

useEffect(() => {
  const updateItemCount = () => {
    if (getItemCount() >= 1) {
      setContItems(getItemCount());
    } else {
      setContItems('');
    }
  };

  // Adicione um ouvinte para chamar updateItemCount quando a quantidade de itens mudar
  updateItemCount();

  // Retorne uma função de limpeza para remover o ouvinte quando o componente for desmontado
  return () => {
    // Remova o ouvinte
  };
}, [getItemCount]);
  

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
            <Link to="/Cadastroloja" style={{ textDecoration: 'none', color: '#131313' }}>
              Cadastro
            </Link>
          </div>
        </div>

        <div className="contnotifycontrole" >
        <div className='btnmenucontrole'onClick={toggleCart}>
        <FontAwesomeIcon icon={faShoppingCart}  fontSize='22px' color='#555'/>
        {contItems && (
        <div className="divcounter">
          {getItemCount()}
        </div>
        )}
      </div>
        </div>

        {user &&(
          <div className="contnotifycontrolelog" >
          <div className='btnmenucontrole'onClick={toggleCart}>
          <FontAwesomeIcon icon={faShoppingCart}  fontSize='22px' color='#555'/>
          {contItems && (
          <div className="divcounter">
            {getItemCount()}
          </div>
          )}
        </div>
          </div>
        )}

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

       <div className="contbtnmenu">
          {isMenuOpen && (
            <img src={iconbarmenuclose} alt="" className="botmenuside"  onClick={toggleMenu}/>  
          )}

          {!isMenuOpen && (
            <img src={iconbarmenu} alt="" className="botmenuside"  onClick={toggleMenu} /> 
          )}
          </div>
        
      </div>
     

      {isCartOpen && (
      <CartModal  onClose={toggleCart} userIsAuthenticated={isAuthenticated} />
       )}

     {isMenuOpen && (
       <SideMenu/> 
      )}
    </div>
      
      
     

     <div className='containerfooter'>
      <div className='btnmenu' style={{ marginLeft: '30px' }} onClick={handleHomes}>
        <FontAwesomeIcon icon={faHome} fontSize='22px' color='#000' />
        
      </div>
   
      <div className='btnmenu' onClick={handleHistory}>
        <FontAwesomeIcon icon={faHistory} fontSize='22px'/>
     
      </div>
   
    
      <div className='btnmenu' onClick={toggleCart}>
        <FontAwesomeIcon icon={faShoppingCart}  fontSize='22px' color='#555'/>
        {contItems && (
        <div className="divcounter">
          {getItemCount()}
        </div>
        )}
      </div>
   
  
      <div className='btnmenu' style={{ marginRight: '30px' }}  onClick={handleMaps}>
        <FontAwesomeIcon icon={faUser} fontSize='22px' />
      
      </div>
   
  </div>
   
    </>
  );
};

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
  const { getItemCount } = useCart();

  const [contItems, setContItems] = useState(false);

  useEffect(() => {
    const updateItemCount = () => {
      if (getItemCount() >= 1) {
        setContItems(getItemCount());
      } else {
        setContItems('');
      }
    };

    // Adicione um ouvinte para chamar updateItemCount quando a quantidade de itens mudar
    updateItemCount();

    // Retorne uma função de limpeza para remover o ouvinte quando o componente for desmontado
    return () => {
      // Remova o ouvinte
    };
  }, [getItemCount]);

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
        <div className='btnmenu' onClick={toggleCart}>
          <FontAwesomeIcon icon={faShoppingCart}  fontSize='22px' color='#555'/>
          {contItems && (
          <div className="divcounter">
            {getItemCount()}
          </div>
          )}
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
          <div className="contbtngo">
            <button className="btnback" onClick={handlenavegue}>Login</button>
          </div>
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

    const { signOut, isAuthenticated, user } = useAuth();
    const navigate = useNavigate();
    const { getItemCount } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(''); 
    
    
  const [contItems, setContItems] = useState(false);

  useEffect(() => {
    const updateItemCount = () => {
      if (getItemCount() >= 1) {
        setContItems(getItemCount());
      } else {
        setContItems('');
      }
    };

    // Adicione um ouvinte para chamar updateItemCount quando a quantidade de itens mudar
    updateItemCount();

    // Retorne uma função de limpeza para remover o ouvinte quando o componente for desmontado
    return () => {
      // Remova o ouvinte
    };
  }, [getItemCount]);
    

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
      navigate('/WebappLoja');
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

         

          <div className="contnotifycontrole" >
          <div className='btnmenucontrole'onClick={toggleCart}>
          <FontAwesomeIcon icon={faShoppingCart}  fontSize='22px' color='#555'/>
          {contItems && (
          <div className="divcounter">
            {getItemCount()}
          </div>
          )}
        </div>
          </div>

          {user &&(
            <div className="contnotifycontrolelog" >
            <div className='btnmenucontrole'onClick={toggleCart}>
            <FontAwesomeIcon icon={faShoppingCart}  fontSize='22px' color='#555'/>
            {contItems && (
            <div className="divcounter">
              {getItemCount()}
            </div>
            )}
          </div>
            </div>
          )}

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

         <div className="contbtnmenu">
            {isMenuOpen && (
              <img src={iconbarmenuclose} alt="" className="botmenuside"  onClick={toggleMenu}/>  
            )}

            {!isMenuOpen && (
              <img src={iconbarmenu} alt="" className="botmenuside"  onClick={toggleMenu} /> 
            )}
            </div>
          
        </div>
       

        {isCartOpen && (
        <CartModal  onClose={toggleCart} userIsAuthenticated={isAuthenticated} />
         )}

       {isMenuOpen && (
         <SideMenu/> 
        )}
      </div>
        
        
       

       <div className='containerfooter'>
        <div className='btnmenu' style={{ marginLeft: '30px' }} onClick={handleHomes}>
          <FontAwesomeIcon icon={faHome} fontSize='22px' color='#000' />
          
        </div>
     
        <div className='btnmenu' onClick={handleHistory}>
          <FontAwesomeIcon icon={faHistory} fontSize='22px'/>
       
        </div>
     
      
        <div className='btnmenu' onClick={toggleCart}>
          <FontAwesomeIcon icon={faShoppingCart}  fontSize='22px' color='#555'/>
          {contItems && (
          <div className="divcounter">
            {getItemCount()}
          </div>
          )}
        </div>
     
    
        <div className='btnmenu' style={{ marginRight: '30px' }}  onClick={handleMaps}>
          <FontAwesomeIcon icon={faUser} fontSize='22px' />
        
        </div>
     
    </div>
     
      </>
    );
};

export  { MenuAdm, MenuLogista, MenuClient, MenuOutSide};