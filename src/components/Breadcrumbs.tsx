"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ChevronRight } from "lucide-react";

// Breadcrumbs Animation
const fadeIn = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Define friendly names for breadcrumb links
const breadcrumbMap: Record<string, string> = {
  "activities": "Activities",
  "daahira": "Daahira",
  "kureel": "Kureel",
  "madrassah": "Madrassah",
  "kst": "KST",
  "daahira-soxna-diarra": "Soxna Diarra",
  "baay-faal": "Baay Faal",
};

const Breadcrumbs = () => {
  const pathname = usePathname();
  if (!pathname) return null;

  const pathSegments = pathname.split("/").filter(segment => segment !== "");

  return (
    <motion.nav 
      className="bg-gray-100 py-3 px-6 rounded-lg shadow-sm mb-6 border border-gray-300"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <ul className="flex items-center space-x-2 text-sm font-medium text-gray-600">
        {/* Home Link */}
        <li className="flex items-center">
          <Link href="/" className="text-primary hover:text-gold transition flex items-center gap-1">
            <Home size={16} />
            Home
          </Link>
        </li>

        {/* Dynamic Breadcrumbs */}
        {pathSegments.map((segment, index) => {
          const fullPath = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;

          return (
            <li key={fullPath} className="flex items-center">
              <ChevronRight className="text-gray-500 mx-2" size={16} />
              {isLast ? (
                <span className="text-gray-500">{breadcrumbMap[segment] || segment}</span>
              ) : (
                <Link href={fullPath} className="text-primary hover:text-gold transition">
                  {breadcrumbMap[segment] || segment}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
};

export default Breadcrumbs;