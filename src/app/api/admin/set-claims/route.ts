// import { NextRequest, NextResponse } from "next/server";
// import { getAuth } from "firebase-admin/auth";
// import { getApps, initializeApp, cert } from "firebase-admin/app";

// // ✅ Initialize Firebase Admin only once
// if (!getApps().length) {
//   initializeApp({
//     credential: cert({
//       projectId: process.env.FIREBASE_PROJECT_ID,
//       clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//       privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
//     }),
//   });
// }

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { uid } = body;

//     if (!uid) {
//       return NextResponse.json({ error: "UID is required" }, { status: 400 });
//     }

//     await getAuth().setCustomUserClaims(uid, { admin: true });

//     return NextResponse.json({ success: true });
//   } catch (error: any) {
//     console.error("❌ Error setting claims:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
// console.log("✅ raw PRIVATE_KEY:", process.env.FIREBASE_PRIVATE_KEY);
// console.log("✅ replaced PRIVATE_KEY:", process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"));