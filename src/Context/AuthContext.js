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
  const [userOrders, setUserOrders] = useState([]);
 


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

  const signInWithEmailAndPassword = async (email, password, cartItems) => {
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
  
      if (cartItems.length === 0) {
        // Caso não haja itens, retornar o usuário
        return user;
      } else {
        // Caso haja itens, retornar uma flag indicando que deve ser redirecionado para a página de confirmação
        return { user, redirectToConfirmation: true };
      }
    } catch (error) {
      setUser(null);
      throw error;
    }
  };
  
  
  const signUpWithEmailAndPassword = async (email, password, name, tipo, formulario, cartItems) => {
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
  
      if (tipo !== 'vazio') {
        // Salvar os dados no Storage (localStorage) apenas se não for um "logista"
        const userDataWithTipo = { name, email, tipo };
        localStorage.setItem('userData', JSON.stringify(userDataWithTipo));
        
      }
  
      if (cartItems.length === 0) {
        // Caso não haja itens, retornar o usuário
        return user;
      } else {
        // Caso haja itens, retornar uma flag indicando que deve ser redirecionado para a página de confirmação
        return { user, redirectToConfirmation: true };
      }
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

  const getStoreIdByProductId = async (productId) => {
    try {
      const productRef = firebase.database().ref(`products/${productId}`);
      const snapshot = await productRef.once('value');
      const productData = snapshot.val();
      if (productData) {
        return productData.storeId;
      }
      return null;
    } catch (error) {
      throw error;
    }
  };

  const createOrder = async (userId, orderDetails) => {
    try {
      const ordersRef = firebase.database().ref(`users/${userId}/orders`);
      const newOrderRef = ordersRef.push();
  
      // Gere uma chave aleatória única para o pedido
      const orderId = newOrderRef.key;
  
      // Salvar os detalhes do pedido no Realtime Database
      await newOrderRef.set({
        orderId: orderId,
        ...orderDetails,
      });
  
      const order = {
        orderId: orderId,
        ...orderDetails,
      };
  
      return order;
    } catch (error) {
      throw error;
    }
  };

  const saveFormToFirebase = (complemento) => {
    const userUid = user.uid;
    const userRef = firebase.database().ref(`users/${userUid}`);

    // Salvar os dados do complemento
    userRef.child('complemento').set(complemento)
    .then(() => {
      console.log('Dados de complemento gravados com sucesso!');

      // Salvar os dados no localStorage
      localStorage.setItem('complementoData', JSON.stringify(complemento));
      
      // Atualizar a propriedade 'formulario' para true
      userRef.update({
        formulario: true
      })
      .then(() => {
        console.log('Propriedade "formulario" atualizada para true.');
      })
      .catch((error) => {
        console.error('Erro ao atualizar a propriedade "formulario":', error);
      });
    })
    .catch((error) => {
      console.error('Erro ao gravar dados de complemento:', error);
    });
};

const saveLogistaFormToFirebase = (complemento) => {
  const userUid = user.uid;
  const userRef = firebase.database().ref(`users/${userUid}`);

  // Salvar os dados do complemento
  userRef.child('complemento').set(complemento)
  .then(() => {
    console.log('Dados de complemento gravados com sucesso!');

    // Salvar os dados no localStorage
    localStorage.setItem('complementoData', JSON.stringify(complemento));
    
    // Atualizar a propriedade 'formulario' para true
    userRef.update({
      formulario: true
    })
    .then(() => {
      console.log('Propriedade "formulario" atualizada para true.');
    })
    .catch((error) => {
      console.error('Erro ao atualizar a propriedade "formulario":', error);
    });
  })
  .catch((error) => {
    console.error('Erro ao gravar dados de complemento:', error);
  });
};

const fetchUserOrders = async (uid) => {
  try {
    const ordersRef = firebase.database().ref('orders');
    const userOrdersSnapshot = await ordersRef.child(uid).once('value');

    if (userOrdersSnapshot.exists()) {
      const ordersData = userOrdersSnapshot.val();
      const ordersArray = Object.values(ordersData);
      setUserOrders(ordersArray);
    } else {
      setUserOrders([]);
    }
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
  }
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
    userOrders,
    fetchUserOrders,
    signInWithEmailAndPassword,
    signUpWithEmailAndPassword,
    signOut,
    createNewStore,
    getProductsByUserId,
    getStoreIdByProductId,
    createOrder,
    saveFormToFirebase,
    saveLogistaFormToFirebase,
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
