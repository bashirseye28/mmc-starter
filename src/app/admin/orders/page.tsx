"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/lib/firebaseConfig";
import { collection, getDocs, deleteDoc, doc, updateDoc, Timestamp } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye, faShippingFast, faShoppingCart, faHome } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import Link from "next/link";

const AdminOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // ✅ Fetch Orders from Firestore
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "orders"));
        const ordersList = querySnapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            ...data,
            createdAt: data.createdAt instanceof Timestamp ? data.createdAt : null,
            cartItems: Array.isArray(data.cartItems) ? data.cartItems : [],
          };
        });

        ordersList.sort((a, b) => {
          const aTime = a.createdAt?.seconds ?? 0;
          const bTime = b.createdAt?.seconds ?? 0;
          return bTime - aTime;
        });

        setOrders(ordersList);
      } catch (error) {
        console.error("❌ Error fetching orders:", error);
        toast.error("Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // ✅ Confirm Delete
  const confirmDeleteOrder = (orderId: string) => {
    setOrderToDelete(orderId);
    setShowDeleteConfirm(true);
  };

  // ✅ Delete Order
  const handleDeleteOrder = async () => {
    if (!orderToDelete) return;

    try {
      await deleteDoc(doc(db, "orders", orderToDelete));
      setOrders((prev) => prev.filter((order) => order.id !== orderToDelete));
      toast.success("✅ Order deleted");
    } catch (error) {
      console.error("❌ Delete error:", error);
      toast.error("Failed to delete order.");
    } finally {
      setOrderToDelete(null);
      setShowDeleteConfirm(false);
    }
  };

  // ✅ Mark as Shipped
  const handleMarkShipped = async (orderId: string) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: "Shipped" });

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: "Shipped" } : order
        )
      );

      toast.success("Order marked as shipped!");
    } catch (error) {
      console.error("❌ Mark shipped error:", error);
      toast.error("Failed to update order.");
    }
  };

  const openOrderDetails = (order: any) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-gray-500 mb-6">
        <ul className="flex items-center space-x-2 text-sm">
          <li>
            <Link href="/admin/dashboard">
              <span className="hover:text-primary cursor-pointer flex items-center gap-1">
                <FontAwesomeIcon icon={faHome} /> Dashboard
              </span>
            </Link>
          </li>
          <li>/</li>
          <li className="text-primary font-semibold">Manage Orders</li>
        </ul>
      </nav>

      <h2 className="text-3xl font-bold text-primary mb-6 flex items-center gap-2">
        <FontAwesomeIcon icon={faShoppingCart} /> Manage Orders
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{order.orderId}</td>
                  <td className="p-3">{order.name}</td>
                  <td className="p-3">{order.email}</td>
                  <td className="p-3">£{order.total.toFixed(2)}</td>
                  <td className="p-3">
                    {order.status === "Shipped" ? (
                      <span className="text-green-600 font-semibold">Shipped</span>
                    ) : (
                      <span className="text-yellow-600 font-semibold">Pending</span>
                    )}
                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => openOrderDetails(order)}
                      className="text-blue-600 bg-gray-200 p-2 rounded-md"
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    {order.status !== "Shipped" && (
                      <button
                        onClick={() => handleMarkShipped(order.id)}
                        className="text-green-600 bg-gray-200 p-2 rounded-md"
                      >
                        <FontAwesomeIcon icon={faShippingFast} />
                      </button>
                    )}
                    <button
                      onClick={() => confirmDeleteOrder(order.id)}
                      className="text-red-600 bg-gray-200 p-2 rounded-md"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-2">Order Details</h3>
            <p><strong>Name:</strong> {selectedOrder.name}</p>
            <p><strong>Email:</strong> {selectedOrder.email}</p>
            <p><strong>Phone:</strong> {selectedOrder.phone}</p>
            <p><strong>Address:</strong> {selectedOrder.address}, {selectedOrder.city}, {selectedOrder.postcode}</p>

            <h4 className="font-semibold mt-4">Items:</h4>
            <ul>
              {selectedOrder.cartItems.map((item: any, index: number) => (
                <li key={index}>
                  {item.name} x{item.quantity} – £{(item.quantity * item.price).toFixed(2)}
                </li>
              ))}
            </ul>

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ✅ Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-lg font-bold text-red-600 mb-4">Confirm Delete</h2>
            <p className="text-gray-700 mb-6">Are you sure you want to delete this order?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteOrder}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setOrderToDelete(null);
                }}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;