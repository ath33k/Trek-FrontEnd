import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';

const ImageGallery = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="image-gallery">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Gallery Image ${index + 1}`}
            className="w-full h-auto cursor-pointer"
            onClick={() => openModal(index)}
          />
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <button 
            className="absolute top-5 right-5 text-white text-3xl" 
            onClick={closeModal}
            aria-label="Close"
          >
            <FaTimes />
          </button>
          <div className="relative w-4/5 max-w-4xl">
            <img 
              src={images[currentImageIndex]} 
              alt={`Gallery Image ${currentImageIndex + 1}`}
              className="w-full h-auto"
            />
            <button 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-50 p-2 rounded-full"
              onClick={prevImage}
              aria-label="Previous Image"
            >
              <FaArrowLeft />
            </button>
            <button 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-50 p-2 rounded-full"
              onClick={nextImage}
              aria-label="Next Image"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
