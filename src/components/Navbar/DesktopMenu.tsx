"use client";

import Link from "next/link";

const DesktopMenu = () => {
  return (
    <div className="hidden lg:flex space-x-6">
      <Link href="/" className="hover:opacity-80 transition">Home</Link>
      <Link href="/activities" className="hover:opacity-80 transition">Activities</Link>
      <Link href="/events" className="hover:opacity-80 transition">Events</Link>
      <Link href="/library" className="hover:opacity-80 transition">Library</Link>
      <Link href="/about" className="hover:opacity-80 transition">About</Link>
      <Link href="/contact" className="hover:opacity-80 transition">Contact</Link>
    </div>
  );
};

export default DesktopMenu;