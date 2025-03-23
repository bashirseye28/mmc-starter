"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faYoutube, faTiktok, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  // ✅ Show "Back to Top" button after scrolling down
  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 300);
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <footer className="bg-primary text-white py-14 relative">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
        
        {/* ✅ 1️⃣ About MMC */}
        <div>
          <Link href="/" className="flex items-center gap-3 justify-center md:justify-start mb-4">
            <Image src="/images/logo.png" alt="MMC Logo" width={50} height={50} />
            <span className="text-lg font-bold hover:text-gold transition">
              Manchester Murid Community
            </span>
          </Link>
          <p className="text-sm text-gray-300 leading-relaxed max-w-xs mx-auto md:mx-0">
            Dedicated to faith, education, and community service. Inspired by Cheikh Ahmadou Bamba’s teachings.
          </p>
          <p className="text-sm text-gold mt-3 font-semibold">Registered Charity No: 1194666</p>
        </div>

        {/* ✅ 2️⃣ Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gold mb-5">Quick Links</h3>
          <ul className="space-y-3">
            {["Home", "Activities", "Events", "Library", "About", "Contact"].map((link) => (
              <li key={link}>
                <Link 
                  href={`/${link.toLowerCase()}`} 
                  className="hover:text-gold transition hover:underline"
                >
                  {link}
                </Link>
              </li>
            ))}
            <li><Link href="/privacy" className="hover:text-gold transition hover:underline">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-gold transition hover:underline">Terms of Use</Link></li>
          </ul>
        </div>

        {/* ✅ 3️⃣ Get Involved */}
        <div>
          <h3 className="text-lg font-semibold text-gold mb-5">Get Involved</h3>
          <p className="text-sm text-gray-300 leading-relaxed max-w-xs mx-auto md:mx-0">
            Support our mission through donations, volunteering, or becoming a member.
          </p>

          {/* ✅ Donate Button */}
          <Link href="/donate">
            <button className="mt-4 w-full max-w-[220px] bg-gold text-black font-semibold py-3 rounded-lg shadow-md transition hover:bg-yellow-500 hover:scale-105">
              Donate Now
            </button>
          </Link>

          {/* ✅ Additional Engagement Links */}
          <Link href="/volunteer" className="mt-3 block text-sm hover:text-gold transition hover:underline">
            Become a Volunteer
          </Link>
          <Link href="/membership" className="mt-2 block text-sm hover:text-gold transition hover:underline">
            Membership
          </Link>
        </div>

        {/* ✅ 4️⃣ Follow Us (Social Media) */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-gold mb-5">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4 text-xl">
            <Link href="https://www.facebook.com/ToubaManchester" target="_blank" className="hover:text-gold transition">
              <FontAwesomeIcon icon={faFacebookF} />
            </Link>
            <Link href="https://www.instagram.com/manchester_murid_community/" target="_blank" className="hover:text-gold transition">
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
            <Link href="https://www.youtube.com/@DahiraFathulBadih" target="_blank" className="hover:text-gold transition">
              <FontAwesomeIcon icon={faYoutube} />
            </Link>
            <Link href="https://www.tiktok.com/@dahira_fathul_baddih" target="_blank" className="hover:text-gold transition">
              <FontAwesomeIcon icon={faTiktok} />
            </Link>
            <Link 
              href="https://wa.me/+447541475547?text=Hello,%20I%20need%20more%20info%20about%20MMC" 
              target="_blank" 
              className="text-green-400 hover:text-green-300 transition"
            >
              <FontAwesomeIcon icon={faWhatsapp} />
            </Link>
          </div>
        </div>
      </div>

      {/* ✅ Copyright & Back to Top */}
      <div className="mt-12 border-t border-white border-opacity-20 pt-5 text-center text-sm opacity-80">
        © {new Date().getFullYear()} Manchester Murid Community. All Rights Reserved.
      </div>

      {/* ✅ Floating "Back to Top" Button */}
      {isVisible && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 bg-gold text-black p-3 rounded-full shadow-lg transition hover:bg-yellow-500 hover:scale-105"
          aria-label="Back to Top"
        >
          <FontAwesomeIcon icon={faArrowUp} size="lg" />
        </button>
      )}
    </footer>
  );
};

export default Footer;