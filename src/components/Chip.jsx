import React from "react";

const Chip = ({ label, startIcon, endIcon, className = "", onClick }) => {
  const bgcolors = [
    "bg-red-300",
    "bg-blue-300",
    "bg-green-300",
    "bg-yellow-300",
    "bg-indigo-300",
    "bg-purple-300",
    "bg-pink-300",
  ];
  const _className = `text-sm w-fit inline-flex justify-center items-center font-semibold ${
    className.includes("bg-")
      ? ""
      : bgcolors[Math.floor(Math.random() * bgcolors.length)]
  } px-4 py-2 rounded-full cursor-pointer ${className}`;

  return (
    <div className={_className} onClick={onClick}>
      {startIcon && <span className="mr-2 text-inherit">{startIcon}</span>}
      <span>{label}</span>
      {endIcon && <span className="ml-2 text-inherit">{endIcon}</span>}
    </div>
  );
};

export default Chip;
