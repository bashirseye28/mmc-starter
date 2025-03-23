import React from "react";
import Link from "next/link";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "gold-outline";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ href, children, variant = "primary", className }) => {
  let baseStyles = "px-6 py-3 rounded-md font-semibold transition-all text-center inline-block";
  let variantStyles = "";

  switch (variant) {
    case "primary":
      variantStyles = "bg-[#007676] text-white hover:bg-[#005a5a]";
      break;
    case "outline":
      variantStyles = "border border-[#007676] text-[#007676] hover:bg-[#007676] hover:text-white";
      break;
    case "gold-outline":
      variantStyles = "border border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black";
      break;
  }

  return (
    <Link href={href} legacyBehavior>
      <a className={`${baseStyles} ${variantStyles} ${className}`}>{children}</a>
    </Link>
  );
};

export default Button;