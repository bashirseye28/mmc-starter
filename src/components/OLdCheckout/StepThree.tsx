"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "@/context/CartContext";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface StepThreeProps {
  customerInfo: { name: string; email: string; phone: string };
  shippingInfo: { address: string; city: string; postcode: string; country: string; shippingMethod: "standard" | "express" };
  cartItems: CartItem[];
  onBack: () => void;
  onNext: () => void;
}

const StepThree: React.FC<StepThreeProps> = ({ customerInfo, shippingInfo, cartItems, onBack, onNext }) => {
  const { updateQuantity, removeFromCart } = useCart();

  // ✅ Calculate Total Amount (Including Shipping)
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingCost = shippingInfo.shippingMethod === "express" ? 7.99 : 3.99;
  const totalAmount = subtotal + shippingCost;

  return (
    <div className="w-full">
      {/* ✅ Title */}
      <h2 className="text-2xl font-semibold text-primary mb-6 text-center">Review Your Order</h2>

      {/* ✅ Customer & Shipping Info */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <p className="text-gray-700 font-medium">📍 Shipping To:</p>
        <p className="text-gray-900">{customerInfo.name}, {customerInfo.email}</p>
        <p className="text-gray-900">{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postcode}, {shippingInfo.country}</p>
        <p className="text-gray-700 mt-1">
          🚚 Delivery Method:{" "}
          <span className="font-semibold text-primary">
            {shippingInfo.shippingMethod === "express" ? "Express (£7.99)" : "Standard (£3.99)"}
          </span>
        </p>
      </div>

      {/* ✅ Cart Items */}
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg">
            {/* ✅ Product Image & Info */}
            <div className="flex items-center gap-4">
              <Image src={item.image} alt={item.name} width={60} height={60} className="rounded-md" />
              <div>
                <p className="text-gray-900 font-semibold">{item.name}</p>
                <p className="text-gray-700">£{item.price.toFixed(2)}</p>
              </div>
            </div>

            {/* ✅ Quantity Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                className="px-3 py-1 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-200 transition"
              >
                -
              </button>
              <p className="text-lg font-semibold">{item.quantity}</p>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="px-3 py-1 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-200 transition"
              >
                +
              </button>
            </div>

            {/* ✅ Remove Button */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:text-red-700 transition"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
      </div>

      {/* ✅ Order Summary */}
      <div className="bg-gray-100 p-4 rounded-lg mt-6">
        <p className="text-lg font-semibold text-gray-800">Subtotal:</p>
        <p className="text-xl font-bold text-gray-900">£{subtotal.toFixed(2)}</p>
        <p className="text-sm text-gray-700 mt-1">Shipping: <span className="font-semibold text-primary">£{shippingCost.toFixed(2)}</span></p>
        <p className="text-lg font-semibold text-gray-800 mt-2">Total:</p>
        <p className="text-2xl font-bold text-primary">£{totalAmount.toFixed(2)}</p>
      </div>

      {/* ✅ Navigation Buttons */}
      <div className="flex flex-col sm:flex-row justify-between mt-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="border-2 border-primary text-primary px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-primary transition hover:text-white"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Shipping
        </button>

        {/* Next Step Button */}
        <button
          onClick={onNext}
          className="px-6 py-3 bg-gold text-black font-semibold rounded-lg flex items-center gap-2 hover:bg-yellow-500 transition"
        >
          Continue to Payment
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default StepThree;