import React, { createContext, useState, useContext,useEffect } from 'react';
import firebase from '../config/firebaseConfig';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [updateStatus, setUpdateStatus] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showActiveItems, setShowActiveItems] = useState(false);
  const [showInactiveItems, setShowInactiveItems] = useState(true);
 
  


  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);



  useEffect(() => {
    // Verifica se há dados no localStorage ao inicializar o contexto
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setUser(parsedUserData);
    }
  }, []);

  const signInWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      const { user } = userCredential;
      setUser(user);
  
      const { uid } = user;
      const userRef = firebase.database().ref('users').child(uid);
  
      // Busque o tipo de usuário no Realtime Database e salve-o junto com as outras informações do usuário
      userRef.once('value', (snapshot) => {
        const userData = snapshot.val();
        if (userData && userData.ROLE && userData.ROLE.tipo) {
          const tipo = userData.ROLE.tipo;
          const userDataWithTipo = { ...userData, tipo };
  
          // Salvar os dados no Storage (localStorage)
          localStorage.setItem('userData', JSON.stringify(userDataWithTipo));
        }
      });
  
      return user;
    } catch (error) {
      setUser(null);
      throw error;
    }
  };
  
  

  const signUpWithEmailAndPassword = async (email, password, name, tipo, formulario) => {
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const { user } = userCredential;
      setUser(user);
  
      const { uid } = user;
      firebase.database().ref(`users/${uid}`).set({
        name,
        email,
        ROLE: {
          tipo: tipo,
        },
        formulario: formulario,
      });
  
      // Salvar os dados no Storage (localStorage)
      const userDataWithTipo = { name, email, tipo };
      localStorage.setItem('userData', JSON.stringify(userDataWithTipo));
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

  const createNewStore = async (storeName) => {
    try {
      if (!user) {
        throw new Error('Usuário não está logado. Faça o login primeiro.');
      }

      // Obter o ID do usuário logado
      const userId = user.uid;

      // Criar uma nova loja com um ID único
      const newStoreRef = firebase.database().ref('stores').push();
      const newStoreId = newStoreRef.key;

      // Salvar os dados da nova loja no Realtime Database
      await newStoreRef.set({
        storeId: newStoreId,
        userId: userId,
        storeName: storeName,
      });

      // Atualizar o estado do usuário com a nova loja
      setUser((prevUser) => ({
        ...prevUser,
        stores: {
          ...prevUser.stores,
          [newStoreId]: {
            storeId: newStoreId,
            storeName: storeName,
          },
        },
      }));

      return newStoreId;
    } catch (error) {
      throw error;
    }
  };

  const getProductsByUserId = (userId) => {
    const productsRef = firebase.database().ref(`users/${userId}/products`);
    const productsListener = productsRef.on('value', (snapshot) => {
      const productsData = snapshot.val();
      if (productsData) {
        const inactiveProducts = Object.values(productsData).filter(product => !product.isActive);
        setProducts(inactiveProducts);
        localStorage.setItem('products', JSON.stringify(inactiveProducts));
      } else {
        setProducts([]);
        localStorage.removeItem('products');
      }
    });

    // Unsubscribe the listener after setting the products in the state
    return () => {
      productsRef.off('value', productsListener);
    };
  };

  useEffect(() => {
    if (user) {
      const unsubscribeProducts = getProductsByUserId(user.uid);
      return () => {
        unsubscribeProducts();
      };
    }
  }, [user]);

  const value = {
    user,
    isAuthenticated: !!user,
    products,
    signInWithEmailAndPassword,
    signUpWithEmailAndPassword,
    signOut,
    createNewStore,
    getProductsByUserId,
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
