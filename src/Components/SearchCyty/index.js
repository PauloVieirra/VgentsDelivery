import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import firebase from '../../config/firebaseConfig';
import { userData, local  } from '../localStorageComponent';
import CardList from '../ItensImpullss';
import { BannerDesktop, BannersMobile } from '../Banners';
import './style.css';

const CitySelection = ({ onSelectCity }) => {
  const [selectedCity, setSelectedCity] = useState('');
  const [logistaUsers, setLogistaUsers] = useState([]);
  const [selectedUserUid, setSelectedUserUid] = useState('');
  const [isCitySelectFocused, setIsCitySelectFocused] = useState(false);
  const [selectedTag, setSelectedTag] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadFromLocalStorage = () => {
      const storedData = localStorage.getItem('logistaUsers');
      if (storedData) {
        setLogistaUsers(JSON.parse(storedData));
      }
    };

    loadFromLocalStorage();

    const logistaRef = firebase.database().ref('users');
    logistaRef
      .orderByChild('ROLE/tipo')
      .equalTo('logista')
      .once('value')
      .then((snapshot) => {
        const users = snapshot.val();
        const logistaArray = users ? Object.values(users) : [];
        const logistaArrayWithUid = logistaArray.map((user) => ({
          ...user,
          userId: user.uid,
        }));
        setLogistaUsers(logistaArrayWithUid);

        localStorage.setItem(
          'logistaUsers',
          JSON.stringify(logistaArrayWithUid)
        );
      })
      .catch((error) => {
        console.error('Erro ao obter usuários logistas:', error);
      });
  }, []);

  const handleCitySelect = () => {
    if (selectedCity) {
      onSelectCity(selectedCity);
      setIsCitySelectFocused(true);
    }
  };

  const handleSelectChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectedTag(''); // Limpar a tag quando a cidade é alterada
    handleCitySelect();
    setSelectedUserUid(null);
  };

  const handleSelectTag = (e) => {
    setSelectedTag(e.target.value);
  };

  const handleUserCardClick = (uid) => {
    if (uid) {
      navigate(`/WebappLoja${uid}`);
    } else {
      console.log('Loja não encontrada');
    }
  };

  const handleCleanSearch = () => {
    setSelectedCity('');
    setSelectedTag('');
  };

  const filteredUsers = logistaUsers.filter(
    (user) => user.cidade === selectedCity
  );

  // Função para filtrar usuários com base na tag
  const filterUsersByTag = (users, tag) => {
    return users.filter((user) => {
      const userTags = Array.isArray(user.tags) ? user.tags : [user.tags];
      return userTags.some((t) => String(t).toLowerCase().includes(tag.toLowerCase()));
    });
  };


  return (
    <>
      <div className='contchosse'>
         <div className='cont'>
         <div className='contmapsDesktop'> <BannerDesktop/> </div>
         <div className='contmapsMobile'> <BannersMobile/> </div>
         
        <div className='conttittle'>
          <div className='textdeliv'>
             {selectedCity ? selectedCity : 'Delivery'}
          </div>
          {!selectedCity  && (
          <div className='textadress'>
          Entrega rapida e segura
          </div>
          )}

          {selectedCity !== '' && (
          <div className='textadress' onClick={handleCleanSearch}>
          Limpar
          </div>
          )}
        </div>
        
        </div>
        <div className='continputcentered'>
          <select
            value={selectedCity}
            onChange={handleSelectChange}
            className='inputcitybox'
          >
            <option value="" disabled={!selectedCity} >
              {selectedCity ? 'Ver promoções' : 'Escolha uma cidade'}
            </option>
            {[...new Set(logistaUsers.map((user) => user.cidade))].map(
              (city) => (
                <option key={city} value={city} style={{ display:'flex',fontSize:'18px', backgroundColor:'dedede', width:'20%'}}>
                  {city}
                </option>
              )
            )}
          </select>

          {selectedCity && (
            <input
              value={selectedTag}
              onChange={handleSelectTag}
              placeholder='Pesquisar por produto...'
              className='inputcitybox'
            />
          )}
        </div>

        <div className='user-grid'>
        {selectedCity && filteredUsers.length > 0 ? (
    filterUsersByTag(filteredUsers, selectedTag).map((user) => (

      <Link key={user.userId} to={`/WebappLoja/${user.url}`}> {/* Note que usamos ${user.userId} como parte do URL */}
        <div className='user-card'>
          <div className='imgcardcity'>
            <img src={user.img} alt="" className='contimgstore' />
          </div>
          <div className='contdatastoreseach'>
            <div style={{ fontSize: '20px', fontWeight: '600', marginLeft: '10px' }}>{user.name}</div>
            <div style={{ fontSize: '18px', fontWeight: '300', marginLeft: '10px' }}>{user.email}</div>
          </div>
        </div>
      </Link>
    ))
          ) : (
            <CardList />
          )}
        </div>
      </div>
    
    </>
  );
};

export default CitySelection;
