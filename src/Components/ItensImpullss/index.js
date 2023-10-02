import React from 'react';
import { useAuth } from '../../Context/AuthContext';
import './style.css';




const CardList = () => {
const { user, productsProm } = useAuth();


  const cardDataHoriz = [
    { id: 1, title: 'Card 1', content: 'Conteúdo do Card 1' },
    { id: 2, title: 'Card 2', content: 'Conteúdo do Card 2' },
    { id: 3, title: 'Card 3', content: 'Conteúdo do Card 3' },
    { id: 4, title: 'Card 4', content: 'Conteúdo do Card 4' },
    { id: 5, title: 'Card 5', content: 'Conteúdo do Card 5' },
  ];


  return (
    <>
    <div className='contpromotittle' style={{paddingTop:'20px'}}>
      <div style={{marginLeft:'20px'}}>
        Combo Promo
      </div>
    </div>
    <div className="card-list">
    {productsProm.map(card => (
  <div key={card.id} className='card'>
    <img src={card.imageUrl} alt="" className='imgprom'/>
    <p>Title: {card.title}</p>
    <p>Description: {card.description}</p>
    <p>Price: {card.price}</p>
  </div>
   ))}
    </div>
    <div className='contpromotittle'><div style={{marginLeft:'20px'}}>Happy Hour</div></div>
    <div className="card-list-vert">
      {cardDataHoriz.map((card) => (
        <div key={card.id} className="card-vert">
          <h3>{card.title}</h3>
          <p>{card.content}</p>
        </div>
      ))}
    </div>
    </>
  );
};

export default CardList;
