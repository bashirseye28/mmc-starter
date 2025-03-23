import React from "react";

interface ProgressProps {
  value: number;
  max: number;
  className?: string;
}

const Progress: React.FC<ProgressProps> = ({ value, max, className }) => {
  const percentage = (value / max) * 100;

  return (
    <div className={`w-full bg-gray-200 rounded-full h-4 overflow-hidden ${className}`}>
      <div
        className="bg-[#007676] h-full transition-all duration-500"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default Progress;