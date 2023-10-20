import React from 'react';


const CustomButton = ({ label, onClick }) => {
  return (
    <button onClick={() => onClick(label)}>
      {label}
    </button>
  );
};


const ButtonContainer = ({ handleButtonClick }) => {
  return (
    <div>
      <h2>Botões</h2>
      {/* Botão 1 */}
      <CustomButton label="Botão 1" onClick={handleButtonClick} />

      {/* Botão 2 */}
      <CustomButton label="Botão 2" onClick={handleButtonClick} />

      {/* Botão 3 */}
      <CustomButton label="Botão 3" onClick={handleButtonClick} />
    </div>
  );
};


export default ButtonContainer;
