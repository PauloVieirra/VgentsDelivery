import React from 'react';
import AppLayout from '../../Components/AppLayoutMenu';
import ProductForm from '../../Components/CadProdutos/cadProductForm';
import ProductList from '../../Components/CadProdutos/ProList';
import './style.css';

export default function Products() {
 return (
  
  <AppLayout>
   <div className='contproduc'>
    <div className='teste'>
    
     <ProductForm/>
     <ProductList/>



    </div>
    </div>
   </AppLayout>
  );
}