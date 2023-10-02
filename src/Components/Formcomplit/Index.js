import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../Loading';

function FormularioComplemento() {
  const { user, saveFormToFirebase } = useAuth();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando uma carga assíncrona (pode ser uma chamada à API, etc.)
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simula uma espera de 2 segundos
      setLoading(false);
    };

    fetchData();
  }, []); 

  // Estado para controlar os campos do formulário
  const [complemento, setComplemento] = useState({
    enderecoEntrega: '',
    configuracaoPadrao: '',
    cidade: '',
    bairro: '',
    rua: '',
    numero: '',
    telefoneContato: '',
    formaPagamento: '',
    troco: '',
  });

  // Estado para controlar erros de validação
  const [formErrors, setFormErrors] = useState({});

  // Estado para controlar se o formulário foi enviado com sucesso
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // Função para lidar com as mudanças nos campos do formulário
  const handleComplementoChange = (event) => {
    const { name, value } = event.target;
    setComplemento((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Função para validar o formulário
  const validateForm = () => {
    const errors = {};
    if (!complemento.enderecoEntrega) {
      errors.enderecoEntrega = 'Endereço de entrega é obrigatório.';
    }
    // Adicione outras validações conforme necessário

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  
  // Função para lidar com o envio do formulário
  const handleSubmit = async (event) => {
  event.preventDefault();

  if (validateForm()) {
    saveFormToFirebase(complemento);
    setIsFormSubmitted(true);

    // Recarregue a página após um pequeno atraso
    setTimeout(() => {
      navigate('/');
    }, 3000);
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
          <label htmlFor='enderecoEntrega'>Endereço de Entrega:</label>
          <input
            type='text'
            id='enderecoEntrega'
            name='enderecoEntrega'
            value={complemento.enderecoEntrega}
            onChange={handleComplementoChange}
          />
        </div>
        <div className='form-field'>
          <label htmlFor='configuracaoPadrao'>Configuração Padrão:</label>
          <input
            type='text'
            id='configuracaoPadrao'
            name='configuracaoPadrao'
            value={complemento.configuracaoPadrao}
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
          <label htmlFor='bairro'>Bairro:</label>
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
        <div className='form-field'>
          <label htmlFor='formaPagamento'>Forma de Pagamento:</label>
          <input
            type='text'
            id='formaPagamento'
            name='formaPagamento'
            value={complemento.formaPagamento}
            onChange={handleComplementoChange}
          />
        </div>
        <div className='form-field'>
          <label htmlFor='troco'>Troco:</label>
          <input
            type='text'
            id='troco'
            name='troco'
            value={complemento.troco}
            onChange={handleComplementoChange}
          />
        </div>
        <button type='submit'>Enviar</button>
      </form>
    </div>
        </div>
      ) : (
        <div>
           <LoadingSpinner />
        </div>
      )}
    </div>
  );
}

export default FormularioComplemento;