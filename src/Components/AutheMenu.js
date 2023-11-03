import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LogoutButton from './Logout';
import { useAuth } from '../../src/Context/AuthContext';
import { userData, local, userimage } from './localStorageComponent';
import iconbarmenu from '../images/menuicon.png';
import iconbarmenuclose from '../images/closemenu.png';
import SignIn from '../screens/SignIn/Index';
import SignUp from '../screens/SignUp/Index';
import { MenuClient, MenuOutSide, MenuLogista } from './Menus';
import './styles.css';



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
  }, []); 

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

  const style = {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 9000,
    top: 0,
    marginTop: '6px',
    width: '100%',
    height: 'auto',
    backgroundColor: '#ffffff00',
  };

  return (
    <>
      <div className={user ? 'menumobile' : 'style'} style={user ? null : style}>
        <div className='mobidata'>
          <>
          <div className='contlogopro'>
       
       </div>
      {user && userType === 'cliente' && (
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '16px' }}>
        </div>
      )}

      {user && userType === 'logista' && (
        <div>
         <p> logo da loja </p>
        </div>
      )}

      {location.pathname === '/' && !user && (
         <div className='buttonmobile' onClick={handleVoltar}></div>
      )}
    </>
      </div>



      <div className='contmobimenus123'>
          {location.pathname !== '/SignIn' && location.pathname !== '/SignUp' && !user && (
            <div className='buttonmobile'>
              {' '}
              <Link to="/SignIn" style={{ textDecoration: 'none', color: '#303030' }}></Link>
            </div>
          )}
          {user && (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              
            </div>
          )}
      </div>
    </div>
    {userType === 'logista'  &&  (
        <MenuLogista/>
    )}
    {userType === 'cliente' &&  (
        <MenuClient/>
    )}
    {!userType  &&  (
        <MenuOutSide/>
    )}
      
      {isMenuOpen && (
        <div className='menu-lateral'>
          <div
            style={{
              display: 'flex',
              width: '100%',
              height: '160px',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '20px',
            }}
          >
           
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width:'100%',
                height: '300px',
                alignItems: 'center',
              }}
            >
              <div className='contimgperson'>
              <img src={userimage} className='imguserinit'/>
              </div>
              <div style={{width:'100%', height:'80px'}}/>
              <div style={{  fontWeight: '600', fontSize:'20px'}}>
                {localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).name}
              </div>
              <div style={{ fontSize: '16px' }}>{localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).email}</div>
            </div>
          </div>
          <div style={{ display: 'flex', position: 'absolute', bottom: '20px', left: '20px' }}>
            <LogoutButton />12
          </div>
        </div>
      )}

    

    </>
  );
};

export default AuthenticatedMenu;
