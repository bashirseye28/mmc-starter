"use client";

interface ProgressIndicatorProps {
  step: number;
}

const ProgressIndicator = ({ step }: ProgressIndicatorProps) => {
  const steps = ["Customer Info", "Shipping", "Review", "Payment"];

  return (
    <div className="flex justify-between items-center mb-6 px-2 sm:px-4">
      {steps.map((label, index) => (
        <div key={index} className="flex-1 flex flex-col items-center min-w-[80px]">
          {/* Step Number */}
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full font-bold transition-all ${
              step >= index + 1 ? "bg-primary text-white" : "bg-gray-300 text-gray-600"
            }`}
          >
            {index + 1}
          </div>

          {/* Step Label (Mobile & Desktop Friendly) */}
          <p
            className={`text-xs sm:text-sm mt-2 text-center truncate ${
              step >= index + 1 ? "text-primary font-semibold" : "text-gray-500"
            }`}
          >
            {label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProgressIndicator;