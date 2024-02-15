// Carousel.js
import React, { useState, useEffect } from 'react';

const Carousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 3000); // Change the image every 3 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [images.length]);

  return (
    <div className="relative w-full ">
      <div className="overflow-hidden">
        <div
          className="whitespace-nowrap transition-transform duration-700"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index}`}
              className="inline-block w-full h-auto"
              style={{ height: '400px' }}
            />
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center p-4">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 mx-1 rounded-full ${
              index === activeIndex ? 'bg-white' : 'bg-gray-400'
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
