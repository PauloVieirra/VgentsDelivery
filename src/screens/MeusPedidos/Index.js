import React,{useState, useEffect} from 'react';
import { useAuth } from '../../Context/AuthContext';
import firebase from '../../config/firebaseConfig';
import './style.css';

const MeusPedidos = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const user = firebase.auth().currentUser;
        if (user) {
          const userUid = user.uid;
          const userOrderHistoryRef = firebase.database().ref(`users/${userUid}/orderhistory`);
          const userOrderHistorySnapshot = await userOrderHistoryRef.once('value');

          if (userOrderHistorySnapshot.exists()) {
            const isUrls = Object.keys(userOrderHistorySnapshot.val());

            const ordersRef = firebase.database().ref('orders');
            const userOrdersArray = [];

            for (const isUrl of isUrls) {
              const orderIds = Object.values(userOrderHistorySnapshot.val()[isUrl]);

              for (const orderId of orderIds) {
                const orderSnapshot = await ordersRef.child(isUrl).child(orderId).once('value');

                if (orderSnapshot.exists()) {
                  userOrdersArray.push(orderSnapshot.val());
                }
              }
            }

            setUserOrders(userOrdersArray);
          } else {
            setUserOrders([]);
          }
        }
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, []);

  return (
  <div className="meus-pedidos-container">
  <h2>Meus Pedidos</h2>
  {loading ? (
    <p>Carregando...</p>
  ) : userOrders.length > 0 ? (
    <div className="cards-container">
      {userOrders.map((order, index) => (
        <div key={index} className="cardty">
          <div className='line'>
          <div> </div>

          {order.products.map((product, productIndex) => (
            <div key={productIndex}>
              <div>{product.orderId}</div>
              <strong>Produto:</strong> {product.title}<br />
              <strong>Quantidade:</strong> {product.quantity}<br />
              <strong>Preço:</strong> R$ {product.price}
            </div>
          ))}
         </div>
        <div>
          {order.selectedAddress.cidade}  {order.selectedAddress.bairro} {order.selectedAddress.rua} {order.selectedAddress.numero} {order.selectedAddress.telefoneContato}
         
          
         
        </div>
        </div>
      ))}
    </div>
  ) : (
    <p>Você não possui pedidos ainda.</p>
  )}
</div>
  );
};

export default MeusPedidos;