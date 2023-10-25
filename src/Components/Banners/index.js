import React, { useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const BannersMobile = () => {
  const [isLearningMore, setIsLearningMore] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleMaps = () => {
    navigate('/Maps');
  };

  const openLearningMore = () => {
    setIsLearningMore(true);
  };

  const closeLearningMore = () => {
    setIsLearningMore(false);
  };

  return (
    <>
    <div className='contimpon'>

      <div className='contintotitle'>
        <div>
        <div className='tittlebanner'>Explorar sabores</div>
        <div style={{ width: '100%',fontSize: '12px', fontWeight: '200', color: "#151561", marginBottom:'10px' }}>
         FoodTrucks - Quiosques - Restaurantes.
        </div> 
        </div>
        <div className='contbrnexplore' >
        {user ? (
            // Se houver um usuário, mostre o primeiro botão
            <button className='buttonexplore' onClick={handleMaps}>
              Mostrar locais
            </button>
          ) : (
            // Se não houver usuário, mostre o segundo botão
            <button className='buttonexplore' onClick={openLearningMore}>
              Saber Mais
            </button>
          )}
        </div>
      </div>
      <div className='contbanner'>
        <div className='imgbanner'>
         
        </div>
      </div>
      {isLearningMore && (
        <div className='modallearnigmore'>
          <div className='contlearnigmore'>
              Ola, sou um modal
              <div onClick={closeLearningMore}>Fechar </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

const BannerDesktop = () => {

const navigate = useNavigate();
const { user } = useAuth();

  const handleLogin = () => {
    navigate('/Signin');
  };

  const handleMaps = () => {
    navigate('/Maps');
  };
 
  return (
    <>
    {!user && (
     <div className="banner-desktop">
      <div className="banner-content">
      <h1>Descubra os sabores da sua vizinhaça</h1>
      <p>FoodTrucks - Quiosques - Bistros - Restaurantes.</p>
      <button className='buttonexplore' onClick={handleLogin}> Entre ou Crie uma conta </button>
      </div>
    </div> 
    )}
     {user && (
     <div className="banner-desktop">
     
     <div className="banner-content">
     <h1>Descubra os sabores da sua vizinhaça</h1>
     <p>FoodTrucks - Quiosques - Bistros - Restaurantes.</p>
     <button className='buttonexplore' onClick={handleMaps}> Explorar </button>
     </div>
   </div> 
    )}
   
    </>
  );
}


export { BannerDesktop, BannersMobile };
