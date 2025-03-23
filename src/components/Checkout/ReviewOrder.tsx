"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMapMarkerAlt,
  faEdit,
  faSave,
  faPlus,
  faMinus,
  faTrash,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

interface ReviewOrderProps {
  customerData: { name: string; email: string; phone: string };
  shippingData: { 
    address: string; 
    city: string; 
    postcode: string; 
    country: string; 
    shippingCost: number;
    shippingType: string;
  };
  cartItems: { id: string; name: string; price: number; quantity: number; image: string }[];
  subtotal: number;
  total: number;
  onNext: () => void;
  onBack: () => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  updateCustomerData: (data: any) => void;
  updateShippingData: (data: any) => void;
}

const ReviewOrder = ({
  customerData,
  shippingData,
  cartItems,
  subtotal,
  total,
  onNext,
  onBack,
  updateQuantity,
  removeFromCart,
  updateCustomerData,
  updateShippingData,
}: ReviewOrderProps) => {
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingShipping, setIsEditingShipping] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState({ ...customerData });
  const [editedShipping, setEditedShipping] = useState({ ...shippingData });

  // ✅ Save Personal Details
  const handleSavePersonal = () => {
    updateCustomerData(editedCustomer);
    setIsEditingPersonal(false);
  };

  // ✅ Save Shipping Address
  const handleSaveShipping = () => {
    updateShippingData(editedShipping);
    setIsEditingShipping(false);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-primary mb-6">Review Your Order</h2>

      {/* ✅ Editable Personal & Delivery Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        
        {/* Personal Details */}
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 relative">
          <h3 className="text-lg font-semibold text-gray-700">
            <FontAwesomeIcon icon={faUser} className="text-primary" /> Personal Details
          </h3>
          <button 
            onClick={() => setIsEditingPersonal(!isEditingPersonal)} 
            className="absolute top-4 right-4 bg-white border p-2 rounded-lg hover:shadow-md transition"
          >
            <FontAwesomeIcon icon={isEditingPersonal ? faSave : faEdit} />
          </button>
          <div className="mt-2 text-gray-600 space-y-2">
            {isEditingPersonal ? (
              <>
                <input 
                  type="text"
                  className="w-full p-2 border rounded"
                  value={editedCustomer.name}
                  onChange={(e) => setEditedCustomer({ ...editedCustomer, name: e.target.value })}
                />
                <input 
                  type="email"
                  className="w-full p-2 border rounded"
                  value={editedCustomer.email}
                  onChange={(e) => setEditedCustomer({ ...editedCustomer, email: e.target.value })}
                />
                <input 
                  type="tel"
                  className="w-full p-2 border rounded"
                  value={editedCustomer.phone}
                  onChange={(e) => setEditedCustomer({ ...editedCustomer, phone: e.target.value })}
                />
                <button 
                  onClick={handleSavePersonal}
                  className="mt-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-700"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <p><strong>Name:</strong> {customerData.name}</p>
                <p><strong>Email:</strong> {customerData.email}</p>
                <p><strong>Phone:</strong> {customerData.phone}</p>
              </>
            )}
          </div>
        </div>

        {/* ✅ Editable Delivery Details */}
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 relative">
          <h3 className="text-lg font-semibold text-gray-700">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary" /> Delivery Information
          </h3>
          <button 
            onClick={() => setIsEditingShipping(!isEditingShipping)} 
            className="absolute top-4 right-4 bg-white border p-2 rounded-lg hover:shadow-md transition"
          >
            <FontAwesomeIcon icon={isEditingShipping ? faSave : faEdit} />
          </button>
          <div className="mt-2 text-gray-600 space-y-2">
            {isEditingShipping ? (
              <>
                <input 
                  type="text"
                  className="w-full p-2 border rounded"
                  value={editedShipping.address}
                  onChange={(e) => setEditedShipping({ ...editedShipping, address: e.target.value })}
                />
                <input 
                  type="text"
                  className="w-full p-2 border rounded"
                  value={editedShipping.city}
                  onChange={(e) => setEditedShipping({ ...editedShipping, city: e.target.value })}
                />
                <input 
                  type="text"
                  className="w-full p-2 border rounded"
                  value={editedShipping.postcode}
                  onChange={(e) => setEditedShipping({ ...editedShipping, postcode: e.target.value })}
                />
                <button 
                  onClick={handleSaveShipping}
                  className="mt-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-700"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <p><strong>Address:</strong> {shippingData.address}</p>
                <p><strong>City:</strong> {shippingData.city}</p>
                <p><strong>Postcode:</strong> {shippingData.postcode}</p>
                <p><strong>Delivery Method:</strong> {shippingData.shippingType}</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ✅ Order Summary */}
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Order Summary</h3>
      <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b py-3">
            <div className="flex items-center gap-3">
              <Image src={item.image} alt={item.name} width={50} height={50} className="rounded-lg" />
              <p className="text-gray-700 font-medium">{item.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-primary">
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <span className="font-semibold">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-primary">
                <FontAwesomeIcon icon={faPlus} />
              </button>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500">
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
            <p className="text-gray-700 font-medium">£{(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* ✅ Buttons */}
      <div className="flex justify-between mt-8 gap-4">
        <button onClick={onBack} className="border-2 border-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white">
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>
        <button onClick={onNext} className="px-6 py-3 bg-gold text-black rounded-lg hover:bg-yellow-500">
          Proceed to Payment <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default ReviewOrder;