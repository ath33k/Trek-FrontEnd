import React from 'react';

const Chip = ({ label, className, onClick }) => {
  return (
    <span
      className={`text-sm font-semibold px-4 py-1 rounded-full cursor-pointer ${className}`}
      onClick={onClick}
    >
      {label}
    </span>
  );
};

export default Chip;