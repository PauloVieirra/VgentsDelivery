import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import AppRoutesControl from './routes/PrivateRoute';
import AuthenticatedMenu from './Components/AutheMenu';

const App = () => {
  return (
  
    <AuthProvider>
     
        <AppRoutesControl />
    </AuthProvider>   

  );
};

export default App;
