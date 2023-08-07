import React, { useState } from 'react';
import firebase from '../../config/firebaseConfig';
import { useAuth } from '../../Context/AuthContext';
import './stylesCad.css';

const ProductForm = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [category, setCategory] = useState('');
  const [isActive, setIsActive] = useState(true);

  

 
const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    
   
setIsImageUploaded(false);
  };

  const handleImageUpload = async () => {
    try {
      if (!image) {
        
       
throw new Error('Selecione uma imagem antes de enviar.');
      }

      const imageRef = firebase.storage().ref(`users/${user.uid}/products/${image.name}`);
      await imageRef.put(image);
      const imageUrl = await imageRef.getDownloadURL();
      setIsImageUploaded(true);
      setUploadMessage('Tudo certo! clique em cadastrar');
      setImageUrl(imageUrl);
    } catch (error) {
      setIsImageUploaded(false);
      setUploadMessage(`Erro ao enviar a imagem: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isImageUploaded) {
        throw new Error('Aguarde o envio da imagem antes de cadastrar o produto.');
      }

      // Salvar os dados do produto no Realtime Database
      const productRef = firebase.database().ref(`users/${user.uid}/products`);
      const newProductRef = productRef.push();
      const newProductId = newProductRef.key;

      await newProductRef.set({
        id: newProductId,
        title,
        price,
        description,
        imageUrl,
        category,
        isActive,
      });

      // Limpar os campos após o envio
      
     
setTitle('');
      setPrice('');
      setDescription('');
      setImage(null);
      setIsImageUploaded(false);
      setUploadMessage('');
      setImageUrl(null);
      setCategory('');
      setIsActive(true); // Definir o valor padrão do checkbox como true

      alert('Produto cadastrado com sucesso!');
    } catch (error) {
      console.error('Error while creating product:', error.message);
      alert('Erro ao cadastrar o produto. Por favor, tente novamente mais tarde.');
    }
  };

  return (
    <div className='contcardcad'>
       <div className='h2n'>
           <h2>Cadastrar Produto</h2>
       </div>
     
      
      
      <form onSubmit={handleSubmit}>
        <div className='continput'>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className='continput'>
          <label htmlFor="price">Preço:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className='continput'>
          <label htmlFor="description">Descrição:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className='continput'>
          <label htmlFor="category">Categoria:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        
        <div className='continput'>
          <label htmlFor="isActive">Cadastrar sem publicar:</label>
          <input
            type="checkbox"
            id="isActive"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
        </div>
        
        <div className='continput'>
          <label htmlFor="image" className="custom-file-input">
            {image ? (
              <img src={URL.createObjectURL(image)} alt="Imagem selecionada" style={{ width: '150px', height: '150px' }} />
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
          <button type="button" onClick={handleImageUpload} className='contbutoncad' >
            Enviar Imagem
          </button>
        </div>
        {uploadMessage && <p>{uploadMessage}</p>}
        {isImageUploaded && (
          <button type="submit">Cadastrar</button>
        )}
      </form>
    </div>
  );
};

export default ProductForm;