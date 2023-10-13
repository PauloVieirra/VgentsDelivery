import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHistory, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons'; // Importe os ícones necessários
import './style.css';

export default function FooterNavigation() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const handleHome = () => {
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
    <div className='containerfooter'>
        <div className='btnmenu' style={{ marginLeft: '30px' }} onClick={handleHome}>
          <FontAwesomeIcon icon={faHome} fontSize='22px' color='#000' />
          
        </div>
     
        <div className='btnmenu' onClick={handleHistory}>
          <FontAwesomeIcon icon={faHistory} fontSize='22px'/>
       
        </div>
     
      
        <div className='btnmenu' onClick={handleCart}>
          <FontAwesomeIcon icon={faShoppingCart}  fontSize='22px' color='#000'/>
        
        </div>
     
    
        <div className='btnmenu' style={{ marginRight: '30px' }}  onClick={handleMaps}>
          <FontAwesomeIcon icon={faUser} fontSize='22px' />
        
        </div>
     
    </div>
  );
}
