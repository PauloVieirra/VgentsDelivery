import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from '../screens/SignIn/Index';
import SignUp from '../screens/SignUp/Index';
import Store from '../screens/Stored/Index';
import { AuthProvider } from '../Context/AuthContext';

import AuthenticatedMenu from '../Components/AutheMenu';

const AuthRoutes = () => {
  return (
    <div>
      <AuthProvider>
      <AuthenticatedMenu />
      <Routes>
        <Route path="/" element={<Store />} />
        <Route path="/:lojistaId" element={<Store />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />

        
       
      </Routes>
      </AuthProvider>
    </div>
  );
};

export default AuthRoutes;

