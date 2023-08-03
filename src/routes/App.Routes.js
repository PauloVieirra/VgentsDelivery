import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../screens/Home/Index';
import Products from '../screens/Products/Index';
import Pedidos from '../screens/Pedidos/Index';
import Conta from '../screens/Conta/Index';
import Suporte from '../screens/Suporte/Index';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Products" element={<Products />} />
      <Route path="/Pedidos" element={<Pedidos />} />
      <Route path="/Conta" element={<Conta />} />
      <Route path="/Suporte" element={<Suporte />} />
    </Routes>
  );
};

export default AppRoutes;