import React, { useState, useContext } from 'react';
import { useAuth } from '../../Context/AuthContext';

function FormularioComplementoLogista() {
  const { user, saveLogistaFormToFirebase } = useAuth();
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Estado para controlar os campos do formulário
  const [complemento, setComplemento] = useState({
    nomecomercial: '',
    configuracaoPadrao: '',
    cidade: '',
    bairro: '',
    rua: '',
    numero: '',
    telefoneContato: '',
  });

  // Estado para controlar erros de validação
  const [formErrors, setFormErrors] = useState({});

  // Estado para controlar se o formulário foi enviado com sucesso
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // Função para lidar com as mudanças nos campos do formulário
  const handleComplementoChange = (event) => {
    const { nomecomercial, value } = event.target;
    setComplemento((prevState) => ({
      ...prevState,
      [nomecomercial]: value,
    }));
  };

  // Função para validar o formulário
  const validateForm = () => {
    const errors = {};
    if (!complemento.nomecomercial) {
      errors.nomecomercial = 'Obrigatório.';
    }
    // Adicione outras validações conforme necessário

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  
  // Função para lidar com o envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      saveLogistaFormToFirebase(complemento); // Chame a função do contexto para enviar os dados
      setIsFormSubmitted(true);
    }
  };

  return (
    <div>
      {!isFormSubmitted ? (
        <div>
          <div>
      <h2>Formulário de Complemento</h2>
      <form onSubmit={handleSubmit}> 
        <div className='form-field'>
          <label htmlFor='enderecoEntrega'>Nome comercial da loja:</label>
          <input
            type='text'
            id='nomecomercial'
            name='nomecomercial'
            value={complemento.nomecomercial}
            onChange={handleComplementoChange}
          />
        </div>
        <div className='form-field'>
          <label htmlFor='cidade'>Cidade:</label>
          <input
            type='text'
            id='cidade'
            name='cidade'
            value={complemento.cidade}
            onChange={handleComplementoChange}
          />
        </div>
        <div className='form-field'>
          <label htmlFor='configuracaoPadrao'>Complemento:</label>
          <input
            type='text'
            id='configuracaoPadrao'
            name='configuracaoPadrao'
            value={complemento.configuracaoPadrao}
            onChange={handleComplementoChange}
          />
        </div>
        <div className='form-field'>
          <label htmlFor='bairro'>Bairro/Quadra:</label>
          <input
            type='text'
            id='bairro'
            name='bairro'
            value={complemento.bairro}
            onChange={handleComplementoChange}
          />
        </div>
        <div className='form-field'>
          <label htmlFor='rua'>Rua:</label>
          <input
            type='text'
            id='rua'
            name='rua'
            value={complemento.rua}
            onChange={handleComplementoChange}
          />
        </div>
        <div className='form-field'>
          <label htmlFor='numero'>Número:</label>
          <input
            type='text'
            id='numero'
            name='numero'
            value={complemento.numero}
            onChange={handleComplementoChange}
          />
        </div>
        <div className='form-field'>
          <label htmlFor='telefoneContato'>Telefone de Contato:</label>
          <input
            type='text'
            id='telefoneContato'
            name='telefoneContato'
            value={complemento.telefoneContato}
            onChange={handleComplementoChange}
          />
        </div>
       
        <button type='submit'>Enviar</button>
      </form>
    </div>
        </div>
      ) : (
        <p>Formulário enviado com sucesso!</p>
      )}
    </div>
  );
}

export default FormularioComplementoLogista;
