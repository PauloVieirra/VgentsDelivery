import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Banner1 from '../../images/banner-1.jpg';
import Banner2 from '../../images/bannersobremesa.jpg';

const BannersCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 1); 
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const slides = [
    <div key={0}>
      <img src={Banner1} alt="Slide 1" />
    </div>
  ];

  return (
    <Carousel showThumbs={false} selectedItem={currentIndex}>
      {slides}
    </Carousel>
  );
};

export default BannersCarousel;
