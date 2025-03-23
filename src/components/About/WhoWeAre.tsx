// "use client";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import Button from "@/components/ui/Button";
// import { Users, BookOpen } from "lucide-react";

// const WhoWeAre = () => {
//   return (
//     <section id="mission" className="bg-[#F8F8F8] py-16">
//       <div className="max-w-6xl mx-auto px-6">
//         {/* Title */}
//         <motion.div 
//           className="text-center mb-12"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           <h2 className="text-4xl font-bold text-[#007676] flex justify-center items-center gap-2">
//             <Users size={32} /> Who We Are
//           </h2>
//           <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
//             The Manchester Murid Community (MMC) is a faith-based charity dedicated to preserving the teachings of Cheikh Ahmadou Bamba.
//           </p>
//         </motion.div>

//         {/* Two-Column Layout */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//           {/* Image Section */}
//           <motion.div 
//             className="relative w-full h-[350px]"
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 1 }}
//           >
//             <Image
//               src="/images/logo.png"
//               alt="MMC Gathering"
//               layout="fill"
//               objectFit="cover"
//               className="rounded-lg shadow-lg"
//             />
//           </motion.div>

//           {/* Text Section */}
//           <motion.div 
//             className="space-y-6"
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 1 }}
//           >
//             <h3 className="text-3xl font-semibold text-[#007676] flex items-center gap-2">
//               <BookOpen size={28} /> Our Purpose
//             </h3>
//             <p className="text-lg text-gray-700">
//               MMC serves as a hub for Murid disciples, fostering faith, unity, and service.
//             </p>

//             {/* ✅ Fixed Button */}
//             <Button href="/about" className="bg-[#007676] text-white px-6 py-3 rounded-md hover:bg-[#005a5a] transition">
//               Learn More
//             </Button>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhoWeAre;