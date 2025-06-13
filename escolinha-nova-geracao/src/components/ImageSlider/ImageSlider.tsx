import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './styles.css';

interface ImageSliderProps {
  images: string[];
  interval?: number;
  currentSlide?: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, interval = 10000, currentSlide }) => {
  const [currentIndex, setCurrentIndex] = useState(currentSlide || 0);

  useEffect(() => {
    if (currentSlide !== undefined) {
      setCurrentIndex(currentSlide);
    }
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (currentSlide === undefined) {
      const timer = setInterval(nextSlide, interval);
      return () => clearInterval(timer);
    }
  }, [images.length, interval, currentSlide]);

  return (
    <div className="slider-container">
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="slider-image"
      />
      <button className="slider-arrow prev" onClick={prevSlide} aria-label="Slide anterior">
        <FaChevronLeft />
      </button>
      <button className="slider-arrow next" onClick={nextSlide} aria-label="Próximo slide">
        <FaChevronRight />
      </button>
    </div>
  );
};

export default ImageSlider;