"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faUser,
  faShoppingBag,
  faMapMarkerAlt,
  faTruck,
  faEdit,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postcode: string;
}

interface ShippingInfo {
  address: string;
  city: string;
  postcode: string;
  country: string;
}

interface Step3Props {
  customerInfo: CustomerInfo;
  setCustomerInfo: React.Dispatch<React.SetStateAction<CustomerInfo>>;
  selectedShipping?: "standard" | "express";
  shippingInfo: ShippingInfo;
  shippingCost: number;
  nextStep: () => void;
  prevStep: () => void;
}

const Step3_ReviewConfirm: React.FC<Step3Props> = ({
  customerInfo,
  setCustomerInfo,
  selectedShipping = "standard",
  shippingInfo,
  shippingCost,
  nextStep,
  prevStep,
}) => {
  const { cart = [] } = useCart();

  // ✅ Calculate Order Totals
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const grandTotal = subtotal + shippingCost;

  // ✅ Editable State for Customer Info
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState(customerInfo);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedInfo((prev) => ({ ...prev, [e.target.name]: e.target.value.trim() }));
  };

  const saveChanges = () => {
    setCustomerInfo(editedInfo);
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
      <h3 className="text-2xl font-semibold text-primary mb-6 text-center sm:text-left">
        Review & Confirm Your Order
      </h3>

      {/* ✅ Customer Details - Editable */}
      <div className="p-4 border rounded-lg mb-4 bg-gray-50">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-primary flex items-center gap-2">
            <FontAwesomeIcon icon={faUser} />
            Customer Details
          </h4>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button onClick={saveChanges} className="text-green-500 hover:text-green-700 flex items-center gap-1">
                  <FontAwesomeIcon icon={faCheck} />
                  Save
                </button>
                <button onClick={() => setIsEditing(false)} className="text-red-500 hover:text-red-700 flex items-center gap-1">
                  <FontAwesomeIcon icon={faTimes} />
                  Cancel
                </button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:text-blue-700 flex items-center gap-1">
                <FontAwesomeIcon icon={faEdit} />
                Edit
              </button>
            )}
          </div>
        </div>

        {isEditing ? (
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" name="name" value={editedInfo.name} onChange={handleEditChange} className="w-full border p-3 rounded" placeholder="Full Name" />
            <input type="email" name="email" value={editedInfo.email} onChange={handleEditChange} className="w-full border p-3 rounded" placeholder="Email Address" />
            <input type="text" name="phone" value={editedInfo.phone} onChange={handleEditChange} className="w-full border p-3 rounded" placeholder="Phone Number" />
          </div>
        ) : (
          <div className="mt-3 text-gray-600">
            <p>{customerInfo.name}</p>
            <p>{customerInfo.email}</p>
            <p>{customerInfo.phone}</p>
          </div>
        )}
      </div>

      {/* ✅ Delivery Information */}
      <div className="p-4 border rounded-lg mb-4 bg-gray-50">
        <h4 className="font-semibold text-primary flex items-center gap-2">
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          Delivery Address
        </h4>
        <p className="text-gray-600">{shippingInfo.address}</p>
        <p className="text-gray-600">{shippingInfo.city}, {shippingInfo.postcode}, {shippingInfo.country}</p>

        <h4 className="mt-4 font-semibold text-primary flex items-center gap-2">
          <FontAwesomeIcon icon={faTruck} />
          Delivery Option
        </h4>
        <p className="text-gray-600">
          {selectedShipping.charAt(0).toUpperCase() + selectedShipping.slice(1)} Delivery - 
          <strong> £{shippingCost.toFixed(2)}</strong>
        </p>
      </div>

      {/* ✅ Order Summary */}
      <div className="p-4 border rounded-lg mb-4 bg-gray-50">
        <h4 className="font-semibold text-primary flex items-center gap-2">
          <FontAwesomeIcon icon={faShoppingBag} />
          Order Summary
        </h4>
        {cart.length === 0 ? (
          <p className="text-gray-600 mt-2">Your cart is empty.</p>
        ) : (
          <>
            <ul className="mt-2 space-y-2">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between items-center py-2 border-b">
                  <div className="flex items-center gap-4">
                    <Image src={item.image || "/default-product.jpg"} alt={item.name} width={50} height={50} className="rounded-md object-cover" />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">£{item.price.toFixed(2)} x {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold">£{(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-lg font-semibold">
              <div className="flex justify-between"><span>Subtotal:</span><span>£{subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Delivery Cost:</span><span>£{shippingCost.toFixed(2)}</span></div>
              <div className="flex justify-between text-primary text-xl font-bold"><span>Grand Total:</span><span>£{grandTotal.toFixed(2)}</span></div>
            </div>
          </>
        )}
      </div>

      {/* ✅ Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button onClick={prevStep} className="btn-secondary"><FontAwesomeIcon icon={faArrowLeft} /> Go Back</button>
        <button onClick={nextStep} className="btn-primary">Continue to Payment <FontAwesomeIcon icon={faArrowRight} /></button>
      </div>
    </div>
  );
};

export default Step3_ReviewConfirm;