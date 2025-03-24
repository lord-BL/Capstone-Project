import React from "react";

const Button = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-green-700 text-white rounded-full font-bold hover:bg-green-400 hover:drop-shadow-xl py-2 px-4 text-lg w-auto"
    >
      {label}
    </button>
  );
};

export default Button;
