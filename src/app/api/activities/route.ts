import { NextResponse } from "next/server";
import { activities } from "@/data/ActivityData";

export async function GET() {
  const shuffledActivities = [...activities].sort(() => Math.random() - 0.5).slice(0, 3);
  return NextResponse.json(shuffledActivities, { status: 200 });
}