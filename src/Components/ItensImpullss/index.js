import React from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './style.css';




const CardList = () => {
const navigate = useNavigate();
const { user, productsProm } = useAuth();


  const cardDataHoriz = [
    { id: 1, title: 'Card 1', content: 'Conteúdo do Card 1' },
    { id: 2, title: 'Card 2', content: 'Conteúdo do Card 2' },
    { id: 3, title: 'Card 3', content: 'Conteúdo do Card 3' },
    { id: 4, title: 'Card 4', content: 'Conteúdo do Card 4' },
    { id: 5, title: 'Card 5', content: 'Conteúdo do Card 5' },
  ];

  const handleUserCardClick = (isUrl) => {
    if (isUrl) {
      console.log("Chave única do usuário:", isUrl);
      navigate(`/${isUrl}`);
    } else {
      console.log("Loja não encontrada");
      // Ou você pode definir um estado para exibir uma mensagem na interface do usuário
    }
  };

  return (
    <>
    <div className='contpromotittle' style={{paddingTop:'20px'}}>
      <div style={{marginLeft:'20px', fontSize:'18px', fontStyle:'normal', fontWeight:600}}>
        Combo Promo
      </div>
    </div>
    <div className="card-list">
    {productsProm.map((card) => {
  // Adicione a verificação da categoria aqui
  if (card.category !== 'Happy Hour') {
    return (
      
  <div key={card.id} className='card' onClick={() => handleUserCardClick(card.isUrl)}>
    <div className='divimgout'>
    <img src={card.imageUrl} alt="" className='imgprom'/>
    </div>
    <div style={{marginTop:'8px'}}>
     <div style={{fontSize:'16px'}}>{card.title}</div>
     <div style={{display:'flex',flexDirection:'row',fontSize:'16px', fontSize:'16px', fontStyle:'normal', fontWeight:600}}>
      {card.price}</div>
    
    </div>
  </div>

);
} else {
  return null; // Ignora os cards de outras categorias
}
})}
    </div>
    <div className='contpromotittle'><div style={{marginLeft:'20px', fontSize:'18px', fontStyle:'normal', fontWeight:600}}>Happy Hour</div></div>
    <div className="card-list-vert">
    {productsProm.map((card) => {
  // Adicione a verificação da categoria aqui
  if (card.category === 'Happy Hour') {
    return (
      <div key={card.id} className="card-vert"  onClick={() => handleUserCardClick(card.isUrl)}>
        <div className='divimgout-vert'>
          <img src={card.imageUrl} alt="" className='imgprom'/>
        </div>
        <div style={{marginTop:'8px'}}>
          <div style={{fontSize:'16px'}}>{card.title}</div>
          <div style={{fontSize:'16px'}}>{card.id}</div>
          <div style={{fontSize:'16px'}}> {card.price}</div>
          <p>{card.content}</p>
        </div>
      </div>
    );
  } else {
    return null; // Ignora os cards de outras categorias
  }
})}
    </div>
    </>
  );
};

export default CardList;
