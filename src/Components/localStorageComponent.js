import { useEffect, useState } from 'react';

const useUserDataFromLocalStorage = () => {
  // Gere uma chave única com base no e-mail do usuário
  const userEmail = (localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).email) || '';
  const uniqueKey = `userData_${userEmail}`;

  // Estado para armazenar os dados do usuário
  const [userData, setUserData] = useState(() => {
    const storedData = localStorage.getItem('userData');
    return storedData ? JSON.parse(storedData) : null;
  });

  // Efeito para monitorar as mudanças no localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const storedData = localStorage.getItem('userData');
      setUserData(storedData ? JSON.parse(storedData) : null);
    };

    // Adiciona um listener para o evento de mudança no localStorage
    window.addEventListener('storage', handleStorageChange);

    // Remove o listener quando o componente é desmontado
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [uniqueKey]); // Adicionamos a chave única como dependência para forçar a atualização quando ela mudar

  return userData;
};

const useUserLocation = () => {
  const userData = useUserDataFromLocalStorage();

  // Extraia dados específicos como cidade, bairro, rua, etc.
  const cidade = userData ? userData.complemento.cidade : null;
  const bairro = userData ? userData.complemento.bairro : null;
  const rua = userData ? userData.complemento.rua : null;

  return { cidade, bairro, rua };
};

export { useUserDataFromLocalStorage, useUserLocation };
