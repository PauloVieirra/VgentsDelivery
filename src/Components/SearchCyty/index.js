import React, { useState } from 'react';
import './style.css';

const CitySelection = ({ onSelectCity }) => {
  const [selectedCity, setSelectedCity] = useState('');

  const cities = ['City A', 'City B', 'City C']; // Substitua pelas suas cidades reais

  const handleCitySelect = () => {
    if (selectedCity) {
      onSelectCity(selectedCity);
    }
  };

  const handleSelectChange = (e) => {
    setSelectedCity(e.target.value);
    handleCitySelect(); // Chama a função ao selecionar uma cidade
  };

  return (
    <div className='contchosse'>
      <div className='continputcentered'>
        <select
          value={selectedCity}
          onChange={handleSelectChange}
          className='inputcitybox'
        >
          <option value="">Selecione uma cidade</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CitySelection;
