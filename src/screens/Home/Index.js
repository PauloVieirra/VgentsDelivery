import React from 'react';
import LogoutButton from '../../Components/Logout';
import './style.css';
import { useAuth } from '../../Context/AuthContext';

const Home = () => {
  const { user } = useAuth();
  
  return (
   
    <div className='container'>
     <LogoutButton/>
      
     </div>
  
  );
};

export default Home;
