"use client";

import { FC } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faTimes,
  faTrash,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

// ✅ Define props interface
interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const router = useRouter();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full sm:w-[400px] bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-xl font-bold text-primary flex items-center gap-2">
            <FontAwesomeIcon icon={faShoppingCart} className="text-gold" />
            Your Cart
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-600">
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {cart.length === 0 ? (
            <div className="text-center mt-10">
              <p className="text-gray-600 text-lg">Your cart is empty.</p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-3 border border-primary text-primary font-semibold rounded-lg shadow hover:bg-primary hover:text-white transition"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-4 p-3 border rounded-lg shadow-sm bg-gray-50"
                >
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-primary">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      £{item.price.toFixed(2)}
                    </p>

                    <div className="flex items-center mt-2 gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                        disabled={item.quantity <= 1}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span className="text-lg font-medium">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <>
            <div className="px-5 py-3 border-t text-sm text-gray-600 bg-white">
              <p>
                <span className="font-medium text-primary">Note:</span> Delivery
                or pickup method can be selected at checkout.
              </p>
            </div>

            <div className="px-5 py-4 border-t bg-white">
              <div className="flex justify-between text-lg font-semibold text-primary mb-4">
                <span>Subtotal:</span>
                <span>
                  £
                  {cart
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={clearCart}
                  className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  <FontAwesomeIcon icon={faTrash} /> Clear Cart
                </button>
                <button
                  onClick={() => {
                    onClose();
                    router.push("/checkout");
                  }}
                  className="w-full px-4 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition"
                >
                  <FontAwesomeIcon icon={faShoppingCart} /> Checkout Securely
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartSidebar;