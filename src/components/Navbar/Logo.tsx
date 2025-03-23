"use client";
import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center">
      <Image 
        src="https://res.cloudinary.com/dnmoy5wua/image/upload/v1742051469/logo_ys5gk6.png" 
        alt="MMC Logo" 
        width={50} 
        height={50} 
        className="hidden lg:block" 
      />
      <span className="text-xl font-bold text-white lg:hidden">MMC</span>
    </Link>
  );
};

export default Logo;