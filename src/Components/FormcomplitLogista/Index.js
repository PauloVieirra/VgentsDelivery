import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import firebase from '../../config/firebaseConfig';

function FormularioComplementoLogista() {
  const { user, saveLogistaFormToFirebase } = useAuth();
  const navigate = useNavigate();
  const [bannerUrl, setBannerUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrlPreview, setImageUrlPreview] = useState(null);
  const [imageKey, setImageKey] = useState(null);
  const [image, setImage] = useState(null);
const [isImageUploaded, setIsImageUploaded] = useState(false);


  const [step, setStep] = useState(1);
  const [complemento, setComplemento] = useState({
    nomecomercial: '',
    configuracaoPadrao: '',
    cidade: '',
    bairro: '',
    rua: '',
    numero: '',
    telefoneContato: '',
    imagem: null,  // Initialize 'imagem' property
  });

  const [formErrors, setFormErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleStepChange = (newStep) => {
    setStep(newStep);
  };

  const handleComplementoChange = (event) => {
    const { name, value, type } = event.target;

    // Se o campo for um arquivo (imagem), atualize o estado de 'imagem'
    if (type === 'file') {
      setComplemento((prevState) => ({
        ...prevState,
        [name]: event.target.files[0],
      }));
    } else {
      setComplemento((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
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
      imagem: file, // Make sure to set 'imagem' property
    }));
    setIsImageUploaded(false);
  
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
  
      // Enviar a imagem para o armazenamento do Firebase
      const imageRef = firebase.storage().ref(`users/${user.uid}/products/${complemento.imagem.name}`);
      const uploadTask = imageRef.put(complemento.imagem);
  
      // Monitorar o progresso do upload
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Progresso do upload: ${progress}%`);
          setUploadProgress(progress);
        },
        (error) => {
          console.error('Erro ao enviar a imagem:', error.message);
          // Lidar com o erro, se necessário
        },
        async () => {
          // Upload concluído com sucesso, obter a URL da imagem
          const imageUrl = await uploadTask.snapshot.ref.getDownloadURL();
  
          // Atualizar o estado e o complemento com a URL da imagem
          setBannerUrl(imageUrl);
          setComplemento((prevState) => ({
            ...prevState,
            bannerUrl: imageUrl,
          }));
  
          // Armazenar a chave da imagem
          const imageKey = new Date().toISOString(); // Você pode ajustar a lógica para gerar uma chave única
  
          // Exibir mensagem informando que a imagem foi salva
          alert('Imagem salva com sucesso! Agora você pode enviar o formulário.');
  
          // Limpar a imagem do estado (opcional)
          setImage(null);
  
          // Chamar a função que atualiza o estado da chave da imagem
          setImageKey(imageKey);
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
        // 1. Adicione a chave da imagem ao complemento antes de enviar o formulário
        const complementoWithImageKey = { ...complemento, imageKey };
        await firebase.database().ref(`users/${user.uid}/formulario`).set(isFormSubmitted);
        // 2. Grave a cidade fora do complemento
        const cidadeForaDoComplemento = complemento.cidade; // ou ajuste conforme necessário
        await firebase.database().ref(`users/${user.uid}/cidade`).set(cidadeForaDoComplemento);
        
        // 3. Salve o complemento no Realtime Database
        await saveLogistaFormToFirebase(complementoWithImageKey);
  
        // Verifique se há uma segunda imagem no estado
      if (image) {
        // Enviar a segunda imagem para o armazenamento do Firebase
        const imageRefProfile = firebase.storage().ref(`users/${user.uid}/products/${image.name}`);
        const uploadTaskProfile = imageRefProfile.put(image);
  
          // Monitorar o progresso do upload
          uploadTaskProfile.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`Progresso do upload da segunda imagem: ${progress}%`);
              setUploadProgress(progress);
            },
            (error) => {
              console.error('Erro ao enviar a segunda imagem:', error.message);
              // Lidar com o erro, se necessário
            },
            async () => {
              // Upload concluído com sucesso, obter a URL da segunda imagem
              const imageUrlProfile = await uploadTaskProfile.snapshot.ref.getDownloadURL();
  
              // Atualizar o estado e o complemento com a URL da segunda imagem
              setBannerUrl(imageUrlProfile);
              setComplemento((prevState) => ({
                ...prevState,
                imageProfile: imageUrlProfile,
              }));
  
              // Limpar a segunda imagem do estado (opcional)
              setImage(null);
            }
          );
        }

        localStorage.setItem('formulario', 'true');
        navigate('/');
      } catch (error) {
        console.error('Erro ao salvar no Firebase:', error.message);
        // Lidar com o erro, se necessário
      }
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
                <div>
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
              </div>
                </form>
              </div>
            )}
            {step === 2 && (
              <div>
                <form onSubmit={(e) => { e.preventDefault(); handleStepChange(3); }}>
                <div>
               
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
                  <button type='button' onClick={() => handleStepChange(1)}>Etapa Anterior</button>
                  <button type='submit'>Próxima Etapa</button>
                  
               
              </div>
                </form>
              </div>
            )}
            {step === 3 && (
              <div>
                {uploadProgress > 0 && <p>Progresso do Upload: {uploadProgress.toFixed(2)}%</p>}

                <form onSubmit={(e) => { e.preventDefault(); handleStepChange(4); }}>
                  <div className='continput'>
                  <label htmlFor="image" className="custom-file-input">
            {imageUrlPreview ? (
              <img src={imageUrlPreview} alt="Imagem selecionada" style={{ width: '150px', height: '150px' }} />
            ) : (
              <>
                <span>Escolher Imagem</span>
                <img src="" alt="" style={{ width: '150px', height: '150px', display: 'none' }} />
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
                    <button type="button" onClick={handleImageUpload} className='contbutoncad'>
                      Enviar Imagem
                    </button>
                  </div>
                  <button type='button' onClick={() => handleStepChange(2)}>Etapa Anterior</button>
                  <button type='submit'>Próxima Etapa</button>
                </form>
              </div>
            )}
             {step === 4 && (
              <div>
                {uploadProgress > 0 && <p>Progresso do Upload: {uploadProgress.toFixed(2)}%</p>}

                <form onSubmit={(e) => { e.preventDefault(); handleStepChange(5); }}>
                  <div className='continput'>
                  <label htmlFor="image" className="custom-file-input">
            {imageUrlPreview ? (
              <img src={imageUrlPreview} alt="Imagem selecionada" style={{ width: '150px', height: '150px' }} />
            ) : (
              <>
                <span>Escolher Imagem2</span>
                <img src="" alt="" style={{ width: '150px', height: '150px', display: 'none' }} />
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
                    <button type="button" onClick={handleImageUpload} className='contbutoncad'>
                      Enviar Imagem
                    </button>
                  </div>
                  <button type='button' onClick={() => handleStepChange(3)}>Etapa Anterior</button>
                  <button type='submit'>Próxima Etapa</button>
                </form>
              </div>
            )}
            {step === 5 && (
                  <div>
                  <form onSubmit={handleSubmit}>
                    <button type='button' onClick={() => handleStepChange(4)}>Etapa Anterior</button>
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
