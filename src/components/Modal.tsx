"use client";

import { ReactNode } from "react";
import { X } from "lucide-react"; // ✅ Close icon
import { motion } from "framer-motion"; // ✅ Smooth animations

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Title */}
        {title && <h3 className="text-xl font-semibold text-center text-gray-800">{title}</h3>}

        {/* Modal Content */}
        <div className="mt-4">{children}</div>
      </motion.div>
    </div>
  );
};

export default Modal;