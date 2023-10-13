import React from 'react';
import { useNavigate } from 'react-router-dom';
import { faHandPointer } from '@fortawesome/free-solid-svg-icons';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Imgf = Image;

export default function Banners() {

const navigate = useNavigate();

const handleMaps = () => {
  navigate('/Maps');
};

 return (
  <div className='contimpon'>
    <div className='contbanner'>
      <div className='imgbanner' onClick={handleMaps}>
       
      </div>
    </div>
  
  </div>
  );
}