import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// ✅ Normalize the private key to valid PEM format
const rawKey = process.env.FIREBASE_PRIVATE_KEY;

let formattedKey = rawKey
  ?.replace(/\\r\\n/g, '\n')
  .replace(/\\n/g, '\n')
  .replace(/\r/g, '')
  .trim();

// ✅ Ensure the key has the correct PEM delimiters (add them if missing)
if (formattedKey && !formattedKey.startsWith('-----BEGIN PRIVATE KEY-----')) {
  formattedKey = `-----BEGIN PRIVATE KEY-----\n${formattedKey}`;
}
if (formattedKey && !formattedKey.endsWith('-----END PRIVATE KEY-----\n')) {
  formattedKey = `${formattedKey}\n-----END PRIVATE KEY-----\n`;
}

// ✅ TEMP debug — remove after confirmation
console.log('✅ RAW KEY:', JSON.stringify(rawKey));
console.log('✅ FORMATTED KEY:', JSON.stringify(formattedKey));

// ✅ Initialize Firebase Admin once
if (!getApps().length) {
  try {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: formattedKey,
      }),
    });
    console.log('✅ Firebase Admin SDK initialized successfully!');
  } catch (error: any) {
    console.error('❌ Error initializing Firebase Admin SDK:', error.message);
    console.error('❌ Formatted Private Key (for debugging):', formattedKey);
  }
}

export const auth = getAuth();
export const db = getFirestore();