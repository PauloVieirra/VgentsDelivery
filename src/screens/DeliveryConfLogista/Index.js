import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import FormularioComplementoLogista from '../../Components/FormcomplitLogista/Index';
import { userData, form } from '../../Components/localStorageComponent';

export default function DeliveryConfLogista() {
  const { user } = useAuth();
  const [isFormSubmitted, setIsFormSubmitted] = useState(null);
  const isFormSented = form;
  console.log(isFormSented);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.ROLE && user.ROLE.tipo === 'logista') {
      // Verifique se o usuário é um logista e o estado do formulário
      setIsFormSubmitted(isFormSented);
    }
  }, [user, isFormSented]);

  useEffect(() => {
    if (isFormSented === true) {
      // Atualize o valor de isFormSented para true e redirecione
      
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [isFormSented, navigate]);

  return (
    <div>
      {isFormSented === false && <FormularioComplementoLogista />}
      {isFormSented === true && (
        <p>Formulário enviado com sucesso. Redirecionando...</p>
      )}
    </div>
  );
}
