import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
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
      <div className='contpromotittle' style={{ paddingTop: '20px' }}>
        <div style={{ marginLeft: '20px', fontSize: '18px', fontStyle: 'normal', fontWeight: 600 }}>
          Combo Promo
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
                <div style={{ marginTop: '8px' }}>
                  <div style={{ fontSize: '16px' }}>{card.title}</div>
                  <div style={{ display: 'flex', flexDirection: 'row', fontSize: '16px', fontStyle: 'normal', fontWeight: 600 }}>
                    {card.price}
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
        <div style={{ marginLeft: '20px', fontSize: '18px', fontStyle: 'normal', fontWeight: 600 }}>Happy Hour</div>
      </div>
      <div className="card-list-vert">
        {productsProm.map((card) => {
          if (card.category === 'Happy Hour') {
            return (
              <div key={card.id} className="card-vert" onClick={() => handleUserCardClick(card.isUrl)}>
                <div className='divimgout-vert'>
                  <img src={card.imageUrl} alt="" className='imgprom'/>
                </div>
                <div style={{ marginTop: '8px' }}>
                  <div style={{ fontSize: '16px' }}>{card.title}</div>
                  <div style={{ fontSize: '16px' }}>{card.id}</div>
                  <div style={{ fontSize: '16px' }}> {card.price}</div>
                  <p>{card.content}</p>
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </>
  );
};

export default CardList;
