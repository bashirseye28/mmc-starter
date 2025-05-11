// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { CheckCircle, FileDown } from "lucide-react";
// import jsPDF from "jspdf";

// export default function CheckoutSuccessContent() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const sessionId = searchParams.get("session_id");

//   const [loading, setLoading] = useState(true);
//   const [downloading, setDownloading] = useState(false);
//   const [sessionData, setSessionData] = useState<any>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!sessionId) {
//       setError("Missing session ID.");
//       setLoading(false);
//       return;
//     }

//     const fetchSession = async () => {
//       try {
//         const res = await fetch(`/api/stripe/final-session?session_id=${sessionId}`);
//         if (!res.ok) throw new Error("Failed to fetch session");
//         const data = await res.json();
//         setSessionData(data);
//       } catch (err) {
//         console.error(err);
//         setError("Could not load order details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSession();
//   }, [sessionId]);

//   const handleDownloadReceipt = async () => {
//     if (!sessionData) return;
//     setDownloading(true);

//     const { metadata, customer_email, line_items = [] } = sessionData;

//     const doc = new jsPDF();
//     const logoUrl = "https://res.cloudinary.com/dnmoy5wua/image/upload/v1746670607/logo_fdhstb.png";

//     const logoBlob = await fetch(logoUrl).then((res) => res.blob());
//     const logoBase64 = await new Promise<string>((resolve) => {
//       const reader = new FileReader();
//       reader.onloadend = () => resolve(reader.result as string);
//       reader.readAsDataURL(logoBlob);
//     });

//     doc.addImage(logoBase64, "PNG", 85, 10, 40, 40);

//     let y = 60;
//     doc.setFontSize(20).setFont("helvetica", "bold");
//     doc.text("Order Receipt", 105, y, { align: "center" });

//     y += 15;
//     doc.setFontSize(16).text("Manchester Murid Community", 20, y);
//     y += 8;
//     doc.setFontSize(11);
//     doc.text("Email: contact@manchestermuridcommunity.org", 20, y);
//     y += 6;
//     doc.text("Website: manchestermuridcommunity.org", 20, y);

//     y += 10;
//     doc.setLineWidth(0.4);
//     doc.line(20, y, 190, y);
//     y += 12;

//     doc.setFont("helvetica", "bold").text("Customer Info:", 20, y);
//     y += 7;
//     doc.setFont("helvetica", "normal");
//     doc.text(`Email: ${customer_email}`, 20, y);
//     y += 6;
//     doc.text(`Order ID: ${metadata?.["Order ID"] ?? "N/A"}`, 20, y);
//     y += 6;
//     doc.text(`Date: ${new Date().toLocaleString("en-GB")}`, 20, y);

//     y += 10;
//     doc.setFont("helvetica", "bold").text("Items:", 20, y);
//     y += 8;
//     doc.setFont("helvetica", "normal");

//     line_items.forEach((item: any) => {
//       const desc = `${item.description} — Qty: ${item.quantity} × £${(
//         item.price.unit_amount / 100
//       ).toFixed(2)}`;
//       doc.text(desc, 20, y);
//       y += 7;
//     });

//     y += 6;
//     doc.setFont("helvetica", "bold").text(`Total Paid: £${metadata?.["Total Paid"]}`, 20, y);

//     y += 15;
//     doc.setFontSize(10).setFont("times", "italic");
//     doc.text("May Allah reward you abundantly for your support.", 105, y, { align: "center" });

//     y += 8;
//     doc.setFontSize(9).setFont("helvetica", "normal");
//     doc.text("This is your official receipt. Thank you!", 105, y, { align: "center" });

//     doc.save(`receipt-${metadata?.["Order ID"] ?? sessionId}.pdf`);
//     setDownloading(false);
//   };

//   const { metadata, customer_email } = sessionData || {};
//   const orderId = metadata?.["Order ID"] ?? sessionId?.slice(-8) ?? "N/A";
//   const total = metadata?.["Total Paid"] ?? "0.00";

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-600">
//         Loading...
//       </div>
//     );
//   }

//   if (error || !sessionData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-red-600">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <section className="min-h-screen bg-lightBg flex items-center justify-center px-4 py-12">
//       <div className="bg-white rounded-xl shadow-md w-full max-w-md text-center px-8 py-10">
//         <CheckCircle className="mx-auto w-14 h-14 text-green-600 mb-4" />
//         <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-2">
//           Thank you for your order!
//         </h1>
//         <p className="text-gray-600 mb-6 font-body">
//           We’ve received your payment and will process your order shortly.
//         </p>

//         <div className="bg-gray-50 border rounded-lg p-4 text-left text-sm text-gray-800 font-body mb-6 space-y-2">
//           <p><strong>Order ID:</strong> {orderId}</p>
//           <p><strong>Email:</strong> {customer_email}</p>
//           <p><strong>Total Paid:</strong> £{total}</p>
//         </div>

//         <div className="flex flex-col sm:flex-row justify-center gap-4">
//           <button
//             onClick={() => router.push("/shop")}
//             className="bg-primary hover:bg-[#005f5f] text-white font-medium px-6 py-2 rounded-md transition"
//           >
//             Continue Shopping
//           </button>

//           <button
//             onClick={handleDownloadReceipt}
//             disabled={downloading}
//             className="bg-gold hover:bg-yellow-400 text-black font-medium px-6 py-2 rounded-md transition flex items-center justify-center gap-2 disabled:opacity-50"
//           >
//             <FileDown className="w-4 h-4" />
//             {downloading ? "Preparing..." : "Download Receipt"}
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }