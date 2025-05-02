"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface CustomerInfoProps {
  onNext: (data: { name: string; email: string; phone: string }) => void;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ onNext }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (value.trim() !== "") {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleNext = () => {
    const newErrors = {
      fullName: formData.fullName.trim() ? "" : "Full name is required.",
      email: formData.email.trim() ? "" : "Email is required.",
      phone: formData.phone.trim() ? "" : "Phone number is required.",
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((msg) => msg !== "");
    if (!hasErrors) {
      onNext({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
      });
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-primary mb-6">Customer Information</h2>

      <form className="space-y-5" noValidate>
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            autoComplete="name"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Dongo Daara"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.fullName
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-gold"
            }`}
          />
          {errors.fullName && (
            <p className="text-sm text-red-500 mt-1 transition-opacity duration-300">
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            autoComplete="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="bashir@example.com"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-gold"
            }`}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1 transition-opacity duration-300">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            autoComplete="tel"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+44 123 4567 890"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.phone
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-gold"
            }`}
          />
          {errors.phone && (
            <p className="text-sm text-red-500 mt-1 transition-opacity duration-300">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between mt-8 gap-4">
          <button
            type="button"
            onClick={() => router.push("/shop")}
            className="w-full sm:w-auto border-2 border-primary text-primary px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition"
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            Continue Shopping
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="w-full sm:w-auto bg-gold text-black px-6 py-3 font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-500 transition"
          >
            Continue to Delivery
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerInfo;