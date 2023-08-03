import React, { createContext, useState, useContext,useEffect } from 'react';
import firebase from '../config/firebaseConfig';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verifica se há dados no localStorage ao inicializar o contexto
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setUser(parsedUserData);
    }
  }, []);

  const signInWithEmailAndPassword = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        const userData = { email: userCredential.user.email }; // Salve apenas os dados necessários no localStorage
        localStorage.setItem('userData', JSON.stringify(userData));
        return userCredential.user;
      })
      .catch((error) => {
        setUser(null);
        throw error;
      });
  };

  const signUpWithEmailAndPassword = async (email, password, name) => {
    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const { user } = userCredential;
      setUser(user);

      const { uid } = user;
      firebase.database().ref(`users/${uid}`).set({
        name,
        email,
      });
    } catch (error) {
      setUser(null);
      throw error;
    }
  };

  const signOut = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        throw error;
      });
  };

  const value = {
    user,
    isAuthenticated: !!user, // Verifica se o usuário está autenticado
    signInWithEmailAndPassword,
    signUpWithEmailAndPassword,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider.');
  }
  return context;
};

export { AuthProvider, useAuth };
