import React from 'react';
import './style.css';

const Partners = () => {
  // Suponha que você tenha um array de URLs das logos das lojas cadastradas
  const partnerLogos = [
    'logo1.png',
    'logo2.png',
    'logo3.png',
    'logo4.png',
    'logo1.png',
    'logo2.png',
    'logo3.png',
    'logo4.png',
    'logo1.png',
    'logo2.png',
    'logo3.png',
    // Adicione mais logos conforme necessário
  ];

  return (
    <div className="partners">
      <h1>Nossos Parceiros</h1>
      <div className="partner-grid">
        {partnerLogos.map((logo, index) => (
          <div className="partner" key={index}>
            <img src={logo} alt={`Parceiro ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
