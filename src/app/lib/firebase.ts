import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// 🔹 Secure Firebase config using environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// 🔹 TypeScript Interface for Book Data
export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  language: string;
  pdfUrl: string;
  thumbnailUrl: string;
}

// 🔹 Fetch Books from Firestore with Error Handling
export const fetchBooks = async (): Promise<Book[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "books"));
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        title: data.title || "Unknown Title",
        author: data.author || "Unknown Author",
        category: data.category || "Uncategorized",
        language: data.language || "Unknown",
        pdfUrl: data.pdfUrl || "#",
        thumbnailUrl: data.thumbnailUrl || "/images/library/default-book.webp",
      };
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};

// 🔹 Export Firebase Services
export { db, auth };