import { NextResponse } from "next/server";
import { users, leaderboard } from "@/lib/data";

export async function GET() {
  try {
    const activeMembers = users.filter(u => u.points > 0).length;
    const missionsCompleted = users.reduce((sum, u) => sum + (u.missionsCompleted || 0), 0);
    return NextResponse.json({
      success: true,
      data: { totalMembers: users.length, activeMembers, missionsCompleted, leaderboard },
    });
  } catch (e: unknown) {
    return NextResponse.json({ success: false, message: String(e) }, { status: 500 });
  }
}
