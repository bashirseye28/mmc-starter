"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faTruckFast,
  faClipboardList,
  faCreditCard,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

const steps = [
  { label: "User Details", icon: faUser },
  { label: "Shipping", icon: faTruckFast },
  { label: "Review", icon: faClipboardList },
  { label: "Payment", icon: faCreditCard },
];

interface ProgressIndicatorProps {
  currentStep: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="relative flex justify-between items-center w-full max-w-4xl mx-auto px-4 overflow-x-auto scrollbar-hide flex-nowrap mb-6">
      {steps.map((step, index) => (
        <div key={index} className="relative flex flex-col items-center w-full min-w-[70px]">
          {/* ✅ Step Connector Line */}
          {index > 0 && (
            <div
              className={`absolute top-1/2 left-0 w-[80%] sm:w-full h-[2px] transition-all duration-300 -z-10
              ${index < currentStep ? "bg-primary" : "bg-gray-300"}`}
              style={{ transform: "translateY(-50%)" }}
            />
          )}

          {/* ✅ Step Circle with Your Preferred Size */}
          <div
            className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-base sm:text-lg font-medium transition-all duration-300 border-2 shadow-md
              ${
                index < currentStep
                  ? "bg-primary text-white border-primary shadow-md" // ✅ Completed steps
                  : index === currentStep
                  ? "bg-gold text-black border-gold scale-110 shadow-md ring-2 ring-gold" // ✅ Active step
                  : "bg-gray-300 text-gray-700 border-gray-300" // ✅ Upcoming steps
              } hover:scale-105 transition-transform`}
          >
            {index < currentStep ? (
              <FontAwesomeIcon icon={faCheckCircle} className="text-white text-base sm:text-lg" />
            ) : (
              <FontAwesomeIcon icon={step.icon} className="text-base sm:text-lg" />
            )}
          </div>

          {/* ✅ Step Label - Matching Your Preferred Structure */}
          <p
            className={`text-xs sm:text-sm mt-2 text-center transition-all duration-300
              ${index === currentStep ? "text-primary font-semibold" : "text-gray-600 opacity-80"}`}
          >
            {step.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProgressIndicator;