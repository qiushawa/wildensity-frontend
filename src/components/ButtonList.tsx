import React, { useState } from "react";

interface ButtonListProps {
  options: string[];
}

const ButtonList: React.FC<ButtonListProps> = ({ options }) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="inline-flex rounded-md shadow-sm" role="group">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => setSelected(option)}
          className={`px-4 py-2 text-sm font-medium border border-gray-300 
            ${
              selected === option
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }
            ${index === 0 ? "rounded-l-lg" : ""}
            ${index === options.length - 1 ? "rounded-r-lg" : ""}
          `}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default ButtonList;
