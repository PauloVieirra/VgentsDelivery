import React, { useState, useEffect} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LogoutButton from './Logout';
import LoginButton from './Login';
import { useAuth } from '../../src/Context/AuthContext';
import iconbarmenu from '../images/menuicon.png';
import iconbarmenuclose from '../images/closemenu.png';
import './styles.css';
import SignIn from '../screens/SignIn/Index';
import SignUp from '../screens/SignUp/Index';

const AuthenticatedMenu = ({ userType }) => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(null);
  const { user } = useAuth();
  const [userLocalStorage, setUserLocalStorage] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar a exibição do menu

  useEffect(() => {
    // Recuperar os dados do localStorage e definir o estado userLocalStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setUserLocalStorage(parsedUserData);
    }
  }, []); // Executado apenas uma vez após a montagem do componente

  const handleButtonClick = (Inicio) => {
    setActiveButton(Inicio);
  };

  const isButtonActive = (Inicio) => {
    return activeButton === Inicio ? 'btnmenu active' : 'btnmenu';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Inverter o estado do menu ao clicar no ícone do menu
  };

  const location = useLocation();

 

  const handleVoltar = () => {
    // Verifica se há uma página anterior no histórico do navegador
    if (location.state && location.state.from) {
      navigate(location.state.from);
    } else {
      // Verifica se há um estado definido e se é uma instância de SignIn ou SignUp
      if (location.state && location.state === SignIn) {
        navigate('/');
      } else if (location.state && location.state === SignUp) {
        navigate('SignIn');
      } else {
        // Caso contrário, vá para a página inicial
        navigate('/');
      }
    }
  };


  return (
    <>
      <div className='menumobile'>
        <div className='mobidata'>
        
        <>
        {user &&(
        <div>
          <p>Logo da loja</p>
        </div>
        )}
         {location.pathname !== '/' && !user && (
        <div  className='buttonmobile' onClick={handleVoltar}>
          Voltar
        </div>
        )}
       </>
        </div>
        <div className='contmobimenus'>
          {location.pathname !== '/SignIn' && location.pathname !== '/SignUp' &&  !user && <div className='buttonmobile'> <Link to="/SignIn" style={{textDecoration:'none', color:'#303030'}}>Login</Link></div>}
          {user && (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
             
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '60px', height: '60px' }}>
                <img src={iconbarmenu} alt="" className='iconmenu' onClick={toggleMenu} /> {/* Adicione um onClick para abrir/fechar o menu */}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Renderizar o menu lateral apenas se isMenuOpen for true */}
      {isMenuOpen && (
        <div className='menu-lateral'>
          <div style={{display:'flex', width:'100%',height:'160px', alignItems:'center', justifyContent:'center', paddingTop:'20px'}}>
          <img src={iconbarmenuclose} alt="" className='iconmenuclose' onClick={toggleMenu} />
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', paddingTop:'80px'}}>
                <div className='imguserinit'>foto</div>
                <div style={{ fontSize: '18px', fontWeight: '600', marginTop:'8px'}}>{localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).name}</div>
                <div style={{ fontSize: '14px'}}>{localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).email}</div>
              </div>
          </div>
          <div style={{display:'flex', position:'absolute', bottom:'20px', left:'20px'}}>
             <LogoutButton />
          </div>
        </div>
      )}
    <div className='contmenu'>
      <div className='contresolution'>
        {userType === 'adm' && (
          <div style={{display:'flex',flexDirection:'row',width:'100%', height:'100%'}}>
          <div style={{width:'18%'}}> 
            
          </div>
          <div  style={{
            display:'flex',
            flexDirection:'row',
            width:'64%',
            alignItems:'center',
            justifyContent:'center',
            
            }}>
            <div>
            <Link to="/">Início</Link>
            </div>
            <li>
              <Link to="/Products">Produto</Link>
            </li>
            <li>
              <Link to="/Store">Loja</Link>
            </li>
            <li>
              <Link to="/Cadastroloja">Cadastro</Link>
            </li>
            <li>
              <Link to="/Dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/Dashboard">A Vgents</Link>
            </li>
            
          </div>+
          </div>
        )}
        {userType === 'logista' && (
          <div style={{display:'flex',flexDirection:'row',width:'100%', height:'100%'}}>
          <div style={{width:'18%'}}> 
            
          </div>
          <div  style={{
            display:'flex',
            flexDirection:'row',
            width:'64%',
            alignItems:'center',
            justifyContent:'center',
            
            }}>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/Products">Produtos</Link>
            </li>
            <li>
              <Link to="/Pedidos">Pedidos</Link>
            </li>
            <div className='dataperson'>
            {localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).name}
            <p/>
            {localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).email}
          </div>
          </div></div>
        )}
        {userType === 'cliente' && (
            <div style={{display:'flex',flexDirection:'row',width:'100%', height:'100%'}}>
            <div style={{width:'18%'}}> 
              
            </div>
            <div  style={{
              display:'flex',
              flexDirection:'row',
              width:'64%',
              
              }}>
             
            <div>
              <Link to="/" className={isButtonActive('Inicio')} onClick={() => handleButtonClick('Inicio')}>
                Inicio
              </Link>
            </div>
            <div>
            <Link to="/MeusPedidos" className={isButtonActive('Historico')} onClick={() => handleButtonClick('Historico')}>
                Historico
              </Link>
            </div>
             
           
          </div>
          <div className='dataperson'>
            {user.email}
            <p/>
            {localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).name}
          </div>
          </div>
        )}
         
      </div>
    </div>
   </>
  
  );
};

export default AuthenticatedMenu;
