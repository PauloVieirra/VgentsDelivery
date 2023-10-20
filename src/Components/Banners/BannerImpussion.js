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
      <div className='conttittle'>Explorar sabores</div>
      <div style={{ width: '100%', paddingLeft: '20px', fontSize: '12px', fontWeight: '200', color: "#151561" }}>
        FoodTrucks - Quiosques - Restaurantes.
      </div>
      <div className='contbanner'>
        <div className='imgbanner'>
          {user ? (
            // Se houver um usuário, mostre o primeiro botão
            <button className='buttonprimaryin' onClick={handleMaps}>
              Mostrar locais
            </button>
          ) : (
            // Se não houver usuário, mostre o segundo botão
            <button className='buttonprimaryin' onClick={openLearningMore}>
              Saber Mais
            </button>
          )}
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
