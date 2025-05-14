// src/app/lib/firebaseAdmin.ts
import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT!);

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

export const auth = getAuth();
export const db = getFirestore();