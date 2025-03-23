"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faYoutube, faTiktok, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const SocialMediaSection = () => {
  return (
    <section className="text-center py-12 bg-lightBg">
      <div className="container mx-auto px-6">
        
        {/* ✅ Heading & Description */}
        <h2 className="text-3xl font-bold text-primary mb-2">Stay Connected with MMC</h2>
        <p className="text-gray-600 mb-6">
          Follow us on social media to stay updated on events, teachings, and community news.
        </p>

        {/* ✅ Social Media Icons */}
        <div className="flex justify-center space-x-6">
          <Link href="https://www.facebook.com/ToubaManchester" target="_blank" className="social-icon">
            <FontAwesomeIcon icon={faFacebookF} />
          </Link>
          <Link href="https://www.instagram.com/manchester_murid_community/" target="_blank" className="social-icon">
            <FontAwesomeIcon icon={faInstagram} />
          </Link>
          <Link href="https://www.youtube.com/@DahiraFathulBadih" target="_blank" className="social-icon">
            <FontAwesomeIcon icon={faYoutube} />
          </Link>
          <Link href="https://www.tiktok.com/@dahira_fathul_baddih" target="_blank" className="social-icon">
            <FontAwesomeIcon icon={faTiktok} />
          </Link>
        </div>

        {/* ✅ WhatsApp Button */}
        <div className="mt-6">
          <Link href="https://wa.me/+447541475547" target="_blank">
            <button className="px-6 py-3 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 transition">
              Chat with Us on WhatsApp
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default SocialMediaSection;