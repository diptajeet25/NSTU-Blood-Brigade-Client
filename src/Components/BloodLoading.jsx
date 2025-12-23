import React from "react";

const BloodRippleLoader = ({ text = "Please wait..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white">
      
      <div className="relative w-16 h-16">
        <span className="absolute inset-0 rounded-full bg-red-600 animate-ripple"></span>
        <span className="absolute inset-0 rounded-full bg-red-600 opacity-80"></span>
      </div>

      <p className="mt-6 text-sm font-medium text-gray-600 tracking-wide">
        {text}
      </p>
    </div>
  );
};

export default BloodRippleLoader;
