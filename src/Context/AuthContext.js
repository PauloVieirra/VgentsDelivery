import React, { createContext, useState, useContext,useEffect } from 'react';
import { identidade, userData } from '../Components/localStorageComponent';
import firebase from '../config/firebaseConfig';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [updateStatus, setUpdateStatus] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showActiveItems, setShowActiveItems] = useState(false);
  const [showInactiveItems, setShowInactiveItems] = useState(true);
  const [productsProm, setProductsProm] = useState([]);


  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ tipo: 'cliente' }); // Adicione a propriedade tipo
  
    try {
      const result = await firebase.auth().signInWithPopup(provider);
      setUser(result.user);
    } catch (error) {
      console.error('Erro ao fazer login com o Google:', error);
    }
  };

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
    const fetchProductsProm = () => {
      try {
        const productsRef = firebase.database().ref('promotedProducts');
    
        // Usando o método 'on' para ouvir eventos em tempo real
        productsRef.on('value', (snapshot) => {
          if (snapshot.val()) {
            const productArray = Object.entries(snapshot.val()).map(([key, value]) => ({
              id: key,
              ...value,  // Incluindo todos os dados dentro de cada ID
            }));
    
            setProductsProm(productArray);
          }
        });
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };
  
    fetchProductsProm();
  
    // Lembre-se de desvincular o ouvinte quando o componente for desmontado
    return () => {
      const productsRef = firebase.database().ref('promotedProducts');
      productsRef.off('value');
    };
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
  
      if (tipo !== '') {
        const userDataWithTipo = { name, email, tipo, formulario };
        localStorage.setItem('userData', JSON.stringify(userDataWithTipo));
      }
  
      if (cartItems.length === 0) {
        return { user, redirectToConfirmation: false };
      } else {
        return { user, redirectToConfirmation: true };
      }
    } catch (error) {
      setUser(null);
      throw error;
    }
  };
  
  const signUpStore = async (email, password, name, tipo, formulario, cartItems) => {
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
        url: uid,
      });
  
      if (tipo !== '') {
        const userDataWithTipo = { name, email, tipo, formulario };
        localStorage.setItem('userData', JSON.stringify(userDataWithTipo));
      }
  
      if (cartItems.length === 0) {
        return { user, redirectToConfirmation: false };
      } else {
        return { user, redirectToConfirmation: true };
      }
    } catch (error) {
      setUser(null);
      throw error;
    }
  };

  
  const signOut = async () => {
    try {
      await firebase
        .auth()
        .signOut();
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  const createNewStore = async (storeName) => {
    try {
      if (!user) {
        throw new Error('Usuário não está logado. Faça o login primeiro.');
      }
  
      // Obter o ID do usuário logado
      const userId = user.uid;
  
      // Criar uma nova loja com um ID único no nó "loja"
      const newStoreRef = firebase.database().ref('loja').push();
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

const deleteProduct = async (productId) => {
  try {
    const productRef = firebase.database().ref(`users/${user.uid}/products/${productId}`);
    await productRef.remove();
    alert('Produto excluído com sucesso!');
  } catch (error) {
    console.error('Erro ao excluir o produto:', error.message);
    alert('Erro ao excluir o produto. Por favor, tente novamente mais tarde.');
  }
};



const getFriendlyErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'Email não encontrado. Verifique se o email está correto ou crie uma conta.';
    case 'auth/wrong-password':
      return 'Senha incorreta. Verifique se a senha está correta.';
    case 'auth/network-request-failed':
      return 'Erro de conexão. Verifique sua conexão com a internet e tente novamente.';
    case 'auth/popup-closed-by-user':
      return 'O pop-up de login foi fechado antes de concluir. Tente novamente.';
    // Adicione mais casos conforme necessário
    default:
      return 'Erro no login. Tente novamente mais tarde.';
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
    productsProm,
    deleteProduct,
    signUpStore,
    signInWithEmailAndPassword,
    signUpWithEmailAndPassword,
    signOut,
    createNewStore,
    getProductsByUserId,
    getStoreIdByProductId,
    saveFormToFirebase,
    saveLogistaFormToFirebase,
    signInWithGoogle,
    getFriendlyErrorMessage,
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
