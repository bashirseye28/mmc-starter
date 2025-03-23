"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faCity, faGlobe, faArrowLeft, faArrowRight, faTruck } from "@fortawesome/free-solid-svg-icons";

interface ShippingDetailsProps {
  onNext: (shippingData: { 
    address: string; 
    city: string; 
    postcode: string; 
    country: string; 
    shippingCost: number;
    shippingType: string; // ✅ Ensure shippingType is included
  }) => void;
  onBack: () => void;
}

const ShippingDetails = ({ onNext, onBack }: ShippingDetailsProps) => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("United Kingdom");
  const [shippingType, setShippingType] = useState("Standard Delivery");
  const [errors, setErrors] = useState({ address: "", city: "", postcode: "" });

  const shippingCost = shippingType === "Standard Delivery" ? 3.99 : 7.99;

  // ✅ Form Validation
  const validateForm = () => {
    let newErrors = { address: "", city: "", postcode: "" };
    let isValid = true;

    if (!address.trim()) {
      newErrors.address = "Address is required.";
      isValid = false;
    }

    if (!city.trim()) {
      newErrors.city = "City is required.";
      isValid = false;
    }

    if (!postcode.trim() || !/^[A-Za-z0-9 ]{3,10}$/.test(postcode)) {
      newErrors.postcode = "Valid Postcode is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // ✅ Handle Next Step
  const handleNext = () => {
    if (validateForm()) {
      onNext({ address, city, postcode, country, shippingCost, shippingType }); // ✅ Ensure shippingType is passed
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold text-primary mb-6">Delivery Information</h2>

      {/* ✅ Address Input */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700">Street Address</label>
        <div className="relative mt-1">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="absolute left-4 top-4 text-gray-500" />
          <input
            type="text"
            className="w-full px-12 py-3 border-2 border-gold rounded-lg focus:ring focus:ring-primary focus:outline-none"
            placeholder="Enter your street address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
      </div>

      {/* ✅ Two-Column Layout for City & Postcode */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        {/* City Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">City</label>
          <div className="relative mt-1">
            <FontAwesomeIcon icon={faCity} className="absolute left-4 top-4 text-gray-500" />
            <input
              type="text"
              className="w-full px-12 py-3 border-2 border-gold rounded-lg focus:ring focus:ring-primary focus:outline-none"
              placeholder="Enter your city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
        </div>

        {/* Postcode Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Postcode</label>
          <input
            type="text"
            className="w-full px-4 py-3 border-2 border-gold rounded-lg focus:ring focus:ring-primary focus:outline-none"
            placeholder="Enter your postcode"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
          />
          {errors.postcode && <p className="text-red-500 text-sm mt-1">{errors.postcode}</p>}
        </div>
      </div>

      {/* ✅ Country Selection */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700">Country</label>
        <div className="relative mt-1">
          <FontAwesomeIcon icon={faGlobe} className="absolute left-4 top-4 text-gray-500" />
          <select
            className="w-full px-12 py-3 border-2 border-gold rounded-lg focus:ring focus:ring-primary focus:outline-none"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option>United Kingdom</option>
            <option>United States</option>
            <option>Canada</option>
            <option>Australia</option>
          </select>
        </div>
      </div>

      {/* ✅ Delivery Options Dropdown */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700">Delivery Options</label>
        <div className="relative mt-1">
          <FontAwesomeIcon icon={faTruck} className="absolute left-4 top-4 text-gray-500" />
          <select
            className="w-full px-12 py-3 border-2 border-gold rounded-lg focus:ring focus:ring-primary focus:outline-none"
            value={shippingType}
            onChange={(e) => setShippingType(e.target.value)}
          >
            <option value="Standard Delivery">Standard (2-3 Days) - £3.99</option>
            <option value="Express Delivery">Express (Next Day) - £7.99</option>
          </select>
        </div>
      </div>

      {/* ✅ Buttons Section */}
      <div className="flex flex-col sm:flex-row justify-between mt-8 gap-4">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="w-full sm:w-auto border-2 border-primary text-primary px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary transition hover:text-white"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Customer Info
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="w-full sm:w-auto px-6 py-3 bg-gold text-black font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-500 transition"
        >
          Continue to Review
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default ShippingDetails;