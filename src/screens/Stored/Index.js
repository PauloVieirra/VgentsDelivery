import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import LogoutButton from '../../Components/Logout';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import food from '../../images/lanchedef.png';
import molhosone from '../../images/molho1.png';
import molhosthow from '../../images/molho2.png';
import molhosthree from '../../images/molho3.png';

const Store = () => {
  const { lojistaId } = useParams();
  const { products, getProductsByUserId } = useAuth();

  useEffect(() => {
    const unsubscribe = getProductsByUserId(lojistaId);
  
    return () => {
      unsubscribe();
    };
  }, [lojistaId, getProductsByUserId]);

  const [searchTerm, setSearchTerm] = useState('');
  const filteredProducts = products.filter((product) => {
    const lowerCasedSearchTerm = searchTerm.toLowerCase();
    return (
      product.title.toLowerCase().includes(lowerCasedSearchTerm) ||
      product.description.toLowerCase().includes(lowerCasedSearchTerm)
    );
  });

  const resultsSectionRef = useRef(null);
  const searchInputRef = useRef(null);

  const handleSearchClick = () => {
    const scrollPosition = resultsSectionRef.current.offsetTop - 160; // Subtrai 60px da posição
    window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
  };

  const handleSearchFocus = () => {
    const scrollPosition = resultsSectionRef.current.offsetTop - 160; // Subtrai 60px da posição
    window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
  };

  return (
    <div className="contstore">
      <div className='contclient'>
        <div className='contleft'>
          <div className='texttittle'>
            Mais que comida,
            <br/>é experiência,
            </div>
        </div>
        <div className='contright'>
          <div className='contclientbanner'>
            <img src={food} alt="" className='food-image'/>
          </div>
          <div className='contmolhos'>
            <div> <img src={molhosthree} alt="" className='contmolho1' /> </div>
            <div> <img src={molhosthow} alt=""  className='contmolho2'/> </div>
            <div> <img src={molhosone} alt=""  className='contmolho3'/> </div>
          </div>
        </div>
      </div>
      <div className='cliensearshbar'> 
        <input
          type='text'
          placeholder='Buscar...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleSearchFocus}
          ref={searchInputRef}
        />
      </div>
      <div ref={resultsSectionRef}></div>
      <div className='contprodclient' >
        {filteredProducts.map((product) => (
          <div key={product.id} className='product-card'>
            <button className='btneditecard'>
              <img src={product.imageUrl} alt={product.title} className='contimg' />
              <h3 style={{ color: '#000' }}>{product.title}</h3>
              <p>{product.description}</p>
              <p>Preço: R$ {product.price}</p>
            </button>
          </div>
        ))}
      </div>
      <div className="product-list">
        <LogoutButton />
        <Link to={`/${lojistaId}`}>Acessar Loja</Link>
      </div>
    </div>
  );
};

export default Store;
