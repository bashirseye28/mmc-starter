"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

const CartSummary: React.FC = () => {
  const { cart, clearCart } = useCart();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="bg-gray-100 rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-semibold text-primary">Order Summary</h2>

      <div className="flex justify-between mt-4 text-gray-700">
        <span>Subtotal</span>
        <span>£{subtotal.toFixed(2)}</span>
      </div>

      <button
        onClick={clearCart}
        className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
      >
        Clear Cart
      </button>

      <Link href="/checkout">
        <button className="mt-4 w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition">
          Proceed to Checkout
        </button>
      </Link>
    </div>
  );
};

export default CartSummary;