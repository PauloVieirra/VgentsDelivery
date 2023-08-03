import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import AppRoutesControl from './routes/PrivateRoute';

const App = () => {
  return (
   
    <AuthProvider>
      <div>
        <AppRoutesControl />
      </div>
    </AuthProvider>

  );
};

export default App;
