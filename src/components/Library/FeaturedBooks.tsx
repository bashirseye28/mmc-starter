"use client";

import Image from "next/image";
import { Eye, Download, Star } from "lucide-react";
import { useState, useMemo } from "react";
import PdfViewerModal from "@/components/PdfViewerModal";

interface Book {
  id: string;
  title: string;
  author: string;
  pdfUrl: string;
  thumbnailUrl: string;
}

interface FeaturedBooksProps {
  books: Book[];
}

const FeaturedBooks: React.FC<FeaturedBooksProps> = ({ books }) => {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  // ✅ Memoized random 4 featured books
  const featured = useMemo(() => {
    const shuffled = [...books].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4); // 👈 Now selects 4
  }, [books]);

  return (
    <section id="books" className="container mx-auto px-6 py-16">
      {/* ✅ Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
          <Star size={28} className="text-gold" />
          Featured Books
        </h2>
        <p className="text-gray-600 text-lg mt-2">
          Explore our most recommended books.
        </p>
      </div>

      {/* ✅ Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {featured.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-5 hover:shadow-xl transition duration-300"
          >
            <div className="relative w-full h-56 overflow-hidden rounded-lg">
              <Image
                src={
                  book.thumbnailUrl?.startsWith("http")
                    ? book.thumbnailUrl
                    : `/images/library/${book.thumbnailUrl || "default-thumbnail.jpg"}`
                }
                alt={book.title}
                fill
                className="object-cover rounded-lg"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "/images/library/default-thumbnail.jpg";
                }}
              />
            </div>

            <h3 className="text-lg font-bold text-primary mt-4 truncate">
              {book.title}
            </h3>
            <p className="text-sm text-gray-600 italic">{book.author}</p>

            <div className="mt-4 flex justify-between">
              <button
                className="flex items-center gap-2 px-3 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-opacity-80 transition"
                onClick={() => setSelectedPdf(book.pdfUrl)}
              >
                <Eye size={16} />
                Read
              </button>

              <a
                href={book.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-gold text-black font-semibold rounded-lg shadow-md hover:bg-opacity-80 transition"
              >
                <Download size={16} />
                Download
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Pdf Viewer Modal */}
      {selectedPdf && (
        <PdfViewerModal
          pdfUrl={selectedPdf}
          onClose={() => setSelectedPdf(null)}
        />
      )}
    </section>
  );
};

export default FeaturedBooks;