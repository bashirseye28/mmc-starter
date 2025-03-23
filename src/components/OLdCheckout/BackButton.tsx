"use client";

import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface BackButtonProps {
  href?: string; // Optional: Custom route (e.g., "/shop")
  onClick?: () => void; // Optional: Custom function (e.g., prevStep)
  icon: any; // FontAwesome icon
  text: string; // Button text
}

const BackButton: React.FC<BackButtonProps> = ({ href, onClick, icon, text }) => {
  const router = useRouter();

  return (
    <button
      onClick={href ? () => router.push(href) : onClick}
      className="w-full sm:w-auto border-2 border-primary text-primary px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary transition hover:text-white"
    >
      <FontAwesomeIcon icon={icon} />
      {text}
    </button>
  );
};

export default BackButton;