import React,{useState, useEffect} from 'react';
import { useAuth } from '../../Context/AuthContext';
import firebase from '../../config/firebaseConfig';
import './style.css';

const MeusPedidos = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const {user} = useAuth();
  
  

  useEffect(() => {
    let isMounted = true;
  
    const fetchUserOrders = () => {
      try {
        const user = firebase.auth().currentUser;
        if (user) {
          const userUid = user.uid;
          const userOrderHistoryRef = firebase.database().ref(`users/${userUid}/orderhistory`);
  
          // Usando 'on' para ouvir as alterações em tempo real
          userOrderHistoryRef.on('value', async (snapshot) => {
            if (isMounted) {
              if (snapshot.exists()) {
                const isUrls = Object.keys(snapshot.val());
                const ordersRef = firebase.database().ref('orders');
                const userOrdersArray = [];
  
                for (const isUrl of isUrls) {
                  const orderIds = Object.values(snapshot.val()[isUrl]);
  
                  for (const orderId of orderIds) {
  // Adiciona um ouvinte ao nó orders/uid/orderId
  const orderNodeRef = firebase.database().ref(`orders/${userUid}/${orderId}`);
  orderNodeRef.on('value', (orderNodeSnapshot) => {
    if (orderNodeSnapshot.exists()) {
      // Atualiza o estado com as alterações
      setUserOrders((prevOrders) => {
        const updatedOrders = [...prevOrders];
        const existingOrderIndex = updatedOrders.findIndex(
          (order) => order.orderId === orderId
        );

        if (existingOrderIndex !== -1) {
          updatedOrders[existingOrderIndex] = orderNodeSnapshot.val();
        } else {
          // Se o pedido não existir no estado, adiciona-o
          updatedOrders.push(orderNodeSnapshot.val());
        }

        return updatedOrders;
      });
    }
  });
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
          });
        }
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserOrders();
  }, []); // Certifique-se de adicionar quaisquer dependências necessárias aqui
  
  
  
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
            <>
            <div key={productIndex}>
              <div>{product.orderId}</div>
              <strong>Produto:</strong> {product.title}<br />
              <strong>Quantidade:</strong> {product.quantity}<br />
              <strong>Preço:</strong> R$ {product.price}
              <p><strong>Status:</strong>{order.status}</p>
            </div>

            <div>
            {order.selectedAddress.cidade}  {order.selectedAddress.bairro} {order.selectedAddress.rua} {order.selectedAddress.numero} {order.selectedAddress.telefoneContato}
           </div>
         </>
          ))}
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