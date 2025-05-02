"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "@/context/CartContext";
import { CartItem as CartItemType } from "@/types/types";

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex gap-4 border-b pb-4 mb-4">
      <div className="relative w-24 h-24 flex-shrink-0 rounded overflow-hidden">
        <Image
          src={item.image ?? "/images/placeholder.png"}
          alt={item.name}
          layout="fill"
          objectFit="cover"
          className="rounded"
        />
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-primary">{item.name}</h3>
        <p className="text-gray-600">£{item.price.toFixed(2)}</p>

        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
            disabled={item.quantity <= 1}
            className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>

          <span className="px-3">{item.quantity}</span>

          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>

          <button
            onClick={() => removeFromCart(item.id)}
            className="ml-auto px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;