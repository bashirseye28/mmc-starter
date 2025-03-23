"use client";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationCircle,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

interface FormMessageProps {
  type: "success" | "error" | "info";
  message: string;
  onClose: () => void;
}

const FormMessage: React.FC<FormMessageProps> = ({ type, message, onClose }) => {
  // ✅ Auto-close after 5 seconds (except errors)
  useEffect(() => {
    if (type !== "error") {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [type, onClose]);

  // ✅ Message Styles
  const typeStyles = {
    success: "bg-green-100 border-green-500 text-green-700",
    error: "bg-red-100 border-red-500 text-red-700",
    info: "bg-blue-100 border-blue-500 text-blue-700",
  };

  const iconTypes = {
    success: faCheckCircle,
    error: faExclamationCircle,
    info: faInfoCircle,
  };

  return (
    <div className={`flex items-start border-l-4 p-4 rounded-md shadow-md ${typeStyles[type]} relative w-full`}>
      <FontAwesomeIcon icon={iconTypes[type]} className="text-xl mr-3 mt-1" />
      <p className="flex-1 text-sm">{message}</p>

      {/* ✅ Close Button */}
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};

export default FormMessage;