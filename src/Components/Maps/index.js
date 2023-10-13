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

  const handleShowStore = () => {
    alert('Você clicou numa loja');
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
    return <div>Loading...</div>;
  }

  return isLoaded ? (
    <div className='contmap'>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100vh' }}
        center={userLocation}
        zoom={14}  // Defina o zoom para 14
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
                onClick={handleShowStore}
                icon={{
                  url: 'https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/7810465/map-marker-pin-clipart-md.png',
                  scaledSize: new window.google.maps.Size(20, 30),
                }}
              />
            );
          }

          return null;
        })}
      </GoogleMap>
      <FooterNavigation />
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default React.memo(MapContainer);
