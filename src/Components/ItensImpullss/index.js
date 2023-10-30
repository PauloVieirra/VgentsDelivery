import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { userData, local  } from '../localStorageComponent';
import { useNavigate } from 'react-router-dom';
import RecipeReviewCard from '../CardUi';
import './style.css';

const CardList = () => {
  const navigate = useNavigate();
  const { user, productsProm } = useAuth();
  const [scrollPosition, setScrollPosition] = useState(0);

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

      <RecipeReviewCard/>
      

      <div className='contpromotittle'>
        <div style={{ marginLeft: '20px', marginTop:'16px', fontSize: '18px', fontStyle: 'normal', fontWeight: 600 }}>Happy Hour</div>
      </div>
      <div className="card-list-vert">
        {productsProm.map((card) => {
          if (card.category === 'Happy Hour') {
            return (
              <div key={card.id} className="card-vert" onClick={() => handleUserCardClick(card.isUrl)}>
                <div className='divimgout-vert'>
                  <img src={card.imageUrl} alt="" className='imgprom'/>
                </div>
                <div style={{ marginTop: '8px',margin:'6px' }}>
                <div style={{ fontSize: '16px', backgroundColor:'#fff', fontWeight: 600 }}>{card.title}</div>
                <div style={{
                    display: 'fixed',
                    flexDirection: 'row',
                    fontSize: '15px',
                    fontStyle: 'normal',
                    fontWeight: 200,
                    marginTop:'4px',
                    }}>
                   {card.description}
                  </div>
                  <div className='coniconcard' style={{display:'flex',width:'100%',alignItems:'flex-end',fontSize:'22px', fontWeight:'600'}}>
                    {card.price}
                  </div>
                   
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
         <div className='conticoncardsdiv'/>
      </div>
    </>
  );
};

export default CardList;
