"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faPhone, faShoppingCart, faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface CustomerInfoProps {
  onNext: (customerData: { name: string; email: string; phone: string }) => void;
}

const CustomerInfo = ({ onNext }: CustomerInfoProps) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", phone: "" });

  // ✅ Form Validation
  const validateForm = () => {
    let newErrors = { name: "", email: "", phone: "" };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = "Full Name is required.";
      isValid = false;
    }

    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Valid Email is required.";
      isValid = false;
    }

    if (!phone.trim() || !/^\+?[0-9]{7,15}$/.test(phone)) {
      newErrors.phone = "Valid Phone Number is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // ✅ Handle Next Step
  const handleNext = () => {
    if (validateForm()) {
      onNext({ name, email, phone });
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold text-primary mb-6">Personal Information</h2>

      {/* ✅ Full Name Input */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700">Full Name</label>
        <div className="relative mt-1">
          <FontAwesomeIcon icon={faUser} className="absolute left-4 top-4 text-gray-500" />
          <input
            type="text"
            className="w-full px-12 py-3 border-2 border-gold rounded-lg focus:ring focus:ring-primary focus:outline-none"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      {/* ✅ Email Input */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700">Email Address</label>
        <div className="relative mt-1">
          <FontAwesomeIcon icon={faEnvelope} className="absolute left-4 top-4 text-gray-500" />
          <input
            type="email"
            className="w-full px-12 py-3 border-2 border-gold rounded-lg focus:ring focus:ring-primary focus:outline-none"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      {/* ✅ Phone Input */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
        <div className="relative mt-1">
          <FontAwesomeIcon icon={faPhone} className="absolute left-4 top-4 text-gray-500" />
          <input
            type="tel"
            className="w-full px-12 py-3 border-2 border-gold rounded-lg focus:ring focus:ring-primary focus:outline-none"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>

      {/* ✅ Buttons Section */}
      <div className="flex flex-col sm:flex-row justify-between mt-8 gap-4">
        {/* Back to Shop Button (Now Works Correctly) */}
        <button
          onClick={() => router.push("/shop")}
          className="w-full sm:w-auto border-2 border-primary text-primary px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary transition hover:text-white"
        >
          <FontAwesomeIcon icon={faShoppingCart} />
          Continue Shopping
        </button>

        {/* Next Step Button (Now Works Correctly) */}
        <button
          onClick={handleNext}
          className="w-full sm:w-auto px-6 py-3 bg-gold text-black font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-500 transition"
        >
          Continue to Delivery
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default CustomerInfo;