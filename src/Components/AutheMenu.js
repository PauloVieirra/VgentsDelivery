import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './Logout';
import LoginButton from './Login';
import { useAuth } from '../../src/Context/AuthContext';
import './styles.css';



const AuthenticatedMenu = ({ userType }) => {

  const [activeButton, setActiveButton] = useState(null);

  const { user } = useAuth();

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
            {user.email}
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
   
  
  );
};

export default AuthenticatedMenu;
