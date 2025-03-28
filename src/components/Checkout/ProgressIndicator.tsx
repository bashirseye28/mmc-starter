"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faTruck,
  faClipboardList,
  faCreditCard,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

interface ProgressIndicatorProps {
  step: number;
}

const ProgressIndicator = ({ step }: ProgressIndicatorProps) => {
  const steps = [
    { label: "Customer Info", icon: faUser },
    { label: "Shipping", icon: faTruck },
    { label: "Review", icon: faClipboardList },
    { label: "Payment", icon: faCreditCard },
  ];

  return (
    <div className="mb-10">
      {/* Progress Steps */}
      <div className="flex justify-between items-center px-2 sm:px-4">
        {steps.map((s, index) => {
          const current = index + 1;
          const isCompleted = step > current;
          const isActive = step === current;

          return (
            <div
              key={s.label}
              className="flex-1 flex flex-col items-center min-w-[80px]"
              aria-current={isActive ? "step" : undefined}
            >
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full font-bold transition-all duration-200 
                  ${
                    isCompleted
                      ? "bg-gold text-white"
                      : isActive
                      ? "bg-white text-primary ring-2 ring-gold"
                      : "bg-gray-300 text-gray-600"
                  }`}
              >
                {isCompleted ? (
                  <FontAwesomeIcon icon={faCheckCircle} className="text-white text-lg" />
                ) : (
                  current
                )}
              </div>

              <p
                className={`text-xs sm:text-sm mt-2 text-center truncate ${
                  isCompleted || isActive
                    ? "text-primary font-semibold"
                    : "text-gray-500"
                }`}
              >
                {s.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-200 rounded mt-6 overflow-hidden">
        <div
          className="h-full bg-gold transition-all duration-300"
          style={{ width: `${(step / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator;