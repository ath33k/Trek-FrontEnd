import React, { useState, useEffect } from 'react';

const ImageCarousel = ({ images, customClasses }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === images.length - 1 ? 0 : prevSlide + 1
      );
    }, 3000); // Change image every 3 seconds

    // Add this to stop the interval when hovering over the carousel
    const pause = () => {
      clearInterval(interval);
    };

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={`relative ${customClasses.container}`}>
      <div className="overflow-hidden w-full"
           onMouseEnter={pause}
           onMouseLeave={start}>
        <div
          className="whitespace-nowrap transition-transform ease-in-out duration-700"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={`Slide ${index}`}
              className={`inline-block w-full h-auto ${customClasses.image}`}
              style={{ marginRight: customClasses.spacing || 0 }}
            />
          ))}
        </div>
      </div>
      <div className={`absolute bottom-0 left-0 right-0 flex justify-center p-4 ${customClasses.pagination}`}>
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 mx-1 rounded-full ${
              index === currentSlide ? 'bg-white' : 'bg-gray-400'
            } ${customClasses.dot}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;