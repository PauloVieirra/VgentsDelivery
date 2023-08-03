import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppRoutes from './App.Routes';
import AuthRoutes from './Auth.Routes';
import { useAuth } from '../Context/AuthContext';
import AuthenticatedMenu from '../Components/AutheMenu';


const AppRoutesControl = () => {
    const { isAuthenticated } = useAuth();
  return (
   
    <Router> 
     
      <Routes>
        <Route path="/*" element={isAuthenticated ? <AppRoutes /> : <AuthRoutes />} />
    
      </Routes>
      
    </Router>
  );
};

export default AppRoutesControl;






