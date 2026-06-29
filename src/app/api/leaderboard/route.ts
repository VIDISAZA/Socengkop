import { NextResponse } from "next/server";
import { leaderboard } from "@/lib/data";

export async function GET() {
  try {
    const ranked = [...leaderboard].sort((a, b) => b.totalPoints - a.totalPoints)
      .map((item, index) => ({ ...item, rank: index + 1 }));
    return NextResponse.json({ success: true, data: ranked, message: "Leaderboard berhasil diambil" });
  } catch (e: unknown) {
    return NextResponse.json({ success: false, message: String(e) }, { status: 500 });
  }
}
