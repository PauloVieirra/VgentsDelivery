import React from 'react';
import { IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/material/';


const CustomBtnGoBack = () => {
  return (
    <button>
    <div>Voltar</div>
    </button>
  );
};

const CustomBtnPrimary = () => {
  return (
    <button>
    <div>Teste</div>
    </button>
  );
};

const CustomBtnCartAdd = () => {
  return(
    <div>
      <IconButton color="primary" aria-label="add to shopping cart">
    <AddShoppingCartIcon />
    </IconButton>
    </div>
    
  );
}


export default {CustomBtnGoBack, CustomBtnPrimary,CustomBtnCartAdd};
