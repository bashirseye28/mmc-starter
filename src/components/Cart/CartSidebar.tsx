"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faTrash,
  faShoppingCart,
  faMinus,
  faPlus,
  faTruck,
  faShippingFast
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const CartSidebar = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, isCartOpen, closeCart } = useCart();
  const router = useRouter();

  return (
    <>
      {/* ✅ Background Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40 transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* ✅ Cart Sidebar */}
      <div
        className={`fixed top-0 bottom-0 right-0 w-full sm:w-[400px] max-w-[100vw] h-screen bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        } flex flex-col`}
      >
        {/* ✅ Cart Header */}
        <div className="flex justify-between items-center p-5 border-b bg-white">
          <h2 className="text-xl font-bold text-primary flex items-center gap-2">
            <FontAwesomeIcon icon={faShoppingCart} className="text-gold text-lg" />
            Your Cart
          </h2>
          <button onClick={closeCart} className="text-gray-500 hover:text-red-600 transition">
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>

        {/* ✅ Cart Items Section */}
        <div className="flex-1 overflow-y-auto p-5">
          {cart.length === 0 ? (
            <div className="text-center mt-10">
              <p className="text-gray-600 text-lg">Your cart is empty.</p>
              <button
                onClick={closeCart} // ✅ Hides Cart When Clicking "Continue Shopping"
                className="mt-4 px-6 py-3 border border-primary text-primary font-semibold rounded-lg shadow-md hover:bg-primary hover:text-white transition flex items-center gap-2"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.id} className="flex items-center gap-4 p-3 border rounded-lg shadow-sm bg-gray-50">
                  {/* ✅ Product Image */}
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image src={item.image} alt={item.name} layout="fill" objectFit="cover" className="rounded-md" />
                  </div>

                  {/* ✅ Product Details */}
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-primary">{item.name}</h3>
                    <p className="text-sm text-gray-500">£{item.price.toFixed(2)}</p>

                    {/* ✅ Quantity Controls */}
                    <div className="flex items-center mt-2 space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        disabled={item.quantity <= 1}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span className="text-lg font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  </div>

                  {/* ✅ Remove Button */}
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 transition">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ✅ Shipping Information (Read-Only, No Calculation) */}
        {cart.length > 0 && (
          <div className="border-t p-5 bg-white">
            <h3 className="text-lg font-semibold text-primary mb-3">Shipping Options</h3>
            <div className="flex flex-col gap-2 text-gray-700 text-sm">
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faTruck} className="text-primary text-lg" />
                <p>Standard Delivery (3-5 Business Days)</p>
              </div>
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faShippingFast} className="text-primary text-lg" />
                <p>Express Delivery (1-2 Business Days)</p>
              </div>
              <p className="text-gray-500 text-xs mt-2">Delivery costs will be calculated at checkout.</p>
            </div>
          </div>
        )}

        {/* ✅ Fixed Checkout Section */}
        {cart.length > 0 && (
          <div className="border-t p-5 bg-white">
            <div className="flex justify-between text-lg font-semibold text-primary">
              <span>Subtotal:</span>
              <span>£{cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</span>
            </div>

            {/* ✅ Checkout Buttons */}
            <div className="mt-4 flex flex-col gap-2">
              <button
                onClick={clearCart}
                className="w-full px-4 py-3 bg-red-600 text-white font-medium rounded-lg shadow-md hover:bg-red-700 transition flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faTrash} />
                Clear Cart
              </button>

              <button
                onClick={() => router.push("/checkout")}
                className="w-full px-4 py-3 bg-primary text-white font-medium rounded-lg shadow-md hover:bg-opacity-80 transition flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faShoppingCart} />
                Checkout Securely
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;