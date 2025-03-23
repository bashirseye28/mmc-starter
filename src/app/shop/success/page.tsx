// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheckCircle, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
// import Link from "next/link";

// const SuccessPage = () => {
//   const searchParams = useSearchParams();
//   const sessionId = searchParams.get("session_id"); // ✅ Get Stripe Session ID from URL
//   const [orderDetails, setOrderDetails] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch order details from Stripe
//   useEffect(() => {
//     if (!sessionId) return;

//     const fetchOrderDetails = async () => {
//       try {
//         const res = await fetch(`/api/order?session_id=${sessionId}`);
//         const data = await res.json();
//         if (res.ok) {
//           setOrderDetails(data);
//         } else {
//           console.error("Error fetching order details:", data.error);
//         }
//       } catch (error) {
//         console.error("Failed to fetch order details", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrderDetails();
//   }, [sessionId]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
//       <div className="bg-white shadow-lg rounded-xl p-8 text-center max-w-lg w-full">
//         <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-6xl mb-4" />
//         <h1 className="text-2xl font-bold text-gray-900">Thank You for Your Order!</h1>
//         <p className="text-gray-600 mt-2">Your payment was successful.</p>

//         {loading ? (
//           <p className="text-gray-500 mt-4">Fetching order details...</p>
//         ) : orderDetails ? (
//           <>
//             <div className="mt-6 bg-gray-50 p-4 rounded-lg text-left">
//               <p className="text-gray-800">
//                 <strong>Order ID:</strong> {orderDetails.id}
//               </p>
//               <p className="text-gray-800">
//                 <strong>Payment Status:</strong> {orderDetails.payment_status}
//               </p>
//               <p className="text-gray-800">
//                 <strong>Total Paid:</strong> £{(orderDetails.amount / 100).toFixed(2)}
//               </p>
//             </div>
//           </>
//         ) : (
//           <p className="text-red-500 mt-4">Failed to load order details.</p>
//         )}

//         <div className="flex justify-center mt-6 gap-4">
//           <Link href="/orders">
//             <button className="bg-primary text-white px-6 py-3 rounded-lg shadow-md hover:bg-primary-dark transition">
//               <FontAwesomeIcon icon={faShoppingBag} className="mr-2" />
//               View My Orders
//             </button>
//           </Link>
//           <Link href="/">
//             <button className="border-2 border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition">
//               Continue Shopping
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SuccessPage;