"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  // ✅ Calculate Total Price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <main className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-primary text-center">Your Cart</h1>
      <p className="text-gray-600 text-center mt-2">Review your selected items before checkout.</p>

      {cart.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600">Your cart is empty.</p>
          <Link href="/shop">
            <button className="mt-4 px-6 py-3 bg-primary text-white font-semibold rounded-lg">
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <>
          {/* ✅ Cart Items List */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cart.map((item) => (
              <div key={item.id} className="bg-white border rounded-lg shadow-md p-4">
                {/* ✅ Product Image */}
                <div className="relative w-full h-40">
                  <Image
                    src={item.image || "/placeholder.jpg"}  // ✅ fallback image
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>

                {/* ✅ Product Info */}
                <h3 className="text-lg font-semibold text-primary mt-3">{item.name}</h3>
                <p className="text-gray-600 mt-1">£{item.price.toFixed(2)}</p>

                {/* ✅ Quantity Controls */}
                <div className="flex items-center mt-3 space-x-3">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    disabled={item.quantity <= 1}
                    className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span className="text-lg font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>

                {/* ✅ Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition w-full"
                >
                  <FontAwesomeIcon icon={faTrash} className="mr-2" />
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* ✅ Cart Summary */}
          <div className="mt-12 bg-gray-100 p-6 rounded-lg text-center max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-primary">Order Summary</h2>
            <p className="text-lg font-bold text-gray-700 mt-2">Total: £{totalPrice.toFixed(2)}</p>

            {/* ✅ Clear Cart */}
            <button
              onClick={clearCart}
              className="w-full px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition mt-4"
            >
              Clear Cart
            </button>

            {/* ✅ Checkout Button */}
            <Link href="/checkout">
              <button className="w-full mt-4 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-teal-700 transition">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </main>
  );
};

export default CartPage;