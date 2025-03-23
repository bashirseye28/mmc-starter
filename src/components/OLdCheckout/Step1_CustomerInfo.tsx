"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faExclamationCircle,
  faArrowRight,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

interface Step1Props {
  nextStep: () => void;
  customerInfo: CustomerInfo;
  setCustomerInfo: React.Dispatch<React.SetStateAction<CustomerInfo>>;
}

const Step1_CustomerInfo: React.FC<Step1Props> = ({
  nextStep,
  customerInfo,
  setCustomerInfo,
}) => {
  const router = useRouter();
  const [errors, setErrors] = useState<Partial<CustomerInfo>>({});
  const [submitted, setSubmitted] = useState(false);

  // ✅ Auto-focus Name Input on Load
  useEffect(() => {
    document.getElementById("name")?.focus();
  }, []);

  // ✅ Handle Input Changes & Dynamic Validation
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value.trim() }));

    if (submitted) validateForm(); // ✅ Revalidate form on input change
  };

  // ✅ Handle "Enter" Key Submission
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNext();
    }
  };

  // ✅ Form Validation Function
  const validateForm = (): boolean => {
    const newErrors: Partial<CustomerInfo> = {};

    if (!customerInfo.name.trim()) newErrors.name = "Full name is required.";
    if (!customerInfo.email.trim() || !/^[\w.+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(customerInfo.email))
      newErrors.email = "Valid email is required.";
    if (!customerInfo.phone.trim() || !/^\+?[0-9\s()-]{8,15}$/.test(customerInfo.phone))
      newErrors.phone = "Valid phone number is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Proceed to Next Step If Valid
  const handleNext = () => {
    setSubmitted(true);
    if (validateForm()) {
      nextStep();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-primary mb-6 text-center sm:text-left">
        Customer Information
      </h2>

      {/* ✅ Form Fields */}
      <form className="space-y-4" onKeyDown={handleKeyDown}>
        {[
          { name: "name", icon: faUser, placeholder: "Full Name" },
          { name: "email", icon: faEnvelope, placeholder: "Email Address" },
          { name: "phone", icon: faPhone, placeholder: "Phone Number" },
        ].map(({ name, icon, placeholder }) => (
          <div key={name} className="relative">
            <FontAwesomeIcon icon={icon} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold" />
            <input
              id={name}
              type={name === "email" ? "email" : "text"}
              name={name}
              value={customerInfo[name as keyof CustomerInfo]}
              onChange={handleChange}
              className={`w-full p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold ${
                errors[name as keyof CustomerInfo] ? "border-red-500" : "border-gray-300"
              }`}
              placeholder={placeholder}
              aria-invalid={!!errors[name as keyof CustomerInfo]}
            />
            {errors[name as keyof CustomerInfo] && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
                {errors[name as keyof CustomerInfo]}
              </p>
            )}
          </div>
        ))}
      </form>

      {/* ✅ Buttons Section */}
      <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4">
        {/* Back to Shop Button */}
        <button
          onClick={() => router.push("/shop")}
          className="w-full sm:w-auto border-2 border-primary text-primary px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary transition hover:text-white"
        >
          <FontAwesomeIcon icon={faShoppingCart} />
          Continue Shopping
        </button>

        {/* Next Step Button */}
        <button
          onClick={handleNext}
          className="w-full sm:w-auto px-6 py-3 bg-gold text-black font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-500 transition"
        >
          Continue to Shipping
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default Step1_CustomerInfo;