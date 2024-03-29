import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../Loading';
import {tittleStapsOne, dialogStapOne, tittleStapsTow, dialogStapTow, tittleStapsThree, dialogStapThree, tittleStapsSix, dialogStapSix} from '../Dialogs';
import './style.css';

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

  const totalSteps = 6; // Defina o número total de etapas do formulário

  // Estado para controlar os campos do formulário
  const [complemento, setComplemento] = useState({
    
    configuracaoPadrao: '',
    cidade: '',
    bairro: '',
    rua: '',
    numero: '',
    telefoneContato: '',
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
    if (!complemento.cidade) {
      errors.cidade = 'O campo é obrigatório.';
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
    <div className='form-container'>
      {!loading ? (
        <div className='containerstaps'>
           
         <div className='progressbar'>
            <div className='progress' style={{ width: `${(step / totalSteps) * 100}%` }} />
          </div>
          <div style={{fontSize:'22px'}}>
          {step === 1 && tittleStapsOne}
          {step === 2 && tittleStapsTow}
          {step === 3 && tittleStapsThree}
          {step === 4 && tittleStapsThree}
          {step === 6 && tittleStapsSix}
          </div>
          <p>
            {step === 1 && dialogStapOne}
            {step === 2 && dialogStapTow}
            {step === 3 && dialogStapThree}
            {step === 4 && 'Forneça informações de contato e pagamento.'}
            {step === 5 && 'Confirme os detalhes do pedido.'}
            {step === 6 && dialogStapSix}
          </p>
          
          {step === 1 && (
            <div className='contformstep'>
              
              <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                <div className='form-field'>
                  <label htmlFor='cidade'>Cidade:</label>
                  <input
                    type='text'
                    id='cidade'
                    name='cidade'
                    placeholder='ex: Cruzeiro Velho'
                    value={complemento.cidade}
                    onChange={handleComplementoChange}
                  />
                </div>
                <button className='next-btn' type="submit">Próximo</button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div>
              {/* Tela 2 */}
              <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
              <div className='form-field'>
                <label htmlFor='bairro'>Bairro/Quadra:</label>
                <input
                    type='text'
                    id='bairro'
                    name='bairro'
                    placeholder='bairro ou quadra'
                    value={complemento.bairro}
                    onChange={handleComplementoChange}
                />
                </div>
                {/* Adicione outros campos conforme necessário */}
                <div className='contbtnscomplemento'>
                <button type="button" onClick={prevStep}>Anterior</button>
                <button type="submit">Próximo</button>
                </div>
              </form>
            </div>
          )}
           {step === 3 && (
            <div>
              {/* Tela 3 */}
              <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
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
                <div className='contbtnscomplemento'>
                <button type="button" onClick={prevStep}>Anterior</button>
                <button type="submit">Próximo</button>
                </div>
              </form>
            </div>
          )}
            {step === 4 && (
            <div>
              {/* Tela 5 */}
              <h2>Configuração Padrão</h2>
              <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
              <div className='form-field'>
                  <label htmlFor='configuracaoPadrao'>Observacoes:</label>
                  <input
                    type='text'
                    id='configuracaoPadrao'
                    name='configuracaoPadrao'
                    value={complemento.configuracaoPadrao}
                    onChange={handleComplementoChange}
                  />
                  </div>
                <div className='contbtnscomplemento'>
                <button type="button" onClick={prevStep}>Anterior</button>
                <button type="submit">Próximo</button>
                </div>
              </form>
            </div>
          )}
           {step === 5 && (
            <div>
              <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
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
        <div className='contbtnscomplemento'>
                <button type="button" onClick={prevStep}>Anterior</button>
                <button type="submit">Próximo</button>
                </div>
              </form>
            </div>
          )}
          {step === 6 && (
            <div>
              <div style={{marginTop:'50px'}}>
              <p>Cidade: {complemento.cidade}</p>
            <p>Bairro: {complemento.bairro}</p>
            <p>Rua: {complemento.rua}</p>
            <p>Número: {complemento.numero}</p>
             <p>Telefone de Contato: {complemento.telefoneContato}</p>
                </div>
              <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                {/* Campos de Detalhes do Pedido */}
                {/* ... (campos do formulário) */}
                <div className='contbtnscomplemento'>
                <button type="button" onClick={prevStep}>Anterior</button>
                <button type="submit">Enviar</button>
                </div>
                
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
