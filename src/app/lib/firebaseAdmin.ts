// /src/lib/firebaseAdmin.ts
import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// ✅ DEBUG logs once
console.log("✅ raw PRIVATE_KEY:", process.env.FIREBASE_PRIVATE_KEY);
console.log(
  "✅ replaced PRIVATE_KEY:",
  process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")
);

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

export const auth = getAuth();
export const db = getFirestore();