import React from 'react';
import Chip from './Chip';

const ChipGroup = ({ price, mapsUrl }) => {
  return (
    <div className="flex flex-col md:flex-row gap-2 mt-6">
      <Chip
        label={`LKR ${price} per person`}
        className="bg-blue-200 text-blue-800 w-2/5 md:w-auto text-center" 
      />
      <Chip
        label="Google Map"
        className="bg-green-200 text-green-800 " 
        onClick={() => window.open(mapsUrl, '_blank')}
      />
    </div>
  );
};

export default ChipGroup;