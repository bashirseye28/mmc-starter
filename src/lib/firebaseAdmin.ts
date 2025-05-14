import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// ✅ Normalize private key — strip \r and convert \n correctly
const rawKey = process.env.FIREBASE_PRIVATE_KEY;
const formattedKey = rawKey
  ?.replace(/\\r/g, '')     // remove carriage returns
  .replace(/\\n/g, '\n');   // convert escaped newlines to real ones

// ✅ TEMP DEBUG: log to confirm formatting (don't log full key in prod)
console.log("✅ RAW KEY:", JSON.stringify(rawKey));
console.log("✅ FORMATTED KEY:", JSON.stringify(formattedKey));

// ✅ Initialize Firebase Admin once
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: formattedKey,
    }),
  });
}

// ✅ Export Firebase services
export const auth = getAuth();
export const db = getFirestore();