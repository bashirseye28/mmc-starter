"use client";

import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import Image from "next/image";
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

interface LibraryCategoriesProps {
  categorizedBooks: Record<string, Book[]>; // 🔹 Books grouped by category
}

const LibraryCategories: React.FC<LibraryCategoriesProps> = ({ categorizedBooks }) => {
  const categories = Object.keys(categorizedBooks); // 🔹 Get all category names
  const [selectedCategory, setSelectedCategory] = useState(categories[0]); // Default to first category
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  return (
    <section className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center text-primary font-heading mb-6">
        Explore Books by Category
      </h2>

      {/* 🔹 Category Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-semibold shadow-md transition ${
              selectedCategory === category ? "bg-primary text-white" : "bg-gray-200 text-darkText hover:bg-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 🔹 Book Grid for Selected Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {categorizedBooks[selectedCategory]?.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-5 hover:shadow-xl transition duration-300"
          >
            {/* ✅ Book Cover Image */}
            <Image
              src={`/images/library/${book.thumbnailUrl}`} // 🔹 Load local image
              alt={book.title}
              width={300}
              height={400}
              className="w-full h-56 object-cover rounded-lg shadow-md hover:scale-105 transition"
            />

            {/* ✅ Book Details */}
            <h3 className="text-xl font-bold text-primary mt-4 font-heading">
              {book.title}
            </h3>
            <p className="text-darkText italic font-body">By {book.author}</p>
            <p className="text-sm bg-lightBg px-2 py-1 rounded-md inline-block text-darkText">
              {book.category} | {book.language}
            </p>

            {/* ✅ Action Buttons */}
            <div className="mt-5 flex gap-3">
              <button
                className="px-4 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-opacity-80 transition"
                onClick={() => setSelectedPdf(book.pdfUrl)}
              >
                Read
              </button>
              <a
                href={book.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gold text-black font-semibold rounded-lg shadow-md hover:bg-opacity-80 transition"
              >
                Download
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Pdf Viewer Modal */}
      {selectedPdf && <PdfViewerModal pdfUrl={selectedPdf} onClose={() => setSelectedPdf(null)} />}
    </section>
  );
};

export default LibraryCategories;