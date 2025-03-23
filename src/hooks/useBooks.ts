import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/lib/firebaseConfig";

export type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  pdfUrl: string;
  coverImage: string;
  category: string;
  language: string;
};

const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      const querySnapshot = await getDocs(collection(db, "books"));
      const booksList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Book[];
      setBooks(booksList);
      setLoading(false);
    };

    fetchBooks();
  }, []);

  return { books, loading };
};

export default useBooks;