import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const FavoriteButton = ({ initialFavorite = false }) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <button 
      className="flex items-center p-2 bg-white rounded-full shadow-md focus:outline-none" 
      onClick={toggleFavorite}
      aria-label="Toggle Favorite"
    >
      {isFavorite ? (
        <FaHeart className="text-red-500 w-6 h-6" />
      ) : (
        <FaRegHeart className="text-gray-500 w-6 h-6" />
      )}
    </button>
  );
};

export default FavoriteButton;
