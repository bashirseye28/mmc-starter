"use client";

import { useEffect } from "react";
import { X, Download, Maximize2, Minimize2 } from "lucide-react"; // ✅ Professional Icons
import { useState } from "react";

interface PdfViewerModalProps {
  pdfUrl: string;
  onClose: () => void;
}

const getPreviewableGoogleDriveLink = (url: string): string => {
  const match = url.match(/id=([^&]+)/);
  return match ? `https://drive.google.com/file/d/${match[1]}/preview` : url;
};

const PdfViewerModal: React.FC<PdfViewerModalProps> = ({ pdfUrl, onClose }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  // ✅ Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div
        className={`bg-white rounded-lg shadow-lg transition-transform ${
          isFullScreen ? "w-full h-full" : "max-w-4xl w-full h-[90vh]"
        }`}
      >
        {/* ✅ Toolbar */}
        <div className="flex items-center justify-between bg-primary text-white px-4 py-2 rounded-t-lg">
          <span className="text-lg font-semibold">PDF Reader</span>

          <div className="flex items-center gap-4">
            {/* ✅ Toggle Fullscreen */}
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="hover:bg-white/20 p-2 rounded-lg transition"
            >
              {isFullScreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </button>

            {/* ✅ Download Button */}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-white/20 p-2 rounded-lg transition"
            >
              <Download size={20} />
            </a>

            {/* ✅ Close Button */}
            <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-lg transition">
              <X size={22} />
            </button>
          </div>
        </div>

        {/* ✅ PDF Viewer */}
        <iframe
          src={getPreviewableGoogleDriveLink(pdfUrl)}
          width="100%"
          height="100%"
          className="border-none rounded-b-lg"
        />
      </div>
    </div>
  );
};

export default PdfViewerModal;