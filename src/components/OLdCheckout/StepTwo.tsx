"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCity, faMapMarkerAlt, faGlobe, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface ShippingInfo {
  address: string;
  city: string;
  postcode: string;
  country: string;
  shippingMethod: "standard" | "express";
}

interface StepTwoProps {
  onNext: (data: ShippingInfo) => void;
  onBack: () => void;
}

const StepTwo: React.FC<StepTwoProps> = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState<ShippingInfo>({
    address: "",
    city: "",
    postcode: "",
    country: "",
    shippingMethod: "standard",
  });

  const [errors, setErrors] = useState<Partial<ShippingInfo>>({});

  // ✅ Load Saved Shipping Info from LocalStorage
  useEffect(() => {
    const savedData = localStorage.getItem("shippingInfo");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // ✅ Auto-Save Shipping Info
  useEffect(() => {
    localStorage.setItem("shippingInfo", JSON.stringify(formData));
  }, [formData]);

  // ✅ Validation Function
  const validate = () => {
    const newErrors: Partial<ShippingInfo> = {};
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.postcode) newErrors.postcode = "Postcode is required";
    if (!formData.country) newErrors.country = "Country is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="w-full">
      {/* ✅ Title */}
      <h2 className="text-2xl font-semibold text-primary mb-6 text-center">Shipping Details</h2>

      {/* ✅ Input Fields */}
      <InputField
        label="Street Address"
        icon={faHome}
        type="text"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        error={errors.address}
      />
      <InputField
        label="City"
        icon={faCity}
        type="text"
        value={formData.city}
        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        error={errors.city}
      />
      <InputField
        label="Postcode"
        icon={faMapMarkerAlt}
        type="text"
        value={formData.postcode}
        onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
        error={errors.postcode}
      />
      <InputField
        label="Country"
        icon={faGlobe}
        type="text"
        value={formData.country}
        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
        error={errors.country}
      />

      {/* ✅ Shipping Method Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Shipping Method</label>
        <div className="mt-2 flex gap-4">
          <button
            className={`w-1/2 p-3 rounded-lg border-2 text-lg transition-all ${
              formData.shippingMethod === "standard"
                ? "border-primary bg-primary text-white"
                : "border-gray-300 text-gray-700 hover:border-primary"
            }`}
            onClick={() => setFormData({ ...formData, shippingMethod: "standard" })}
          >
            📦 Standard (£3.99)
          </button>
          <button
            className={`w-1/2 p-3 rounded-lg border-2 text-lg transition-all ${
              formData.shippingMethod === "express"
                ? "border-gold bg-gold text-black"
                : "border-gray-300 text-gray-700 hover:border-gold"
            }`}
            onClick={() => setFormData({ ...formData, shippingMethod: "express" })}
          >
            ⚡ Express (£7.99)
          </button>
        </div>
      </div>

      {/* ✅ Buttons Section */}
      <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4">
        {/* Back to Customer Info */}
        <button
          onClick={onBack}
          className="w-full sm:w-auto border-2 border-primary text-primary px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary transition hover:text-white"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Customer Info
        </button>

        {/* Continue to Review Order */}
        <button
          onClick={() => validate() && onNext(formData)}
          className="w-full sm:w-auto px-6 py-3 bg-gold text-black font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-500 transition"
        >
          Continue to Review
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default StepTwo;

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