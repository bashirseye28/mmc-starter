"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faPhone, faShoppingCart, faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface StepOneProps {
  onNext: (data: { name: string; email: string; phone: string }) => void;
}

const StepOne: React.FC<StepOneProps> = ({ onNext }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

  // ✅ Load Saved Customer Info from LocalStorage
  useEffect(() => {
    const savedData = localStorage.getItem("customerInfo");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // ✅ Auto-Save Customer Info
  useEffect(() => {
    localStorage.setItem("customerInfo", JSON.stringify(formData));
  }, [formData]);

  // ✅ Validation Function
  const validate = () => {
    const newErrors: { name?: string; email?: string; phone?: string } = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Enter a valid email";
    if (!formData.phone) newErrors.phone = "Phone is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="w-full">
      {/* ✅ Title */}
      <h2 className="text-2xl font-semibold text-primary mb-6 text-center">Customer Information</h2>

      {/* ✅ Input Fields */}
      <InputField
        label="Full Name"
        icon={faUser}
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        error={errors.name}
      />
      <InputField
        label="Email Address"
        icon={faEnvelope}
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={errors.email}
      />
      <InputField
        label="Phone Number"
        icon={faPhone}
        type="tel"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        error={errors.phone}
      />

      {/* ✅ Buttons Section */}
      <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4">
        {/* Continue Shopping Button */}
        <button
          onClick={() => router.push("/shop")}
          className="w-full sm:w-auto border-2 border-primary text-primary px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary transition hover:text-white"
        >
          <FontAwesomeIcon icon={faShoppingCart} />
          Continue Shopping
        </button>

        {/* Continue to Shipping Button */}
        <button
          onClick={() => validate() && onNext(formData)}
          className="w-full sm:w-auto px-6 py-3 bg-gold text-black font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-500 transition"
        >
          Continue to Shipping
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default StepOne;

/* ✅ Reusable Input Component */
const InputField = ({
  label,
  icon,
  type,
  value,
  onChange,
  error,
}: {
  label: string;
  icon: any;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}) => {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center border-2 rounded-md p-3 transition-all focus-within:border-gold focus-within:ring focus-within:ring-gold">
        <FontAwesomeIcon icon={icon} className="text-gray-500 mr-2" />
        <input
          type={type}
          placeholder={label}
          className="w-full text-lg focus:outline-none"
          value={value}
          onChange={onChange}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};