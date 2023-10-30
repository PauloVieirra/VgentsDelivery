import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus} from '@fortawesome/free-solid-svg-icons'; 
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Swiper, SwiperSlide } from 'swiper/react';
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

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);
  const { user, productsProm } = useAuth();
  const navigate = useNavigate();

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
  } else if (window.innerWidth >= 1025)  {
    slidesPerView = 5.8; // 3 slides visíveis em telas maiores
  }

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
                    title={card.title}
                    subheader={card.date}
                  />
                  <CardMedia component="img" height="194" image={card.imageUrl} alt={card.title} />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {card.description}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing className='spacecard'>
                    <IconButton variant="body2" >
                    R$ {card.price}
                    </IconButton>
                    <IconButton aria-label="share" >
                      
                    </IconButton>
                    
                    <IconButton>
                    <FontAwesomeIcon icon={faCartPlus}  fontSize='22px' color='#000'/>
                    </IconButton>
                  </CardActions>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    {/* Conteúdo expandido */}
                  </Collapse>
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
}
