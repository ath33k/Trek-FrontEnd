import React from 'react';

const Chip = ({ label, className, onClick }) => {
  return (
    <span
      className={`text-sm font-semibold px-4 py-1 rounded-full cursor-pointer ${className} w-28 md:w-auto mb-2`}
      onClick={onClick}
    >
      {label}
    </span>
  );
};

export default Chip;