"use client";

import { useState } from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaWhatsapp } from "react-icons/fa";

const CTASection = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for subscribing, ${email}!`);
    setEmail("");
  };

  return (
    <section className="py-12 bg-primary text-white text-center">
      <div className="container mx-auto px-6 max-w-3xl">
        
        {/* ✅ Heading */}
        <h2 className="text-3xl font-bold mb-4">Stay Connected with MMC</h2>
        <p className="text-lg text-gray-300">
          Join our community and stay updated with events, teachings, and opportunities.
        </p>

        {/* ✅ Newsletter Subscription */}
        <form onSubmit={handleSubscribe} className="mt-6 flex flex-col md:flex-row items-center justify-center gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full md:w-auto px-4 py-3 rounded-md text-black focus:ring-2 focus:ring-gold"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="bg-gold text-black px-6 py-3 rounded-md font-semibold shadow-md hover:bg-yellow-500 transition"
          >
            Subscribe Now
          </button>
        </form>

        {/* ✅ Volunteer & Social Media */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-8">
          
          {/* Volunteer */}
          <Link href="/volunteer">
            <button className="px-6 py-3 bg-white text-primary font-semibold rounded-md shadow-md hover:bg-gray-200 transition">
              Become a Volunteer
            </button>
          </Link>

          {/* Social Media */}
          <div className="flex space-x-4">
            <Link href="https://www.facebook.com/ToubaManchester" target="_blank" className="hover:text-gold">
              <FaFacebookF size={24} />
            </Link>
            <Link href="https://www.instagram.com/manchester_murid_community/" target="_blank" className="hover:text-gold">
              <FaInstagram size={24} />
            </Link>
            <Link href="https://www.youtube.com/@DahiraFathulBadih" target="_blank" className="hover:text-gold">
              <FaYoutube size={24} />
            </Link>
            <Link href="https://www.tiktok.com/@dahira_fathul_baddih" target="_blank" className="hover:text-gold">
              <FaTiktok size={24} />
            </Link>
            <Link href="https://wa.me/+447541475547" target="_blank" className="text-green-400 hover:text-green-300">
              <FaWhatsapp size={24} />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
};

export default CTASection;