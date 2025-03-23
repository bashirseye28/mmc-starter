"use client";
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
  { label: "Review Order", icon: faClipboardList },
  { label: "Payment", icon: faCreditCard }, // ✅ Payment is now LAST
];

const CheckoutSteps = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="relative flex justify-between items-center mb-6">
      {steps.map((step, index) => (
        <div key={index} className="relative flex flex-col items-center w-full">
          {/* ✅ Step Connector Line (Avoid rendering for first step) */}
          {index > 0 && (
            <div
              className={`absolute top-1/2 left-0 w-[80%] sm:w-full h-[2px] transition-all duration-300 -z-10
              ${index < currentStep ? "bg-primary" : "bg-gray-300"}
              `}
              style={{ transform: "translateY(-50%)" }} // Fix positioning issues
            />
          )}

          {/* ✅ Step Circle */}
          <div
            className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-base sm:text-lg font-medium transition-all duration-300
            ${index + 1 === currentStep ? "bg-gold text-black scale-110 shadow-md" :
              index + 1 < currentStep ? "bg-primary text-white shadow-md" : "bg-gray-300 text-gray-700"}
            `}
            aria-current={index + 1 === currentStep ? "step" : undefined}
          >
            {index + 1 < currentStep ? (
              <FontAwesomeIcon icon={faCheckCircle} />
            ) : (
              <FontAwesomeIcon icon={step.icon} />
            )}
          </div>

          {/* ✅ Step Label */}
          <p
            className={`text-xs sm:text-sm mt-2 text-center transition-all duration-300
            ${index + 1 === currentStep ? "text-primary font-semibold" : "text-darkText opacity-70"}
            `}
          >
            {step.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CheckoutSteps;