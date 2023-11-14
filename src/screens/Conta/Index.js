import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton } from '@mui/material';
import { red } from '@mui/material/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../Context/AuthContext';
import { CardPrimary } from '../../Components/CardUi';

import './style.css';

export default function WebappLoja() {
  const { uid } = useParams();
  const [logistaData, setLogistaData] = useState(null);
  const [productsData, setProductsData] = useState([]);
  const { getProductsByUserId } = useAuth();
  const logistaUid = uid;
   
  useEffect(() => {
    // Tente obter o usuário do Local Storage usando o UID da URL
    const storedUsers = JSON.parse(localStorage.getItem('logistaUsers')) || [];
    const storedUser = storedUsers.find(user => user.url === uid);
    setLogistaData(storedUser);
  }, [uid]);


   useEffect(() => {
    const unsubscribe = getProductsByUserId(uid);
    return () => {
      unsubscribe();
    };
  }, [getProductsByUserId, uid]);

  const addItemToCart = (product) => {
    // Implemente a lógica para adicionar o item ao carrinho
    console.log('Adicionar ao carrinho:', product);
  };

  let slidesPerView = 2;

  if (window.innerWidth < 768) {
    slidesPerView = 1.8;
  } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
    slidesPerView = 3.5;
  } else if (window.innerWidth >= 1025) {
    slidesPerView = 5.8;
  }

  return (
    <div className='webapp-loja-container'>
      
      {logistaData ? (
        <>
        <div className='header'>
         </div>
           <div className='banner'>
             <div className='menu'>
               <div className='webapp-banner-search'>
                <input type="text" placeholder="Pesquisar..." />
                <button type="submit">Buscar</button>
              </div>
            </div>
            <div className='store-info'>
              <div className='webapp-nome'>
                {logistaData.name}
              </div>
              <div className='webapp-dados'>
                {logistaData.email}
                {logistaData.telefoneContato}
              </div>
            </div>
            <div className='webapp-banner'>
              <img src={logistaData.complemento.bannerUrl} alt=""/>
            </div>
          </div>

          <div className='divtitle'>
            Mais pedidos
          </div>
           <div>
            <CardPrimary/>
           </div>
          <div className='divtitle'>
            Haaapy Hours
          </div>
          <div>
            <CardPrimary/>
           </div>
        </>
      ) : (
        <p>Logista não encontrado ou nenhum produto disponível</p>
      )}
    </div>
  );
}
