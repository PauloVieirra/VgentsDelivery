import React, { useEffect, useState } from 'react';
import firebase from '../../config/firebaseConfig';
import { useAuth } from '../../Context/AuthContext';
import './styles.css';

const ProductList = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);

    
    useEffect(() => {
      if (user) {
        const productsRef = firebase.database().ref(`users/${user.uid}/products`);
        productsRef.on('value', (snapshot) => {
          const productsData = snapshot.val();
          if (productsData) {
            const productsList = Object.values(productsData);
            setProducts(productsList);
           
          }
        });
      }
    }, [user]);

  return (
    <div className='contcard'>
      <h2>Produtos Cadastrados</h2>
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.imageUrl} alt={product.title} className='contimg'/> 
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p>Preço: R$ {product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
