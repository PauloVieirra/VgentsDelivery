import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './Logout';
import LoginButton from './Login';
import './styles.css';

const AuthenticatedMenu = ({ userType }) => {

  const [activeButton, setActiveButton] = useState(null);

   console.log(activeButton);

  const handleButtonClick = (Inicio) => {
    setActiveButton(Inicio);
  };

  const isButtonActive = (Inicio) => {

    return activeButton === Inicio ? 'btnmenu active' : 'btnmenu';
  };

  return (
    
    
    
    <div className='contmenu'>
      <div className='contresolution'>
        {userType === 'adm' && (
          <> 
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
            
          </>
        )}
        {userType === 'logista' && (
          <>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/Products">Produtos</Link>
            </li>
            <li>
              <Link to="#">Pedidos</Link>
            </li>
          </>
        )}
        {userType === 'cliente' && (
          <>
          <li>
          <Link to="/">Inicio</Link>
          </li>
          <li>
          <Link to="/MeusPedidos">Historico</Link>
          </li>
          <li>
              <Link to="#">A Vgents</Link>
          </li>
          
          <LogoutButton/>
          </>
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
              <Link to="#" className={isButtonActive('Inicio')} onClick={() => handleButtonClick('Inicio')}>
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
            
            </div>
       
            <div  style={{display:'flex', width:'18%',justifyContent:'center', alignItems:'center'}}>
            <LoginButton/>
          </div>
        </div>
        
      )}
      </div>
    </div>
   
  
  );
};

export default AuthenticatedMenu;
