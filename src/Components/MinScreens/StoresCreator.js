import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import './style.css';

const CreateStore = () => {
  const { createNewStore } = useAuth();
  const [storeName, setStoreName] = useState('');

  const handleCreateStore = async () => {
    try {
      const newStoreId = await createNewStore(storeName);
      console.log('Nova loja criada com o ID:', newStoreId);
    } catch (error) {
      console.error('Erro ao criar a loja:', error.message);
    }
  };

  return (
    <div container>
      <h2>Criar Nova Loja</h2>
      <input
        type="text"
        value={storeName}
        onChange={(e) => setStoreName(e.target.value)}
        placeholder="Nome da loja"
      />
      <button onClick={handleCreateStore}>Criar Loja</button>
    </div>
  );
};

export default CreateStore;
