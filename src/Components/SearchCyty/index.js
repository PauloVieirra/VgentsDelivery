import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import firebase from '../../config/firebaseConfig';
import CardList from '../ItensImpullss';
import './style.css';

const CitySelection = ({ onSelectCity }) => {
  const [selectedCity, setSelectedCity] = useState('');
  const [logistaUsers, setLogistaUsers] = useState([]);
  const [selectedUserUid, setSelectedUserUid] = useState('');
  const [isCitySelectFocused, setIsCitySelectFocused] = useState(false);
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
    logistaRef.orderByChild('ROLE/tipo').equalTo('logista').once('value')
      .then((snapshot) => {
        const users = snapshot.val();
        const logistaArray = users ? Object.values(users) : [];
        // Ajuste na estrutura para incluir o userId
        const logistaArrayWithUid = logistaArray.map(user => ({ ...user, userId: user.uid }));
        setLogistaUsers(logistaArrayWithUid);
  
        localStorage.setItem('logistaUsers', JSON.stringify(logistaArrayWithUid));
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
    handleCitySelect();
    setSelectedUserUid(null);
  };

  const handleUserCardClick = (uid) => {
    if (uid) {
      console.log("Chave única do usuário:", uid);
      navigate(`/${uid}`);
    } else {
      console.log("Loja não encontrada");
      // Ou você pode definir um estado para exibir uma mensagem na interface do usuário
    }
  };

  const handleCleanSearsh = () => {
    setSelectedCity("");
  }

  const filteredUsers = logistaUsers.filter((user) => user.cidade === selectedCity);

  return (
    <>
    <div className='contchosse'>
      <div className='continputcentered'>
        <select
          value={selectedCity}
          onChange={handleSelectChange}
          className='inputcitybox'
        >
          <option value="" disabled={!selectedCity}>
              {selectedCity ? 'Ver promoções' : 'Escolha uma cidade'}
            </option>
          {[...new Set(logistaUsers.map((user) => user.cidade))].map((city) => (
            <option key={city} value={city} >
              {city}
            </option>
          ))}
        </select>
      </div>

     

<div className='user-grid'>
  {filteredUsers.map((user) => (
    <Link to={`/${user.url}`}>
    <div key={user.userId} className='user-card' onClick={() => handleUserCardClick(user.userId)}>
     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100px', height: '100px', backgroundColor: '#fafafe' }}>
        image
      </div>
      <div style={{width:'224px'}}>
        <p>{user.name}</p>
        <p>{user.email}</p>
      </div>
     </div>
    </Link>
  ))}
  </div>
  </div>
  {selectedCity === '' && (
    <CardList />
  )}
  {selectedCity !== '' && (
  <div className='btninicioout' onClick={handleCleanSearsh}>Voltar</div>
  )}
  
  </>
  );
};

export default CitySelection;
