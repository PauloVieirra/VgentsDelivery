import React, { useState } from 'react';
import './style.css';

const Store = () => {
  const products = [
    {
      id: 1,
      name: 'Delicious Burger',
      description: 'A mouthwatering burger with juicy patty and fresh veggies.',
      price: 9.99,
    },
    {
      id: 2,
      name: 'Gourmet Pizza',
      description: 'A gourmet pizza with rich toppings and cheesy goodness.',
      price: 12.99,
    },
    {
      id: 3,
      name: 'Tasty Sushi Rolls',
      description: 'Freshly prepared sushi rolls with a variety of flavors.',
      price: 14.99,
    },
    // Add more products here
  ];

  return (
    <div className="food-sales-container">
      <h1>Food Sales - Products</h1>

      <div className="product-list">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;
