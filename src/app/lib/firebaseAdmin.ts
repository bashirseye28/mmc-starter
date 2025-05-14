import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// ✅ Normalize the private key to valid PEM format
const rawKey = process.env.FIREBASE_PRIVATE_KEY;

const formattedKey = rawKey
  ?.replace(/\\r\\n/g, '\n')   // handles escaped \r\n
  .replace(/\\n/g, '\n')       // handles escaped \n
  .replace(/\r/g, '');         // removes raw carriage returns (← this was still breaking it)

// ✅ TEMP debug — remove after confirmation
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

export const auth = getAuth();
export const db = getFirestore();