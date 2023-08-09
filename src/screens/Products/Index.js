import React from 'react';
import ProductForm from '../../Components/CadProdutos/cadProductForm';
import ProductList from '../../Components/CadProdutos/ProList';
import './style.css';

export default function Products() {
 return (
  

   <div className='contproduc'>
    <div>
       <ProductForm/>
    </div>
    <div>
        <ProductList/>
    </div>
    </div>
 
  );
}