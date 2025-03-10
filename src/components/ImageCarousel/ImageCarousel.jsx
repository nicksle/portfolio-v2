import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ImageCarousel.css';

export const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) {
    return (
      <div className="image-carousel empty">
        <div className="placeholder">No images available</div>
      </div>
    );
  }

  return (
    <div className="image-carousel">
      <button className="carousel-button prev" onClick={handlePrev}>􀆉</button>
      <div className="carousel-content">
        <img 
          src={images[currentIndex]} 
          alt={`Slide ${currentIndex + 1}`} 
          className="carousel-image"
        />
        <div className="carousel-indicators">
          {images.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
      <button className="carousel-button next" onClick={handleNext}>􀆈</button>
    </div>
  );
};

ImageCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
}; 