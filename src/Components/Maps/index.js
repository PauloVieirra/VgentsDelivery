import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import FooterNavigation from '../Footer';
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import './style.css';
import API_KEY from '../../config/Index';

function MapContainer() {
  const navigate = useNavigate();
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
  });

  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [logistaUsers, setLogistaUsers] = useState([]);
  const [showStoreCard, setShowStoreCard] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const allUsers = JSON.parse(localStorage.getItem('logistaUsers')) || [];
        const logistaUsers = allUsers.filter(user => user.ROLE.tipo === 'logista');
        setLogistaUsers(logistaUsers);

        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setUserLocation({ lat: latitude, lng: longitude });
            },
            (error) => {
              console.error('Erro ao obter a localização:', error.message);
            }
          );
        } else {
          console.error('A geolocalização não é suportada neste navegador.');
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleShowStore = (logista) => {
    setShowStoreCard(logista);
  };

  const handleCloseStoreCard = (logista) => {
    setShowStoreCard(false);
  };
  const handleNavegueURL = (url) => {
    if (url) {
      console.log("Chave única do usuário:", url);
      navigate(`/${url}`);
    } else {
      console.log("Loja não encontrada");
    }
  };


  useEffect(() => {
    const handleBeforeUnload = () => {
      // Limpeza ou salvamento de dados antes de descarregar a página
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchData();
      }
    };

    const fetchData = async () => {
      setLoading(true);
      try {
        // Implemente a lógica para recarregar os dados, se necessário
        // Exemplo: refazer a chamada à API ou recarregar do armazenamento local
      } catch (error) {
        console.error('Erro ao recarregar dados:', error.message);
      } finally {
        setLoading(false);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  if (loading) {
    return <div style={{display:'flex',width:'100%', height:'100vh', justifyContent:'center', alignItems:'center'}}>Loading...</div>;
  }

  return isLoaded ? (
  <div className='contmap'>
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100vh' }}
      center={userLocation}
      zoom={14}
      options={{
        fullscreenControl: false,
        disableDefaultUI: true,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
        ],
      }}
    >
      {userLocation && <Marker position={userLocation} title="Sua localização" />}

      {logistaUsers.map((logista, index) => {
        const { lat, lng, locs } = logista.ROLE.location || {};

        if (lat !== undefined && !isNaN(lat) && lng !== undefined && !isNaN(lng)) {
          return (
            <Marker
              key={index}
              position={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
              title={`Loja ${index + 1}: ${locs || 'Local Desconhecido'}`}
              onClick={() => handleShowStore(logista)}
              icon={{
                url: 'https://cdn-icons-png.flaticon.com/512/4813/4813391.png',
                scaledSize: new window.google.maps.Size(52, 52),
              }}
            />
          );
        }

        return null;
      })}
    </GoogleMap>
    {showStoreCard && (
      <div className="store-card-maps">
        {showStoreCard && (
          <div className="store-card-maps">
            {/* Conteúdo do cartão da loja */}
            <div className="store-card-content">
              <img
                className="store-card-image"
                src={showStoreCard.image || 'caminho/para/placeholder.jpg'}
                alt="Food Truck"
              />
              <div className="store-card-title">{showStoreCard.name || 'Nome do Food Truck'}</div>
              <div className="store-card-details">
                <p>Telefone: {showStoreCard.phone || 'N/A'}</p>
                <p>Email: {showStoreCard.email || 'N/A'}</p>
                <p>Redes Sociais: {showStoreCard.socialMedia || 'N/A'}</p>
              </div>
            </div>
            {/* Botões do cartão da loja */}
            <div className="store-card-buttons">
              <button className="navigate" onClick={handleCloseStoreCard}>
                Fechar
              </button>
              <button className="view-menu" onClick={() => handleNavegueURL(showStoreCard.url)}>
                Ver Cardápio
              </button>
            </div>
          </div>
        )}
      </div>
    )}

    <FooterNavigation />
  </div>
) : (
  <div style={{display:'flex',width:'100%', height:'100vh', justifyContent:'center', alignItems:'center'}}>Loading...</div>
);
}
  

export default React.memo(MapContainer);
