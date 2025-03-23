"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import BooksHero from "@/components/Library/BooksHero"; // ✅ Unique Hero for Books Page
import SearchFilters from "@/components/Library/SearchFilters"; // ✅ Search & Filters
import BookGrid from "@/components/Library/BookGrid"; // ✅ Grid to display books
import Pagination from "@/components/Common/Pagination"; // ✅ Pagination Component

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  language: string;
  pdfUrl: string;
  thumbnailUrl: string;
}

const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8; // ✅ Adjust this for pagination

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
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  // ✅ Extract unique categories & languages for filtering
  const categories = [...new Set(books.map((book) => book.category))];
  const languages = [...new Set(books.map((book) => book.language))];

  // ✅ Function to filter books dynamically
  const filterBooks = (search: string, category: string, language: string) => {
    let filtered = books;

    if (search) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(search.toLowerCase()) ||
          book.author.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter((book) => book.category === category);
    }

    if (language) {
      filtered = filtered.filter((book) => book.language === language);
    }

    setFilteredBooks(filtered);
    setCurrentPage(1); // ✅ Reset pagination on filter
  };

  // ✅ Separate event handlers for search, category, and language
  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
    filterBooks(search, selectedCategory, selectedLanguage);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterBooks(searchTerm, category, selectedLanguage);
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    filterBooks(searchTerm, selectedCategory, language);
  };

  // ✅ Paginate books
  const startIndex = (currentPage - 1) * booksPerPage;
  const currentBooks = filteredBooks.slice(
    startIndex,
    startIndex + booksPerPage
  );

  return (
    <main>
      {/* ✅ Unique Hero for Books Page */}
      <BooksHero
        title="Discover Books"
        highlight="Explore"
        subtitle="Browse, filter, and download books from our growing digital library."
      />

      {/* ✅ Search & Filters */}
      <SearchFilters
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        selectedLanguage={selectedLanguage}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onLanguageChange={handleLanguageChange}
      />

      {/* ✅ Book Grid Section */}
      <section className="container mx-auto px-6 py-12">
        <BookGrid books={currentBooks} />
      </section>

      {/* ✅ Pagination Controls */}
      <Pagination
        totalItems={filteredBooks.length}
        itemsPerPage={booksPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </main>
  );
};

export default BooksPage;
