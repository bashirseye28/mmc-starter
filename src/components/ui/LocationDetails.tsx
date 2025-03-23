"use client";
import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";

interface LocationDetailsProps {
  locationTitle: string;
  address: string;
  phone: string;
}

const LocationDetails: React.FC<LocationDetailsProps> = ({ locationTitle, address, phone }) => {
  return (
    <motion.div
      className="mt-8 bg-[#f8f8f8] p-6 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h3 className="text-2xl font-semibold text-[#007676] flex items-center gap-2">
        <MapPin size={28} /> {locationTitle}
      </h3>
      <p className="text-lg text-gray-700 mt-2 whitespace-pre-line">
        {address}
      </p>
      <div className="mt-2 flex items-center gap-2 text-lg text-gray-700">
        <Phone size={20} /> {phone}
      </div>
    </motion.div>
  );
};

export default LocationDetails;