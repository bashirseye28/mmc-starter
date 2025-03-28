"use client";

import { useState } from "react";
import {
  MapPin,
  Landmark,
  Globe,
  Truck,
  ArrowLeft,
  ArrowRight,
  CalendarClock,
} from "lucide-react";

interface ShippingDetailsProps {
  onNext: (shippingData: {
    address: string;
    city: string;
    postcode: string;
    country: string;
    shippingCost: number;
    shippingType: string;
  }) => void;
  onBack: () => void;
}

const ShippingDetails = ({ onNext, onBack }: ShippingDetailsProps) => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("United Kingdom");
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [errors, setErrors] = useState({ address: "", city: "", postcode: "" });

  const deliveryCost =
    deliveryMethod === "standard"
      ? 3.99
      : deliveryMethod === "express"
      ? 7.99
      : 0;

  const validateForm = () => {
    const newErrors = { address: "", city: "", postcode: "" };
    let isValid = true;

    if (deliveryMethod !== "collection") {
      if (!address.trim()) {
        newErrors.address = "Street address is required.";
        isValid = false;
      }
      if (!city.trim()) {
        newErrors.city = "City is required.";
        isValid = false;
      }
      if (!postcode.trim() || !/^[A-Za-z0-9 ]{3,10}$/.test(postcode)) {
        newErrors.postcode = "Enter a valid UK postcode.";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext({
        address,
        city,
        postcode,
        country,
        shippingCost: deliveryCost,
        shippingType:
          deliveryMethod === "collection"
            ? "Collection"
            : deliveryMethod === "express"
            ? "Express Delivery"
            : "Standard Delivery",
      });
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-bold text-primary mb-6">Shipping Method</h2>

      {/* Delivery Option */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Choose a delivery option
        </label>
        <div className="relative">
          <Truck className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
          <select
            value={deliveryMethod}
            onChange={(e) => setDeliveryMethod(e.target.value)}
            className="w-full px-12 py-3 border-2 border-gold rounded-lg focus:ring-primary focus:outline-none"
          >
            <option value="standard">Standard Delivery (2–3 Days) — £3.99</option>
            <option value="express">Express Delivery (Next Day) — £7.99</option>
            <option value="collection">Collect in Person — Free</option>
          </select>
        </div>
      </div>

      {/* Address Inputs (Conditional) */}
      {deliveryMethod !== "collection" && (
        <>
          <h3 className="text-lg font-semibold text-primary mb-4">Delivery Address</h3>

          {/* Street Address */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Street Address
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Murid Road"
                className={`w-full px-12 py-3 border-2 rounded-lg focus:outline-none ${
                  errors.address ? "border-red-500" : "border-gold"
                }`}
              />
            </div>
            {errors.address && (
              <p className="text-sm text-red-500 mt-1">{errors.address}</p>
            )}
          </div>

          {/* City & Postcode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <div className="relative">
                <Landmark className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Manchester"
                  className={`w-full px-12 py-3 border-2 rounded-lg focus:outline-none ${
                    errors.city ? "border-red-500" : "border-gold"
                  }`}
                />
              </div>
              {errors.city && (
                <p className="text-sm text-red-500 mt-1">{errors.city}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Postcode
              </label>
              <input
                type="text"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                placeholder="M8 0PN"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
                  errors.postcode ? "border-red-500" : "border-gold"
                }`}
              />
              {errors.postcode && (
                <p className="text-sm text-red-500 mt-1">{errors.postcode}</p>
              )}
            </div>
          </div>
        </>
      )}

      {/* Country — always last in UK format */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Country
        </label>
        <div className="relative">
          <Globe className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-12 py-3 border-2 border-gold rounded-lg focus:outline-none focus:ring"
            disabled={deliveryMethod === "collection"}
          >
            {deliveryMethod === "collection" ? (
              <option>United Kingdom</option>
            ) : (
              <>
                <option>United Kingdom</option>
                <option>United States</option>
                <option>France</option>
                <option>Canada</option>
              </>
            )}
          </select>
        </div>
      </div>

      {/* Collection Details */}
      {deliveryMethod === "collection" && (
        <div className="p-5 mb-6 bg-gray-50 border border-gold rounded-lg">
          <h3 className="text-primary font-semibold mb-2 flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4" /> Collection Point
          </h3>
          <p className="text-sm font-medium text-gray-800">Sunni Muslim Hall</p>
          <p className="text-sm text-gray-600">
            20 Brideoak Street, Manchester, M8 0PN, UK
          </p>
          <p className="text-sm text-gray-600 flex items-center gap-2 mt-2">
            <CalendarClock className="w-4 h-4 text-gold" />
            Mondays, 7:00 – 9:00 PM
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Please bring your order confirmation when collecting.
          </p>
          <a
            href="https://www.google.com/maps?q=20+Brideoak+Street,+Manchester,+M8+0PN"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-sm font-medium bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition"
          >
            View on Google Maps
          </a>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row justify-between mt-8 gap-4">
        <button
          onClick={onBack}
          className="w-full sm:w-auto border-2 border-primary text-primary px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Info
        </button>
        <button
          onClick={handleNext}
          className="w-full sm:w-auto px-6 py-3 bg-gold text-black font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-500 transition"
        >
          Continue to Review
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ShippingDetails;