import React, { useState, useContext } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { userData, local  } from '../localStorageComponent';
import { useNavigate } from 'react-router-dom';
import {PromotionCardPrimary,PromotionCardSecondary} from '../CardUi';
import './style.css';

const CardList = () => {
  const navigate = useNavigate();
  const { user, productsProm } = useAuth();
 
  

  const handleUserCardClick = (isUrl) => {
    if (isUrl) {
      console.log("Chave única do usuário:", isUrl);
      navigate(`/${isUrl}`);
    } else {
      console.log("Loja não encontrada");
    }
  };

 

  return (
    <>
      <div className='contpromotittle' style={{ paddingTop: '30px' }}>
        <div className='tittlepromo'>
        {user && (
          <div style={{display:'flex',flexDirection:'row'}}> Ofertas em <div style={{color:'#45b745'}}> :  {local}</div>  </div> 
        )} 
        {!user && (
          <div style={{display:'flex',flexDirection:'row'}}> Ofertas </div> 
        )} 
        </div>
      </div>

      <PromotionCardPrimary/>
      

      <div className='contpromotittle'>
        <div style={{ marginLeft: '20px', marginTop:'16px', fontSize: '18px', fontStyle: 'normal', fontWeight: 600 }}>Happy Hour</div>
      </div>
      <PromotionCardSecondary/>
    </>
  );
};

export default CardList;
