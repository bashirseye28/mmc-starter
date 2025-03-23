"use client";

import Link from "next/link";
import { FaSignOutAlt, FaTimes, FaDonate } from "react-icons/fa";

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAdmin: boolean;
  handleLogout: () => void;
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Activities", href: "/activities" },
  { label: "Events", href: "/events" },
  { label: "Library", href: "/library" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const MobileMenu: React.FC<MobileMenuProps> = ({ isMenuOpen, setIsMenuOpen, isAdmin, handleLogout }) => {
  return (
    <div 
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${
        isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div 
        className={`fixed inset-0 bg-primary/90 backdrop-blur-md text-white flex flex-col items-start p-6 transition-transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* 🔹 Close Button */}
        <button 
          onClick={() => setIsMenuOpen(false)} 
          className="absolute top-5 right-5 text-white text-2xl focus:outline-none"
        >
          <FaTimes />
        </button>

        {/* 🔹 Menu Links */}
        <nav className="mt-10 w-full">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="block py-3 text-lg font-medium hover:text-gold transition border-b border-white/30"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* 🔹 Admin Panel & Logout (Only if Logged In) */}
        {isAdmin && (
          <>
            <Link 
              href="/admin/dashboard" 
              className="mt-6 text-lg flex items-center gap-2 hover:text-gold transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin Panel
            </Link>
            <button 
              onClick={() => { handleLogout(); setIsMenuOpen(false); }} 
              className="mt-4 text-lg flex items-center gap-2 text-red-500 hover:text-red-700 transition"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </>
        )}

        {/* 🔹 Donate Button - Always Visible */}
        <Link href="/donate" className="w-full mt-10">
          <button className="w-full bg-gold text-black font-semibold py-3 rounded-lg shadow-md hover:bg-yellow-500 transition flex items-center justify-center gap-2">
            <FaDonate />
            Donate Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;