import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from '../screens/SignIn/Index';
import SignUp from '../screens/SignUp/Index';
import Store from '../screens/Stored/Index';
import TermsAndPrivacy from '../screens/Termos';
import About from '../screens/Sobre';
import Partners from '../screens/Parceiros';
import CartModal from '../screens/CartModal/Index';
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
        <Route path="/CartModal" element={<CartModal />} />
        <Route path="/Termos" element={<TermsAndPrivacy />} />
        <Route path="/Sobre" element={<About />} />
        <Route path="/Parceiros" element={<Partners />} />
      </Routes> 
      </AuthProvider>
    </div>
  );
};

export default AuthRoutes;

