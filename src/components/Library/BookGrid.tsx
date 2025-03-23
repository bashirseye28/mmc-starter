"use client";

import Image from "next/image";
import { Eye, Download, Library } from "lucide-react";
import { useState } from "react";
import PdfViewerModal from "@/components/PdfViewerModal";

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  language: string;
  pdfUrl: string;
  thumbnailUrl: string;
}

interface BookGridProps {
  books: Book[];
}

const BookGrid: React.FC<BookGridProps> = ({ books }) => {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState<{ [key: string]: boolean }>({});

  return (
    <section className="container mx-auto px-6 py-12">
      {/* ✅ Section Title with Professional Icon */}
      <div className="flex items-center justify-center gap-3 text-primary font-heading text-4xl font-bold mb-10">
        <Library size={32} className="text-gold" />
        <span>Digital Library</span>
      </div>

      {/* ✅ Book Grid */}
      {books.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No books found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-xl shadow-md border border-gray-200 p-5 hover:shadow-lg transition duration-300"
            >
              {/* ✅ Book Cover Image with Fallback & Loading State */}
              <div className="relative w-full h-56 rounded-lg overflow-hidden">
                {imageLoading[book.id] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <span className="text-gray-400">Loading...</span>
                  </div>
                )}
                <Image
                  src={book.thumbnailUrl || "/images/placeholder-book.jpg"} // ✅ Fallback for missing images
                  alt={book.title}
                  width={250}
                  height={350}
                  className={`w-full h-full object-cover transition ${
                    imageLoading[book.id] ? "opacity-0" : "opacity-100"
                  }`}
                  onLoad={() => setImageLoading((prev) => ({ ...prev, [book.id]: false }))}
                  onError={() => setImageLoading((prev) => ({ ...prev, [book.id]: false }))}
                />
              </div>

              {/* ✅ Book Details */}
              <h3 className="text-lg font-bold text-primary mt-4 font-heading truncate">{book.title}</h3>
              <p className="text-sm text-gray-600 italic font-body">By {book.author}</p>

              {/* ✅ Book Metadata */}
              <p className="text-xs bg-lightBg px-2 py-1 rounded-md inline-block text-gray-600 mt-2">
                {book.category} | {book.language}
              </p>

              {/* ✅ Action Buttons */}
              <div className="mt-4 flex gap-3">
                {/* Read Button */}
                <button
                  className="px-4 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-opacity-80 transition flex items-center gap-2"
                  onClick={() => setSelectedPdf(book.pdfUrl)}
                  aria-label={`Read ${book.title}`}
                >
                  <Eye size={16} />
                  Read
                </button>

                {/* Download Button */}
                <a
                  href={book.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gold text-black font-semibold rounded-lg shadow-md hover:bg-opacity-80 transition flex items-center gap-2"
                  aria-label={`Download ${book.title}`}
                >
                  <Download size={16} />
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Pdf Viewer Modal */}
      {selectedPdf && <PdfViewerModal pdfUrl={selectedPdf} onClose={() => setSelectedPdf(null)} />}
    </section>
  );
};

export default BookGrid;