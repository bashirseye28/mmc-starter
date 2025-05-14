import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// ✅ Replace \n with actual newlines for PEM key
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

// ✅ Optional: Debug one-line to verify formatting (safe)
console.log("🔐 Firebase Admin: Private key starts with:", privateKey?.slice(0, 30));

// ✅ Initialize Firebase Admin only once
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey,
    }),
  });
}

// ✅ Export initialized services
export const auth = getAuth();
export const db = getFirestore();