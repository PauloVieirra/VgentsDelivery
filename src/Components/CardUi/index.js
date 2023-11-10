import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { styled, withStyles } from '@mui/material/styles';
import { Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useCart } from '../../Context/CartContext'; // Importe o contexto do carrinho
import './style.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;


  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PromotionCardPrimary = () => {
  const [expanded, setExpanded] = React.useState(false);
  const { productsProm } = useAuth();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const handleUserCardClick = (isUrl) => {
    if (isUrl) {
      console.log("Chave única do usuário:", isUrl);
      navigate(`/${isUrl}`);
    } else {
      console.log("Loja não encontrada");
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let slidesPerView = 2; // Valor padrão

  // Verificar a largura da tela e ajustar o número de slides visíveis
  if (window.innerWidth < 768) {
    slidesPerView = 1.8; // 1 slide visível em telas menores
  } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
    slidesPerView = 3.5; // 2 slides visíveis em telas médias
  } else if (window.innerWidth >= 1025) {
    slidesPerView = 5.8; // 3 slides visíveis em telas maiores
  }

  const addItemToCart = (item) => {
    addToCart(item);
  };

  return (
    <div className='contcards'>
      <Swiper
        spaceBetween={1} // Espaço entre os slides (cards)
        slidesPerView={slidesPerView} // Quantidade de slides visíveis por vez
        navigation={{ prevEl: '.paginationleft', nextEl: '.paginationright' }} // Controle de navegação personalizado
        loop={false} // Desativar o loop
      >
        {productsProm.map((card) => {
          if (card.category !== 'Happy Hour') {
            return (
              <SwiperSlide key={card.id} className='card-listn'>
                <Card
                  sx={{
                    width: '96%', // Largura de cada card
                    margin: '0 10px', // Espaço entre os cards
                    verticalAlign: 'top', // Alinha os cards no topo
                  }}
                >
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        <img src={card.imageUrl} alt="" />
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        {/* Ícone de configurações */}
                      </IconButton>
                    }
                    title={card.nameStore}
                    subheader={card.date}
                  />
                  <CardMedia component="img" height="194" image={card.imageUrl} alt={card.title} />
                  <CardContent>
                  <div style={{display:'flex', fontSize:'16px', fontWeight:'600'}}>
                      {card.title}
                    </div>
                    <div style={{display:'flex', fontSize:'14px',height:'100px', marginTop:'8px'}}>
                      {card.description}
                    </div>
                  </CardContent>
                  <CardActions disableSpacing className='spacecard'>
                    <IconButton variant="body2">
                      R$ {card.price}
                    </IconButton>
                    <IconButton aria-label="share">
                      {/* Ícone de compartilhamento */}
                    </IconButton>
                    <IconButton onClick={() => addItemToCart(card)}>
                      <FontAwesomeIcon icon={faCartPlus} fontSize='22px' color='#000' />
                    </IconButton>
                  </CardActions>
                 
                </Card>
              </SwiperSlide>
            );
          } else {
            return null;
          }
        })}
      </Swiper>
    </div>
  );
};


const PromotionCardSecondary = () => {
  const { productsProm } = useAuth();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const handleUserCardClick = (isUrl) => {
    if (isUrl) {
      console.log("Chave única do usuário:", isUrl);
      navigate(`/${isUrl}`);
    } else {
      console.log("Loja não encontrada");
    }
  };

  return (
    <div className='contcardssecond'>
      <Grid container spacing={2}>
        {productsProm.map((card) => {
          if (card.category === 'Happy Hour') {
            return (
              <Grid item key={card.id} xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    width: '96%',
                    margin: '0 10px',
                    verticalAlign: 'top',
                  }}
                >
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        <img src={card.imageUrl} alt="" />
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        {/* Ícone de configurações */}
                      </IconButton>
                    }
                    title={card.nameStore}
                    subheader={card.date}
                  />
                  <CardMedia component="img" height="194" image={card.imageUrl} alt={card.title} />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {card.description}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing className='spacecard'>
                    <IconButton variant="body2">
                      R$ {card.price}
                    </IconButton>
                    <IconButton aria-label="share">
                      {/* Ícone de compartilhamento */}
                    </IconButton>
                    <IconButton onClick={() => addToCart(card)}>
                      <FontAwesomeIcon icon={faCartPlus} fontSize='22px' color='#000' />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            );
          } else {
            return null;
          }
        })}
      </Grid>
    </div>
  );
};

const CardPrimary = () => {
  const { products } = useAuth();
  const { addToCart } = useCart();
  const Productsvariavel = [...products, ...products];

  let slidesPerView = 2;

  if (window.innerWidth < 768) {
    slidesPerView = 1.8;
  } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
    slidesPerView = 3.5;
  } else if (window.innerWidth >= 1025) {
    slidesPerView = 5.8;
  }

  const addItemToCart = (item) => {
    addToCart(item);
  };

  return (
    <div className='contcards'>
      <Swiper
        spaceBetween={1}
        slidesPerView={slidesPerView}
        navigation={{ prevEl: '.paginationleft', nextEl: '.paginationright' }}
        loop={false}
      >
        {Productsvariavel.map((card, index) => (
          <SwiperSlide key={`product-${card.id}-${index}`} className='card-listn'>
            <Card
              sx={{
                width: '96%',
                margin: '0 10px',
                verticalAlign: 'top',
              }}
            >
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    <img src={card.imageUrl} alt="" />
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    {/* Ícone de configurações */}
                  </IconButton>
                }
                title={card.nameStore}
                subheader={card.date}
              />
              <CardMedia component="img" height="194" image={card.imageUrl} alt={card.title} />
              <CardContent>
                <div style={{ display: 'flex', fontSize: '16px', fontWeight: '600' }}>
                  {card.title}
                </div>
                <div style={{ display: 'flex', fontSize: '14px', height: '100px', marginTop: '8px' }}>
                  {card.description}
                </div>
              </CardContent>
              <CardActions disableSpacing className='spacecard'>
                <IconButton variant="body2">
                  R$ {card.price}
                </IconButton>
                <IconButton aria-label="share">
                  {/* Ícone de compartilhamento */}
                </IconButton>
                <IconButton onClick={() => addItemToCart(card)}>
                  <FontAwesomeIcon icon={faCartPlus} fontSize='22px' color='#000' />
                </IconButton>
              </CardActions>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
  


export {PromotionCardPrimary,PromotionCardSecondary, CardPrimary }
