import React from 'react';
import Chip from './Chip';

const ChipGroup = ({ price, mapsUrl }) => {
  return (
    <div className="flex gap-2">
      <Chip
        label={`LKR ${price} per person`}
        className="bg-blue-200 text-blue-800"
      />
      <Chip
        label="Google Map"
        className="bg-green-200 text-green-800"
        onClick={() => window.open(mapsUrl, '_blank')}
      />
    </div>
  );
};

export default ChipGroup;