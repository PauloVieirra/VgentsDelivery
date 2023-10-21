import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import './style.css';

export default function Banners() {
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
    <div className='contimpon'>

      <div className='contintotitle'>
        <div>
        <div className='conttittle'>Explorar sabores</div>
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
  );
}
