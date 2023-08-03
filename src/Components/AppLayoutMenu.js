import React from 'react';
import { useAuth } from '../Context/AuthContext';
import AuthenticatedMenu from './AutheMenu';

const AppLayout = ({ children }) => {
  const { user } = useAuth();

  return (
    <div>
      {user && <AuthenticatedMenu />}
      {children}
    </div>
  );
};

export default AppLayout;
