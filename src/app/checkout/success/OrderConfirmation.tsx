"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faShoppingBag } from "@fortawesome/free-solid-svg-icons";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface OrderData {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  shippingCost: number;
  shippingMethod: string;
  items: OrderItem[];
  subtotal: number;
  total: number;
  paymentMethod: string;
  paymentStatus: string;
}

const OrderConfirmation = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");

  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!sessionId) {
        setError("Invalid payment session.");
        setLoading(false);
        return;
      }

      try {
        // ✅ Fetch order details from Stripe & backend
        const res = await fetch(`/api/orders?session_id=${sessionId}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to retrieve order details.");
        }

        setOrder(data);
      } catch (err) {
        setError("Failed to load order details. Please contact support.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [sessionId]);

  if (loading) {
    return <div className="text-center text-primary text-xl">Loading your order details...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-xl">{error}</div>;
  }

  if (!order) {
    return <div className="text-center text-red-500 text-xl">No order found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
      {/* ✅ Success Message */}
      <div className="flex items-center justify-center gap-3 text-green-600 text-2xl font-bold">
        <FontAwesomeIcon icon={faCheckCircle} />
        Order Confirmed!
      </div>

      {/* ✅ Order Summary */}
      <h2 className="text-xl font-bold text-primary mt-6">Order Details</h2>
      <p className="text-gray-700">Order ID: <span className="font-semibold">{order.orderId}</span></p>
      <p className="text-gray-700">Payment Status: <span className="font-semibold">{order.paymentStatus}</span></p>

      {/* ✅ Customer Information */}
      <h3 className="text-lg font-semibold text-primary mt-4">Customer Information</h3>
      <p><strong>Name:</strong> {order.customerName}</p>
      <p><strong>Email:</strong> {order.customerEmail}</p>
      <p><strong>Phone:</strong> {order.customerPhone}</p>

      {/* ✅ Shipping Information */}
      <h3 className="text-lg font-semibold text-primary mt-4">Shipping Information</h3>
      <p><strong>Address:</strong> {order.shippingAddress}</p>
      <p><strong>Delivery Method:</strong> {order.shippingMethod}</p>
      <p><strong>Shipping Cost:</strong> £{order.shippingCost.toFixed(2)}</p>

      {/* ✅ Ordered Items */}
      <h3 className="text-lg font-semibold text-primary mt-4">Items Purchased</h3>
      <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between border-b py-2">
            <p className="text-gray-700">{item.name} x{item.quantity}</p>
            <p className="text-gray-700 font-medium">£{(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* ✅ Totals */}
      <div className="mt-4 text-lg">
        <p className="flex justify-between"><span>Subtotal:</span> <span>£{order.subtotal.toFixed(2)}</span></p>
        <p className="flex justify-between"><span>Shipping:</span> <span>£{order.shippingCost.toFixed(2)}</span></p>
        <p className="flex justify-between font-bold text-primary text-xl"><span>Total:</span> <span>£{order.total.toFixed(2)}</span></p>
      </div>

      {/* ✅ Continue Shopping Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => router.push("/shop")}
          className="px-6 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-yellow-500 flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faShoppingBag} />
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;