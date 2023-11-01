import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import AppRoutesControl from './routes/PrivateRoute';
import { CartProvider } from './Context/CartContext';



const App = () => {
  return (
  
    <AuthProvider>
      <CartProvider>
        <AppRoutesControl />
      </CartProvider>
    </AuthProvider>  

  );
};

export default App;
