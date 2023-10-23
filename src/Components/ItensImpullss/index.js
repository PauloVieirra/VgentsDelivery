import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { userData, local  } from '../localStorageComponent';
import { useNavigate } from 'react-router-dom';
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

  const handleScroll = (direction) => {
    const cardList = document.getElementById('horizontalCardList');
    const cardWidth = 220; // A largura de cada card, ajuste conforme necessário
    const maxScroll = (productsProm.length - 1) * cardWidth;

    if (direction === 'left') {
      setScrollPosition((prevPosition) => Math.max(prevPosition - cardWidth, 0));
    } else {
      setScrollPosition((prevPosition) => Math.min(prevPosition + cardWidth, maxScroll));
    }

    // Use `scrollLeft` para rolar a lista horizontalmente
    if (cardList) {
      cardList.scrollLeft = scrollPosition;
    }
  };

  return (
    <>
      <div className='contpromotittle' style={{ paddingTop: '30px' }}>
        <div style={{ marginBottom:'10px',marginLeft: '20px', fontSize: '18px', fontStyle: 'normal', fontWeight: 600 }}>
        {user && (
          <div style={{display:'flex',flexDirection:'row'}}> Ofertas em <div style={{color:'#45b745'}}> :  {local}</div>  </div> 
        )} 
        {!user && (
          <div style={{display:'flex',flexDirection:'row'}}> Ofertas </div> 
        )} 
        </div>
      </div>
      <div className="card-list" id="horizontalCardList">
        {productsProm.map((card) => {
          if (card.category !== 'Happy Hour') {
            return (
              <div key={card.id} className='card' onClick={() => handleUserCardClick(card.isUrl)}>
                <div className='divimgout'>
                  <img src={card.imageUrl} alt="" className='imgprom'/>
                </div>
                <div style={{ margin: '8px' }}>
                  <div style={{ fontSize: '16px', backgroundColor:'#fff', fontWeight: 600, width:'100%' }}>{card.title}</div>
                  <div className='divdescriptionspace'>
                   {card.description}
                  </div>
                  <div className='conticoncardsdiv'>
                    <div className='coniconcard'>
                        
                    </div>
                    <div className='coniconcard'>
                       
                    </div>
                    <div className='coniconcard' style={{fontSize:'22px', fontWeight:'600'}}>
                    {card.price}
                    </div>
                    
                  </div>  
                   
                </div>
                
              </div>
            );
          } else {
            return null;
          }
        })}
       
        
      </div>
       <div className='navscrolll'>
        <button onClick={() => handleScroll('left')} className='btnscrollleft'>{"<"}</button>
        <button onClick={() => handleScroll('right')} className='btnscrollrigth'>{">"}</button>
      </div>

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
