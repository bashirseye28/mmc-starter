// "use client";

// import { useState } from "react";

// type ShippingMethod = "standard" | "express";

// const ShippingComponent = () => {
//   // ✅ Define shipping state correctly
//   const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("standard");

//   // ✅ Define shipping rates object with correct types
//   const shippingRates: Record<ShippingMethod, number> = {
//     standard: 3.99,
//     express: 7.99,
//   };

//   // ✅ Access shipping cost without type errors
//   const shippingCost = shippingRates[shippingMethod];

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold text-primary mb-4">Choose a Shipping Method</h2>

//       {/* ✅ Shipping Options */}
//       <div className="space-y-3">
//         {(["standard", "express"] as ShippingMethod[]).map((method) => (
//           <button
//             key={method}
//             onClick={() => setShippingMethod(method)}
//             className={`w-full p-3 border rounded-lg text-lg transition-all ${
//               shippingMethod === method ? "border-primary bg-blue-50" : "border-gray-300"
//             }`}
//           >
//             {method === "standard" ? "Standard Delivery - £3.99" : "Express Delivery - £7.99"}
//           </button>
//         ))}
//       </div>

//       {/* ✅ Show Shipping Cost */}
//       <p className="mt-4 text-lg font-semibold text-gray-700">
//         Shipping Cost: <span className="text-primary">£{shippingCost.toFixed(2)}</span>
//       </p>
//     </div>
//   );
// };

// export default ShippingComponent;