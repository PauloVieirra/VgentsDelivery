import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../Loading';

function FormularioComplemento() {
  const { user, saveFormToFirebase } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);

  useEffect(() => {
    // Simulando uma carga assíncrona (pode ser uma chamada à API, etc.)
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simula uma espera de 2 segundos
      setLoading(false);
    };

    fetchData();
  }, []); 

  const totalSteps = 3; // Defina o número total de etapas do formulário

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

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      saveFormToFirebase(complemento);
      // Redirecione para a tela inicial após o envio
      navigate('/');
    }
  };

  return (
    <div>
      {!loading ? (
        <div>
          {step === 1 && (
            <div>
              {/* Tela 1 */}
              <h2>Endereço de Entrega</h2>
              <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
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
                <button type="submit">Próximo</button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div>
              {/* Tela 2 */}
              <h2>Configuração Padrão</h2>
              <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
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
                {/* Adicione outros campos conforme necessário */}
                <button type="button" onClick={prevStep}>Anterior</button>
                <button type="submit">Próximo</button>
              </form>
            </div>
          )}
           {step === 3 && (
            <div>
              {/* Tela 3 */}
              <h2>Configuração Padrão</h2>
              <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                <div className='form-field'>
                  <label htmlFor='cidade'>Configuração Padrão:</label>
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
                <button type="button" onClick={prevStep}>Anterior</button>
                <button type="submit">Próximo</button>
              </form>
            </div>
          )}
           {step === 4 && (
            <div>
              <h2>Configuração Padrão</h2>
              <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
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
                {/* Adicione outros campos conforme necessário */}
                <button type="button" onClick={prevStep}>Anterior</button>
                <button type="submit">Próximo</button>
              </form>
            </div>
          )}

          {step === 3 && (
            <div>
              {/* Tela 3 - Última Tela */}
              <h2>Detalhes do Pedido</h2>
              <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                {/* Campos de Detalhes do Pedido */}
                {/* ... (campos do formulário) */}
                <button type="button" onClick={prevStep}>Anterior</button>
                <button type="submit">Enviar</button>
              </form>
            </div>
          )}
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
