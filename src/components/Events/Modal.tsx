"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  jotformUrl?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  jotformUrl,
}) => {
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  // 🔒 Prevent background scroll & allow ESC to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative bg-white w-[95%] max-w-3xl max-h-[90vh] rounded-xl shadow-2xl overflow-hidden animate-fadeIn">
        {/* ❌ Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Modal"
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* 🏷️ Title */}
        {title && (
          <h2 className="text-lg sm:text-xl font-semibold text-center text-primary py-4 border-b px-6">
            {title}
          </h2>
        )}

        {/* 📄 Content or Embedded Form */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[75vh]">
          {jotformUrl ? (
            <>
              {isIframeLoading && (
                <div className="text-center text-gray-500 py-6 animate-pulse">
                  Loading registration form...
                </div>
              )}
              <iframe
                src={jotformUrl}
                title="Register for Event"
                width="100%"
                height="550"
                className="w-full border-none rounded"
                onLoad={() => setIsIframeLoading(false)}
                allowFullScreen
              />
            </>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;