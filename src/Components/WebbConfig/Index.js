import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import firebase from '../../config/firebaseConfig';
import './styles.css';

function SettingsSite() {
  const { user, saveLogistaFormToFirebase } = useAuth();
  const navigate = useNavigate();

  const [complemento, setComplemento] = useState({
    nomecomercial: '',
    configuracaoPadrao: '',
    cidade: '',
    bairro: '',
    rua: '',
    numero: '',
    telefoneContato: '',
    imagem: null,
  });

  const [formErrors, setFormErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [imageUrlPreview, setImageUrlPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Adicionando o estado para armazenar os dados atuais do Firebase
  const [currentData, setCurrentData] = useState(null);

  useEffect(() => {
    // Função para buscar os dados atuais do Firebase
    const fetchCurrentData = async () => {
      try {
        const snapshot = await firebase
          .database()
          .ref(`users/${user.uid}/formulario`)
          .once('value');

        const currentData = snapshot.val();
        if (currentData) {
          // Atualizando o estado com os dados atuais
          setComplemento(currentData);
        }
      } catch (error) {
        console.error('Erro ao buscar dados atuais do Firebase:', error.message);
      }
    };

    // Chamando a função de busca ao montar o componente
    fetchCurrentData();
  }, [user.uid]);

  const handleComplementoChange = (event) => {
    const { name, value, type } = event.target;

    setComplemento((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!complemento.nomecomercial) {
      errors.nomecomercial = 'O campo é obrigatório.';
    }
    // Adicione outras validações conforme necessário

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setComplemento((prevState) => ({
      ...prevState,
      imagem: file,
    }));
    // Exibir a imagem selecionada
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrlPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImageUrlPreview(null);
    }
  };

  const handleImageUpload = async () => {
    try {
      if (complemento.imagem === null) {
        throw new Error('Selecione uma imagem antes de enviar.');
      }

      const imageRef = firebase
        .storage()
        .ref(`users/${user.uid}/products/${complemento.imagem.name}`);
      const uploadTask = imageRef.put(complemento.imagem);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Progresso do upload: ${progress}%`);
          setUploadProgress(progress);
        },
        (error) => {
          console.error('Erro ao enviar a imagem:', error.message);
        },
        async () => {
          const imageUrl = await uploadTask.snapshot.ref.getDownloadURL();
          setComplemento((prevState) => ({
            ...prevState,
            bannerUrl: imageUrl,
          }));
          alert('Imagem salva com sucesso!');
        }
      );
    } catch (error) {
      console.error('Erro ao enviar a imagem:', error.message);
    }
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsFormSubmitted(true);
      try {
        await saveLogistaFormToFirebase(complemento);
        localStorage.setItem('formulario', 'true');
        navigate('/');
      } catch (error) {
        console.error('Erro ao salvar no Firebase:', error.message);
      }
    }
  };

  return (
    <div>
      {!isFormSubmitted ? (
        <div className='cont-form-setings'>
          <h2>Dados da loja</h2>
          <form onSubmit={handleSubmit} className='cont-fomr-submit'>
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

            <div className='form-field'>
              <label htmlFor="image" className="custom-file-input">
                {imageUrlPreview ? (
                  <img
                    src={imageUrlPreview}
                    alt="Imagem selecionada"
                    style={{ width: '150px', height: '150px' }}
                  />
                ) : (
                  <>
                    <span>Escolher Imagem</span>
                    <img
                      src=""
                      alt=""
                      style={{ width: '150px', height: '150px', display: 'none' }}
                    />
                  </>
                )}
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className='continputimg'
                />
              </label>
              <button
                type="button"
                onClick={handleImageUpload}
                className='contbutoncad'
              >
                Enviar Imagem
              </button>
            </div>

            {uploadProgress > 0 && <p>Progresso do Upload: {uploadProgress.toFixed(2)}%</p>}

            <button type='submit'>Enviar</button>
          </form>
        </div>
      ) : (
        <p>Formulário enviado com sucesso!</p>
      )}
    </div>
  );
}

export default SettingsSite;
