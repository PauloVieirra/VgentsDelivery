import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './Logout';
import LoginButton from './Login';
import { useAuth } from '../../src/Context/AuthContext';
import iconbarmenu from '../images/menuicon.png';
import iconbarmenuclose from '../images/closemenu.png';
import './styles.css';

const AuthenticatedMenu = ({ userType }) => {
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

  return (
    <>
      <div className='menumobile'>
        <div className='mobidata'>
          <div style={{ paddingLeft: '16px' }}>Logo da loja</div>
        </div>
        <div className='contmobimenus'>
          {!user && <button className='buttonmobile'> <Link to="/SignIn" style={{textDecoration:'none', color:'#fff'}}>Login</Link></button>}
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
         {!userType && (
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
              <Link to="/" className={isButtonActive('Inicio')} onClick={() => handleButtonClick('Inicio')}>
                Inicio
              </Link>
            </div>
            <div>
              <Link to="#" className={isButtonActive('Sobre')} onClick={() => handleButtonClick('Sobre')}>
                Sobre
              </Link>
            </div>
            <div>
              <Link to="#" className={isButtonActive('Assinar')} onClick={() => handleButtonClick('Assinar')}>
                Assinar
              </Link>
            </div>
            <div>
              <Link to="#" className={isButtonActive('SAC')} onClick={() => handleButtonClick('SAC')}>
                SAC
              </Link>
            </div>

             <div  style={{
              display:'flex', 
              width:'100%',
              height:'100%',
              justifyContent:'flex-end', 
              alignItems:'center', 
              paddingRight:'30px',
              }}>
               <LoginButton/>
             </div>
            
            </div>
       
           
        </div>
        
      )}
      </div>
    </div>
   </>
  
  );
};

export default AuthenticatedMenu;
