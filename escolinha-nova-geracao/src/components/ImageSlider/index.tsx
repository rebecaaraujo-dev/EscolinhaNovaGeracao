import React from 'react';
import './styles.css';

interface ImageSliderProps {
  images: string[];
  currentSlide: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, currentSlide }) => {
  return (
    <div className="image-slider">
      <div 
        className="image-slider-container"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="image-slide">
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider; 