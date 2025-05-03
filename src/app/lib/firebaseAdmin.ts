// /src/lib/firebaseAdmin.ts
import { getApps, initializeApp, applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

if (!getApps().length) {
  initializeApp({
    credential: applicationDefault(),
  });
}

export const auth = getAuth();