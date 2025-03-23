"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

// ✅ Define CartSummary Component
const CartSummary = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  // ✅ Calculate Total Price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // ✅ Generate WhatsApp Order Link
  const generateWhatsAppLink = () => {
    const orderText = cart
      .map((item) => `- ${item.name} x${item.quantity} (£${(item.price * item.quantity).toFixed(2)})`)
      .join("%0A");

    return `https://wa.me/447541475547?text=${encodeURIComponent(
      `Hello, I want to order:\n\n${orderText}\n\nTotal: £${totalPrice.toFixed(2)}`
    )}`;
  };

  return (
    <section className="p-6 bg-white shadow-lg rounded-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-primary text-center">🛒 Your Cart</h2>
      <p className="text-gray-600 text-center mt-2">Review your selected items before checkout.</p>

      {cart.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600">Your cart is empty.</p>
          <button
            onClick={() => router.push("/shop")}
            className="mt-4 px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-opacity-80 transition flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {/* ✅ Cart Items List */}
          <div className="mt-6 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg shadow-md bg-gray-50">
                <div>
                  <h3 className="text-lg font-semibold text-primary">{item.name}</h3>
                  <p className="text-gray-600">£{item.price.toFixed(2)} x {item.quantity}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-800 transition"
                >
                  <FontAwesomeIcon icon={faTrash} size="lg" />
                </button>
              </div>
            ))}
          </div>

          {/* ✅ Order Summary */}
          <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-primary">Order Summary</h3>
            <p className="text-lg font-bold text-gray-700 mt-2">Total: £{totalPrice.toFixed(2)}</p>

            {/* ✅ Checkout Buttons */}
            <div className="mt-6 space-y-4">
              {/* ✅ Stripe Checkout */}
              <button
                onClick={() => router.push("/checkout")}
                className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-opacity-80 transition flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faShoppingCart} />
                Checkout Securely
              </button>

              {/* ✅ WhatsApp Checkout */}
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faWhatsapp} />
                Order via WhatsApp
              </a>

              {/* ✅ Clear Cart */}
              <button
                onClick={clearCart}
                className="w-full px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default CartSummary;