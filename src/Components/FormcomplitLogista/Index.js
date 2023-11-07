import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

function FormularioComplementoLogista() {
  const { user, saveLogistaFormToFirebase } = useAuth();
  const navigate = useNavigate();

  // Estado para controlar as etapas do formulário
  const [step, setStep] = useState(1);

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

  // Função para lidar com as mudanças nas etapas
  const handleStepChange = (newStep) => {
    setStep(newStep);
  };

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
    if (!complemento.nomecomercial) {
      errors.nomecomercial = 'O campo é obrigatório.';
    }
    // Adicione outras validações conforme necessário

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = () => {
    if (validateForm()) {
      saveLogistaFormToFirebase(complemento);
      setIsFormSubmitted(true);

      // Atualize o valor de 'formulario' no localStorage para 'true'
      localStorage.setItem('formulario', 'true');

      navigate('/');
    }
  };

  return (
    <div>
      {!isFormSubmitted ? (
        <div>
          <div>
            <h2>Formulário de Complemento</h2>
            {step === 1 && (
              <div>
                <form onSubmit={(e) => { e.preventDefault(); handleStepChange(2); }}>
                  {/* Etapa 1 */}
                  <div className='form-field'>
                    <label htmlFor='nomecomercial'>Nome comercial da loja:</label>
                    <input
                      type='text'
                      id='nomecomercial'
                      name='nomecomercial'
                      value={complemento.nomecomercial}
                      onChange={handleComplementoChange}
                    />
                    {formErrors.nomecomercial && (
                      <p className='error-message'>{formErrors.nomecomercial}</p>
                    )}
                  </div>
                  <button type='submit'>Próxima Etapa</button>
                </form>
              </div>
            )}
            {step === 2 && (
              <div>
                <form onSubmit={(e) => { e.preventDefault(); handleStepChange(3); }}>
                  {/* Etapa 2 */}
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
                  <button type='button' onClick={() => handleStepChange(1)}>Etapa Anterior</button>
                  <button type='submit'>Próxima Etapa</button>
                </form>
              </div>
            )}
            {step === 3 && (
              <div>
                <form onSubmit={handleSubmit}>
                  {/* Etapa 3 */}
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
                  <button type='button' onClick={() => handleStepChange(2)}>Etapa Anterior</button>
                  <button type='submit'>Enviar</button>
                </form>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>Formulário enviado com sucesso!</p>
      )}
    </div>
  );
}

export default FormularioComplementoLogista;
