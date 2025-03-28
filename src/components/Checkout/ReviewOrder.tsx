"use client";

import { useState, useEffect } from "react";
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
  cartItems: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
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

  const [editedCustomer, setEditedCustomer] = useState({
    name: customerData?.name || "",
    email: customerData?.email || "",
    phone: customerData?.phone || "",
  });

  const [editedShipping, setEditedShipping] = useState({
    address: shippingData?.address || "",
    city: shippingData?.city || "",
    postcode: shippingData?.postcode || "",
  });

  useEffect(() => {
    setEditedCustomer({
      name: customerData?.name || "",
      email: customerData?.email || "",
      phone: customerData?.phone || "",
    });
    setEditedShipping({
      address: shippingData?.address || "",
      city: shippingData?.city || "",
      postcode: shippingData?.postcode || "",
    });
  }, [customerData, shippingData]);

  const handleSavePersonal = () => {
    updateCustomerData(editedCustomer);
    setIsEditingPersonal(false);
  };

  const handleSaveShipping = () => {
    updateShippingData({
      ...shippingData,
      ...editedShipping,
    });
    setIsEditingShipping(false);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-primary mb-6">Review Your Order</h2>

      {/* 👤 Personal & Shipping Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        {/* Personal Info */}
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 relative">
          <h3 className="text-lg font-semibold text-gray-700">
            <FontAwesomeIcon icon={faUser} className="text-primary mr-2" />
            Customer Info
          </h3>
          <button
            onClick={() => setIsEditingPersonal(!isEditingPersonal)}
            className="absolute top-4 right-4 bg-white border px-3 py-2 rounded hover:shadow transition"
          >
            <FontAwesomeIcon icon={isEditingPersonal ? faSave : faEdit} />
          </button>
          <div className="mt-3 space-y-2 text-sm text-gray-700">
            {isEditingPersonal ? (
              <>
                <input
                  type="text"
                  value={editedCustomer.name}
                  onChange={(e) =>
                    setEditedCustomer({ ...editedCustomer, name: e.target.value })
                  }
                  placeholder="Full Name"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="email"
                  value={editedCustomer.email}
                  onChange={(e) =>
                    setEditedCustomer({ ...editedCustomer, email: e.target.value })
                  }
                  placeholder="Email"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="tel"
                  value={editedCustomer.phone}
                  onChange={(e) =>
                    setEditedCustomer({ ...editedCustomer, phone: e.target.value })
                  }
                  placeholder="Phone"
                  className="w-full p-2 border rounded"
                />
                <button
                  onClick={handleSavePersonal}
                  className="mt-2 px-4 py-2 bg-primary text-white rounded hover:bg-green-700"
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

        {/* Delivery Info */}
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 relative">
          <h3 className="text-lg font-semibold text-gray-700">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary mr-2" />
            Shipping Info
          </h3>
          <button
            onClick={() => setIsEditingShipping(!isEditingShipping)}
            className="absolute top-4 right-4 bg-white border px-3 py-2 rounded hover:shadow transition"
          >
            <FontAwesomeIcon icon={isEditingShipping ? faSave : faEdit} />
          </button>
          <div className="mt-3 space-y-2 text-sm text-gray-700">
            {isEditingShipping ? (
              <>
                <input
                  type="text"
                  value={editedShipping.address}
                  onChange={(e) =>
                    setEditedShipping({ ...editedShipping, address: e.target.value })
                  }
                  placeholder="Address"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  value={editedShipping.city}
                  onChange={(e) =>
                    setEditedShipping({ ...editedShipping, city: e.target.value })
                  }
                  placeholder="City"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  value={editedShipping.postcode}
                  onChange={(e) =>
                    setEditedShipping({ ...editedShipping, postcode: e.target.value })
                  }
                  placeholder="Postcode"
                  className="w-full p-2 border rounded"
                />
                <button
                  onClick={handleSaveShipping}
                  className="mt-2 px-4 py-2 bg-primary text-white rounded hover:bg-green-700"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <p><strong>Address:</strong> {shippingData.address}</p>
                <p><strong>City:</strong> {shippingData.city}</p>
                <p><strong>Postcode:</strong> {shippingData.postcode}</p>
                <p><strong>Method:</strong> {shippingData.shippingType}</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 🛍 Cart Summary */}
      <h3 className="text-lg font-semibold text-primary mb-4">Cart Summary</h3>
      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b py-4">
            <div className="flex items-center gap-4">
              <Image src={item.image} alt={item.name} width={50} height={50} className="rounded" />
              <div>
                <p className="font-medium text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500">£{item.price.toFixed(2)} each</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                <FontAwesomeIcon icon={faMinus} className="text-primary" />
              </button>
              <span className="font-semibold">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                <FontAwesomeIcon icon={faPlus} className="text-primary" />
              </button>
              <button onClick={() => removeFromCart(item.id)}>
                <FontAwesomeIcon icon={faTrash} className="text-red-500" />
              </button>
            </div>

            <p className="font-medium text-gray-700">
              £{(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}

        {/* Totals */}
        <div className="text-right mt-4 space-y-1 text-sm">
          <p>Subtotal: <span className="font-semibold">£{subtotal.toFixed(2)}</span></p>
          <p>Shipping: <span className="font-semibold">£{shippingData.shippingCost.toFixed(2)}</span></p>
          <p className="text-lg font-bold text-primary">Total: £{total.toFixed(2)}</p>
        </div>
      </div>

      {/* ✅ Buttons */}
      <div className="flex justify-between mt-8 gap-4">
        <button
          onClick={onBack}
          className="border-2 border-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition"
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>
        <button
          onClick={onNext}
          className="px-6 py-3 bg-gold text-black rounded-lg hover:bg-yellow-500 transition"
        >
          Proceed to Payment <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default ReviewOrder;