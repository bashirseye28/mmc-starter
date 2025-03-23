// "use client";

// import { useParams } from "next/navigation";
// import { useState, useEffect } from "react";
// import DonationForm from "@/components/Donation/DonationForm";
// import { jaayanteTiers, JaayanteTier } from "@/data/jaayanteTiers";
// import Link from "next/link";

// const DonationPage = () => {
//   const { "jaayante-tier": tierSlug } = useParams(); // Extract tier name from URL
//   const [selectedTier, setSelectedTier] = useState<JaayanteTier | null>(null);

//   useEffect(() => {
//     const tier = jaayanteTiers.find((t) => t.slug === tierSlug);
//     if (tier) {
//       setSelectedTier(tier);
//     }
//   }, [tierSlug]);

//   if (!selectedTier) {
//     return <p className="text-center text-red-500">Invalid donation tier.</p>;
//   }

//   return (
//     <section className="py-16 bg-lightBg">
//       <div className="container mx-auto px-6 max-w-3xl text-center">
//         {/* ✅ Back Button */}
//         <Link href="/activities/kst">
//           <button className="px-4 py-2 bg-gray-300 text-black font-semibold rounded-lg hover:bg-gray-400 transition">
//             ← Back to Donation Page
//           </button>
//         </Link>

//         {/* ✅ Page Title */}
//         <h1 className="text-4xl font-bold text-primary font-heading mt-6">
//           Support <span className="text-gold">{selectedTier.title}</span>
//         </h1>

//         {/* ✅ Description */}
//         <p className="text-lg text-gray-700 mt-3">
//           Your generous donation of <span className="text-gold font-bold">£{selectedTier.amount}</span> will help build Keur Serigne Touba (KST) and support our Murid community.
//         </p>

//         {/* ✅ Donation Form */}
//         <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
//           <DonationForm preselectedAmount={selectedTier.amount} tierName={selectedTier.title} />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default DonationPage;