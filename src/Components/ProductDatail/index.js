import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import './style.css';

const ProductDetails = ({ productData, onClose }) => {
  const { title, description, price, imageUrl } = productData;

  return (
    <Card className='card-modal-details'>
      {/* Metade superior: Imagem */}
      <CardMedia
        component="img"
        alt={title}
        height="200"
        image={imageUrl}
      />

      {/* Metade inferior: Dados do Produto */}
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="h6" color="text.primary">
          Preço: R$ {price}
        </Typography>
      </CardContent>

      {/* Barra inferior: Botões de ação */}
      <CardActions>
        <Button size="small" color="primary" >
          Adicionar ao Carrinho
        </Button>
        <Button size="small" color="primary" >
          Curtir
        </Button>
        <Button size="small" color="primary" >
          Compartilhar
        </Button>
        <Button size="small" color="primary" onClick={onClose}>
          Fechar
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductDetails;
