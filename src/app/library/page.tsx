"use client";

import { useState, useEffect, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import LibraryHero from "@/components/Library/LibraryHero";
import FeaturedBooks from "@/components/Library/FeaturedBooks";
import SearchFilters from "@/components/Library/SearchFilters";
import BookGrid from "@/components/Library/BookGrid";
import PdfViewerModal from "@/components/PdfViewerModal";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import DaahiraCTA from "@/components/Activities/Daahira/DaahiraCTA";

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  language: string;
  pdfUrl: string;
  thumbnailUrl: string;
}

const LibraryPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "books"));
        const bookList: Book[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Book[];
        setBooks(bookList);
        setFilteredBooks(bookList);
      } catch (error) {
        console.error("❌ Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  // ✅ Handle filtering
  const handleSearchAndFilter = (
    search: string,
    category: string,
    language: string
  ) => {
    let updated = books;

    if (search) {
      updated = updated.filter(
        (book) =>
          book.title.toLowerCase().includes(search.toLowerCase()) ||
          book.author.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      updated = updated.filter((book) => book.category === category);
    }

    if (language) {
      updated = updated.filter((book) => book.language === language);
    }

    setFilteredBooks(updated);
  };

  // ✅ 12 random books for "Digital Library" preview
  const randomPreviewBooks = useMemo(() => {
    return [...filteredBooks].sort(() => 0.5 - Math.random()).slice(0, 12);
  }, [filteredBooks]);

  // ✅ 4 random books for "Featured"
  const featuredBooks = useMemo(() => {
    return [...books].sort(() => 0.5 - Math.random()).slice(0, 4);
  }, [books]);

  return (
    <main>
      {/* ✅ Hero Section */}
      <LibraryHero />

      {/* ✅ Featured Books */}
      <section className="container mx-auto px-6 pt-10 pb-6">
        <FeaturedBooks books={featuredBooks} />
      </section>

      {/* ✅ Filters */}
      <SearchFilters
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        selectedLanguage={selectedLanguage}
        onSearchChange={(val) => {
          setSearchTerm(val);
          handleSearchAndFilter(val, selectedCategory, selectedLanguage);
        }}
        onCategoryChange={(val) => {
          setSelectedCategory(val);
          handleSearchAndFilter(searchTerm, val, selectedLanguage);
        }}
        onLanguageChange={(val) => {
          setSelectedLanguage(val);
          handleSearchAndFilter(searchTerm, selectedCategory, val);
        }}
      />

      {/* ✅ Digital Library Preview (12 Books) */}
      <section className="container mx-auto px-6 pt-6 pb-16">
        <BookGrid books={randomPreviewBooks} />

        {/* ✅ View All Books Button */}
        <div className="flex justify-center mt-10">
          <Link
            href="/library/books"
            className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-opacity-80 transition flex items-center gap-2"
          >
            <BookOpen size={20} />
            View All Books
          </Link>
        </div>
      </section>

      {/* ✅ PDF Viewer Modal */}
      {selectedPdf && (
        <PdfViewerModal
          pdfUrl={selectedPdf}
          onClose={() => setSelectedPdf(null)}
        />
      )}

      {/* ✅ CTA Section */}
      <DaahiraCTA />
    </main>
  );
};

export default LibraryPage;