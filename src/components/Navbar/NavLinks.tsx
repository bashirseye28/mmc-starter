"use client";
import Link from "next/link";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Activities", href: "/activities" },
  { name: "Events", href: "/events" },
  { name: "Library", href: "/library" },
  { name: "Shop", href: "/shop" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const NavLinks = () => {
  return (
    <>
      {navItems.map((item) => (
        <Link 
          key={item.name} 
          href={item.href} 
          className="text-darkText hover:text-primary transition"
        >
          {item.name}
        </Link>
      ))}
    </>
  );
};

export default NavLinks;