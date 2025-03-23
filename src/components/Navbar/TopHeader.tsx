"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp, faFacebookF, faInstagram, faYoutube, faTiktok } from "@fortawesome/free-brands-svg-icons";

const TopHeader = () => {
  const [isMounted, setIsMounted] = useState(false);

  // ✅ Ensures component only runs on client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Prevent hydration mismatch

  return (
    <div className="hidden lg:block bg-lightBg text-darkText text-sm border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center px-6 py-2">
        
        {/* ✅ Left Section: Location & Email */}
        <div className="flex gap-4 text-xs sm:text-sm">
          <span className="flex items-center gap-1 text-primary">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <span className="text-black">Manchester, UK</span>
          </span>
          <span className="flex items-center gap-1 text-primary">
            <FontAwesomeIcon icon={faEnvelope} />
            <span className="text-black">info@manchestermuridcommunity.org</span>
          </span>
        </div>

        {/* ✅ Center Section: Moving Announcement */}
        <div className="relative w-full max-w-md overflow-hidden">
          <div className="animate-scroll flex items-center whitespace-nowrap text-primary font-semibold">
            <span className="bg-gold text-white px-2 py-1 rounded-md text-xs font-bold mr-2">
              INFO
            </span>
            <span>Help Build KST – 97,000 Raised of 450,000 Goal</span>
          </div>
        </div>

        {/* ✅ Right Section: Social Media & Donate Button */}
        <div className="flex items-center gap-4">
          {/* Social Media Icons */}
          <div className="flex gap-3 text-primary text-lg">
            <Link href="https://www.facebook.com/ToubaManchester" target="_blank">
              <FontAwesomeIcon icon={faFacebookF} />
            </Link>
            <Link href="https://www.instagram.com/manchester_murid_community/" target="_blank">
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
            <Link href="https://www.youtube.com/@DahiraFathulBadih" target="_blank">
              <FontAwesomeIcon icon={faYoutube} />
            </Link>
            <Link href="https://www.tiktok.com/@dahira_fathul_baddih" target="_blank">
              <FontAwesomeIcon icon={faTiktok} />
            </Link>
            <Link
              href="https://wa.me/+447541475547?text=Hello,%20I%20need%20more%20info%20about%20the%20Manchester%20Murid%20Community%20events."
              target="_blank"
              className="text-green-600 flex items-center gap-1 font-semibold text-xs sm:text-sm"
            >
              <FontAwesomeIcon icon={faWhatsapp} />
              WhatsApp
            </Link>
          </div>

          {/* Donate Button */}
          <Link href="/donate">
            <button className="bg-gold text-black font-semibold px-4 py-2 rounded-lg shadow hover:bg-yellow-500 transition">
              Donate Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;