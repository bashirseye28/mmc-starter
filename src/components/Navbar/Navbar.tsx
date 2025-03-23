"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import HamburgerMenu from "./HamburgerMenu";
import MobileMenu from "./MobileMenu";
import { auth } from "@/app/lib/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { FaUserShield } from "react-icons/fa";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Activities", href: "/activities" },
  { label: "Events", href: "/events" },
  { label: "Library", href: "/library" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAdmin(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setIsAdmin(false);
  };

  return (
    <nav className="bg-primary text-white shadow-md w-full relative z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* 🔹 Left: Logo & Title (MMC on Mobile, Full Title on Desktop) */}
        <Link href="/" className="flex items-center gap-2 hover:text-gold transition">
          <Image 
            src="/images/logo.png" 
            alt="MMC Logo" 
            width={40} 
            height={40} 
            className="cursor-pointer"
          />
          <span className="text-lg font-semibold hover:text-gold transition sm:hidden">MMC</span>
          <span className="text-lg font-semibold hover:text-gold transition hidden sm:block">
            Manchester Murid Community
          </span>
        </Link>

        {/* 🔹 Desktop Navigation */}
        <div className="hidden lg:flex flex-1 justify-center">
          <div className="flex gap-14">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-gold transition">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* 🔹 Desktop Admin (Only if Logged In) */}
        {isAdmin && (
          <div className="hidden lg:flex items-center">
            <Link 
              href="/admin/dashboard" 
              className="flex items-center gap-2 hover:text-gold transition"
            >
              <FaUserShield size={18} />
              Admin
            </Link>
          </div>
        )}

        {/* 🔹 Mobile Menu & Donate Button */}
        <div className="lg:hidden flex items-center">
          <Link 
            href="/donate" 
            className="sm:hidden bg-gold text-black font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-yellow-500 transition mr-5"
          >
            Donate
          </Link>
          <HamburgerMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </div>
      </div>

      {/* 🔹 Mobile Sidebar */}
      {isMenuOpen && (
        <MobileMenu 
          isMenuOpen={isMenuOpen} 
          setIsMenuOpen={setIsMenuOpen} 
          isAdmin={isAdmin}
          handleLogout={handleLogout}
        />
      )}
    </nav>
  );
};

export default Navbar;