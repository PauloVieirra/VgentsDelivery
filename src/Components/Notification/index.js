import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importe useNavigate
import firebase from '../../config/firebaseConfig';

const Notification = ({ orderId, userUid }) => {
  const [status, setStatus] = useState('');
  const navigate = useNavigate(); // Use useNavigate em vez de useHistory

  useEffect(() => {
    const statusRef = firebase.database().ref(`orders/${userUid}/${orderId}/status`);

    const statusChangeListener = statusRef.on('value', (snapshot) => {
      if (snapshot.exists()) {
        const newStatus = snapshot.val();
        setStatus(newStatus);
        alert(`Seu pedido (${orderId}) teve uma mudança de status: ${newStatus}`);
      }
    });

    return () => {
      statusRef.off('value', statusChangeListener);
    };
  }, [orderId, userUid]);

  const handleNotificationClick = () => {
   
  };

  return (
    <div onClick={handleNotificationClick}>
      Notificação de Pedido: {orderId} - Status: {status}
    </div>
  );
};

export default Notification;
