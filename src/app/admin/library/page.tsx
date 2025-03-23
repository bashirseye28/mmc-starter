"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/lib/firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  FaTrashAlt,
  FaEdit,
  FaPlus,
  FaSave,
  FaChevronRight,
  FaChevronLeft,
  FaBook,
  FaEye,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Image from "next/image";

const AdminLibrary = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Dua");
  const [language, setLanguage] = useState("English");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [editingBook, setEditingBook] = useState<any>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "books"));
      const bookList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(bookList);
    } catch (error) {
      console.error("Error fetching books:", error);
      toast.error("Failed to load books.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async () => {
    if (!title || !author || !category || !language || !thumbnailUrl || !pdfUrl) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "books"), {
        title,
        author,
        category,
        language,
        thumbnailUrl,
        pdfUrl,
      });
      setBooks([...books, { id: docRef.id, title, author, category, language, thumbnailUrl, pdfUrl }]);
      toast.success("Book added successfully!");
      resetForm();
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error("Failed to add book.");
    }
  };

  const handleEditBook = (book: any) => {
    setEditingBook(book);
    setTitle(book.title);
    setAuthor(book.author);
    setCategory(book.category);
    setLanguage(book.language);
    setThumbnailUrl(book.thumbnailUrl);
    setPdfUrl(book.pdfUrl);
  };

  const handleSaveEdit = async () => {
    if (!editingBook) return;

    try {
      const bookRef = doc(db, "books", editingBook.id);
      await updateDoc(bookRef, {
        title,
        author,
        category,
        language,
        thumbnailUrl,
        pdfUrl,
      });
      setBooks(
        books.map((b) =>
          b.id === editingBook.id
            ? { ...b, title, author, category, language, thumbnailUrl, pdfUrl }
            : b
        )
      );
      toast.success("Book updated successfully!");
      resetForm();
    } catch (error) {
      console.error("Error updating book:", error);
      toast.error("Failed to update book.");
    }
  };

  const handleDeleteBook = async (bookId: string) => {
    try {
      await deleteDoc(doc(db, "books", bookId));
      setBooks(books.filter((b) => b.id !== bookId));
      toast.success("Book deleted successfully!");
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("Failed to delete book.");
    }
  };

  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setCategory("Dua");
    setLanguage("English");
    setThumbnailUrl("");
    setPdfUrl("");
    setEditingBook(null);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-6xl mx-auto">
      <ToastContainer />

      {/* ✅ Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4 flex items-center">
        <Link href="/admin/dashboard" className="hover:text-primary flex items-center">
          <FaChevronLeft className="mr-1" /> Dashboard
        </Link>
        <FaChevronRight className="mx-2 text-gray-400" /> Manage Library
      </nav>

      <h2 className="text-3xl font-bold text-primary mb-6 flex items-center">
        <FaBook className="mr-2" /> Manage Library
      </h2>

      {/* ✅ Form */}
      <div className="mb-6 p-6 bg-lightBg rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          {editingBook ? "Edit Book" : "Add New Book"}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="p-3 border rounded-lg" />
          <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} className="p-3 border rounded-lg" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-3 border rounded-lg">
            <option value="Quran">Quran</option>
            <option value="Hadith">Hadith</option>
            <option value="Tafsir">Tafsir</option>
            <option value="Dua">Dua</option>
          </select>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="p-3 border rounded-lg">
            <option value="English">English</option>
            <option value="Arabic">Arabic</option>
            <option value="Wolof">Wolof</option>
          </select>
          <input type="url" placeholder="Thumbnail URL" value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} className="p-3 border rounded-lg col-span-full" />
          <input type="url" placeholder="PDF URL" value={pdfUrl} onChange={(e) => setPdfUrl(e.target.value)} className="p-3 border rounded-lg col-span-full" />
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={editingBook ? handleSaveEdit : handleAddBook}
            className="bg-gold text-black font-semibold px-6 py-2 rounded-lg hover:bg-yellow-500"
          >
            {editingBook ? <FaSave className="inline mr-2" /> : <FaPlus className="inline mr-2" />}
            {editingBook ? "Save Changes" : "Add Book"}
          </button>
          {editingBook && (
            <button onClick={resetForm} className="bg-gray-300 px-6 py-2 rounded-lg">
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* ✅ Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3 text-left">Thumbnail</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Author</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">PDF</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  {book.thumbnailUrl ? (
                    <Image
                      src={book.thumbnailUrl}
                      alt={book.title}
                      width={40}
                      height={56}
                      className="rounded object-cover shadow"
                    />
                  ) : (
                    <span className="text-gray-400 italic">No image</span>
                  )}
                </td>
                <td className="p-3">{book.title}</td>
                <td className="p-3">{book.author}</td>
                <td className="p-3">{book.category}</td>
                <td className="p-3">
                  {book.pdfUrl ? (
                    <a
                      href={book.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <FaEye /> View
                    </a>
                  ) : (
                    <span className="text-gray-400 italic">No PDF</span>
                  )}
                </td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => handleEditBook(book)} className="text-gold"><FaEdit /></button>
                  <button onClick={() => handleDeleteBook(book.id)} className="text-red-600"><FaTrashAlt /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLibrary;