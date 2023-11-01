import React,{useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';



export default function MeusPedidos() {
  const location = useLocation();
  const { cartItems } = location.state || { cartItems: [] };
  const { products, getProductsByUserId, isAuthenticated, openCartModal } = useAuth();


  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);
 return (
  <div className='clienthome'>
    
   
  </div>
  );
}