import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../Context/AuthContext';
import firebase from '../config/firebaseConfig';
import 'firebase/database';

import AuthenticatedMenu from '../Components/AutheMenu';

import Home from '../screens/Home/Index';
import Products from '../screens/Products/Index';
import Pedidos from '../screens/Pedidos/Index';
import Conta from '../screens/Conta/Index';
import Suporte from '../screens/Suporte/Index';
import Store from '../screens/Stored/Index';
import CadastroLoja from '../screens/CadastroLoja/Index';
import Dashboard from '../screens/Dashboard/Index';
import LogistaHome from '../screens/LogistaHome/Index';
import MeusPedidos from '../screens/MeusPedidos/Index';
import UpdateProfileForm from '../Components/Formcomplit/Index';
import ConfirmationPage from '../screens/DeliveryConfirm/Index';
import DeliveryConfLogista from '../screens/DeliveryConfLogista/Index';
import FormularioComplemento from '../Components/Formcomplit/Index';
import FormularioComplementoLogista from '../Components/FormcomplitLogista/Index';
import WebappLoja from '../screens/Conta/Index';
import Maps from '../Components/Maps';
import CartModal from '../screens/CartModal/Index';
import handleSetingsSite from '../Components/WebbConfig/Index';
import FooterNavigation from '../Components/Footer';

import { MenuClient } from '../Components/Menus';
import { CartContext } from '../Context/CartContext';


const AppRoutes = () => {
  const [userType, setUserType] = useState(null);


  useEffect(() => {
    const fetchUserType = async (user) => {
      if (user) {
        try {
          const db = firebase.database();
          const userRef = db.ref('users').child(user.uid);

          userRef.once('value', (snapshot) => {
            const userData = snapshot.val();
            if (userData && userData.ROLE && userData.ROLE.tipo) {
              const userType = userData.ROLE.tipo;
              setUserType(userType);
            }
          });
        } catch (error) {
          console.error('Erro ao buscar informações do perfil do usuário:', error);
        }
      }
    };

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      fetchUserType(user);
    });

    return () => unsubscribe();
  }, []);

  return (
  
    <div>
       <AuthProvider>
     
      <AuthenticatedMenu userType={userType} />
      
      <Routes>
        {userType === 'adm' && 
        <>
        <Route path="/" element={<Home />} />
        <Route path="/Conta" element={<Conta />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Pedidos" element={<Pedidos />} />
        <Route path="/WebappLoja:uid" element={<WebappLoja />} />
        <Route path="/Store" element={<Store />} />
        <Route path='/CadastroLoja' element={<CadastroLoja/>}/>
        <Route path='/Dashboard' element={<Dashboard/>}/>
        </>
        }
        {userType === 'logista' && 
        <>
        <Route path="/" element={<LogistaHome />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Suporte" element={<Suporte />} />
        <Route path="/DeliveryConfLogista" element={<DeliveryConfLogista />} />
        <Route path="/Pedidos" element={<Pedidos />} />
        <Route path="/handleSetingsSite" element={<handleSetingsSite />} />
        <Route path="/WebappLoja:url" element={<WebappLoja />} />
        <Route path="/FormularioComplementoLogista" element={<FormularioComplementoLogista />} />
        </>
        }

        {userType === 'cliente' && 
        <>   
     
         <Route path="/Home" element={<Home />} />
        <Route path="/" element={<Store />} />
        <Route path="/Maps" element={<Maps />} />
        <Route path="/:lojistaId" element={<Store />} />
         <Route path="/MeusPedidos" element={<MeusPedidos />} />
         <Route path="/ConfirmationPage" element={<ConfirmationPage />} />
         <Route path="/CartModal" element={<CartModal/>}/>
         <Route path="/WebappLoja" element={<WebappLoja />} />
         <Route path="/WebappLoja/:uid" element={<WebappLoja />} />
         <Route path="/UpdateProfileForm" element={<UpdateProfileForm />} />
         <Route path="/FormularioComplemento" element={<FormularioComplemento />} />
       
        </> 
         }

      </Routes>
      </AuthProvider>
    </div>
  );
};

export default AppRoutes;
