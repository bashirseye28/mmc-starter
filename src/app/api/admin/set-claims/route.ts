import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { initializeApp, applicationDefault } from "firebase-admin/app";

// Prevent re-initializing
const app = initializeApp({
  credential: applicationDefault(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { uid } = body;

    if (!uid) {
      return NextResponse.json({ error: "UID is required" }, { status: 400 });
    }

    await getAuth().setCustomUserClaims(uid, { admin: true });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}