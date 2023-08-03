import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../screens/Home/Index';
import Products from '../screens/Products/Index';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Products" element={<Products />} />
      
    </Routes>
  );
};

export default AppRoutes;