"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

type Props = {
  icon: LucideIcon;
  title: string;
  amount: number;
  frequency: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
};

const DonationTierCard: React.FC<Props> = ({
  icon: Icon,
  title,
  amount,
  frequency,
  description,
  isSelected,
  onClick,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={clsx(
        "bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center transition hover:shadow-xl relative cursor-pointer",
        isSelected ? "ring-2 ring-gold border-gold bg-gold/10" : "border border-transparent"
      )}
      onClick={onClick}
      role="radio"
      aria-checked={isSelected}
    >
      {/* ✅ Icon */}
      <div className="mb-4">
        <Icon size={40} className="text-[#f5c907]" aria-hidden="true" />
      </div>

      {/* ✅ Title */}
      <h3 className="text-xl font-semibold text-[#007676]">{title}</h3>

      {/* 💷 Amount + Frequency */}
      <div className="mt-2 mb-3">
        <p className="text-xl font-bold text-[#007676]">£{amount}</p>
        <p className="text-sm text-[#f5c907] capitalize">{frequency}</p>
      </div>

      {/* ✅ Description */}
      <p className="text-sm text-gray-600">{description}</p>

      {/* ✅ Checkmark if selected */}
      {isSelected && (
        <FontAwesomeIcon
          icon={faCheck}
          className="absolute top-4 right-4 text-primary text-sm"
        />
      )}
    </motion.div>
  );
};

export default DonationTierCard;