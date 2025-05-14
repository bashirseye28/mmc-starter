import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// ✅ Normalize private key (handle \r\n just in case, and log safely)
const rawKey = process.env.FIREBASE_PRIVATE_KEY;
const formattedKey = rawKey?.replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n');

// ✅ TEMP debug — use JSON.stringify to catch accidental characters
console.log("✅ RAW KEY:", JSON.stringify(rawKey));
console.log("✅ FORMATTED KEY:", JSON.stringify(formattedKey));

// ✅ Initialize Firebase Admin only once
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: formattedKey,
    }),
  });
}

export const auth = getAuth();
export const db = getFirestore();