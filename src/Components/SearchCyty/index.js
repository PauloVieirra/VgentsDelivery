import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import firebase from '../../config/firebaseConfig';
import { userData, local  } from '../localStorageComponent';
import CardList from '../ItensImpullss';
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
      console.log('Chave única do usuário:', uid);
      navigate(`/${uid}`);
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
        <div className='conttittle'>
          <div>
             {selectedCity ? selectedCity : 'Delivery'}
          </div>
          <div className='textadress'>
            Entrega rápida e segura.
          </div>
        </div>
        

        <div className='continputcentered'>
          <select
            value={selectedCity}
            onChange={handleSelectChange}
            className='inputcitybox'
          >
            <option value="" disabled={!selectedCity}>
              {selectedCity ? 'Ver promoções' : 'Escolha uma cidade'}
            </option>
            {[...new Set(logistaUsers.map((user) => user.cidade))].map(
              (city) => (
                <option key={city} value={city}>
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
              <Link key={user.userId} to={`/${user.url}`}>
                <div
                  className='user-card'
                  onClick={() => handleUserCardClick(user.userId)}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100px',
                      height: '100px',
                      backgroundColor: '#fafafe',
                    }}
                  >
                    image
                  </div>
                  <div style={{ width: '224px' }}>
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <CardList />
          )}
        </div>
      </div>
      {selectedCity !== '' && (
        <div className='btninicioout' onClick={handleCleanSearch}>
          Voltar
        </div>
      )}
    </>
  );
};

export default CitySelection;
