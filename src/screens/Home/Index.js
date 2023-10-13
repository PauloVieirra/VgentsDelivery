import React from 'react';
import LogoutButton from '../../Components/Logout';
import MapContainer from '../../Components/Maps';
import './style.css';
import { useAuth } from '../../Context/AuthContext';

const Home = () => {
  const { user } = useAuth();
   
  return (
   
    <div className='container'>
     <div className='contmaptop'>12345</div>
      <MapContainer/>
      <div className='contmapbootpm'>12345</div>
     </div>
  
  );
};

export default Home;
