"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCity,
  faMapMarkerAlt,
  faGlobe,
  faTruckFast,
  faExclamationCircle,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

interface ShippingInfo {
  address: string;
  city: string;
  postcode: string;
  country: string;
  deliveryMethod: string;
}

interface Step2Props {
  nextStep: () => void;
  prevStep: () => void;
  shippingInfo: ShippingInfo;
  setShippingInfo: React.Dispatch<React.SetStateAction<ShippingInfo>>;
  shippingCost: number;
  setShippingCost: React.Dispatch<React.SetStateAction<number>>;
}

const Step2_ShippingInfo: React.FC<Step2Props> = ({
  nextStep,
  prevStep,
  shippingInfo,
  setShippingInfo,
  shippingCost,
  setShippingCost,
}) => {
  const [errors, setErrors] = useState<Partial<ShippingInfo>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.getElementById("address")?.focus();
  }, []);

  // ✅ Handle Input Changes & Update Shipping Cost Instantly
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value.trim() }));

    if (name === "deliveryMethod") {
      setShippingCost(value === "express" ? 9.99 : 4.99);
    }

    if (submitted) validateForm();
  };

  // ✅ Allow "Enter" Key for Submission
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNext();
    }
  };

  // ✅ Validate Inputs Before Proceeding
  const validateForm = (): boolean => {
    const newErrors: Partial<ShippingInfo> = {};

    if (!shippingInfo.address.trim()) newErrors.address = "Street address is required.";
    if (!shippingInfo.city.trim()) newErrors.city = "City is required.";
    if (!shippingInfo.postcode.trim() || !/^[A-Za-z0-9 ]{3,10}$/.test(shippingInfo.postcode))
      newErrors.postcode = "Enter a valid postcode.";
    if (!shippingInfo.country.trim()) newErrors.country = "Country is required.";
    if (!shippingInfo.deliveryMethod) newErrors.deliveryMethod = "Select a delivery method.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Proceed to Next Step If Valid
  const handleNext = () => {
    setSubmitted(true);
    if (validateForm()) nextStep();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-primary mb-6">Shipping Information</h2>

      <form className="space-y-5" onKeyDown={handleKeyDown}>
        {/* Street Address */}
        <div className="relative">
          <FontAwesomeIcon icon={faHome} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold" />
          <input
            id="address"
            type="text"
            name="address"
            value={shippingInfo.address}
            onChange={handleChange}
            className={`w-full p-4 pl-12 bg-gray-100 rounded-lg border focus:outline-none focus:ring-2 focus:ring-gold ${
              errors.address ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Street Address"
          />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
        </div>

        {/* City & Postcode */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <FontAwesomeIcon icon={faCity} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold" />
            <input
              type="text"
              name="city"
              value={shippingInfo.city}
              onChange={handleChange}
              className={`w-full p-4 pl-12 bg-gray-100 rounded-lg border focus:outline-none focus:ring-2 focus:ring-gold ${
                errors.city ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="City"
            />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </div>

          <div className="relative">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold" />
            <input
              type="text"
              name="postcode"
              value={shippingInfo.postcode}
              onChange={handleChange}
              className={`w-full p-4 pl-12 bg-gray-100 rounded-lg border focus:outline-none focus:ring-2 focus:ring-gold ${
                errors.postcode ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Postcode"
            />
            {errors.postcode && <p className="text-red-500 text-xs mt-1">{errors.postcode}</p>}
          </div>
        </div>

        {/* Country & Delivery */}
        <div className="relative">
          <FontAwesomeIcon icon={faGlobe} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold" />
          <input type="text" name="country" value={shippingInfo.country} onChange={handleChange} className="w-full p-4 pl-12 bg-gray-100 rounded-lg border" placeholder="Country" />
        </div>
      </form>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <button onClick={prevStep} className="btn-secondary"><FontAwesomeIcon icon={faArrowLeft} /> Back</button>
        <button onClick={handleNext} className="btn-primary">Continue <FontAwesomeIcon icon={faArrowRight} /></button>
      </div>
    </div>
  );
};

export default Step2_ShippingInfo;