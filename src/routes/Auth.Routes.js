import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from '../screens/SignIn/Index';
import SignUp from '../screens/SignUp/Index';

const AuthRoutes = () => {
  return (
    
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/SignUp" element={<SignUp />} />
    </Routes>
    
  );
};

export default AuthRoutes;
