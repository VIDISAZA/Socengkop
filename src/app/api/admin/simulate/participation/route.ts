import { NextRequest, NextResponse } from "next/server";
import { users, missions, transactions, leaderboard } from "@/lib/data";

export async function POST(req: NextRequest) {
  try {
    const { userId, missionId } = await req.json();
    const user = users.find(u => u.id === Number(userId));
    const mission = missions.find(m => m.id === Number(missionId));
    if (!user || !mission) return NextResponse.json({ success: false, message: "User atau Misi tidak ditemukan" }, { status: 404 });

    user.points += mission.reward;
    user.missionsCompleted = (user.missionsCompleted || 0) + 1;
    transactions.push({
      id: transactions.length + 1, userId: user.id, amount: 0, pointsEarned: mission.reward,
      date: new Date().toISOString(), items: [], type: "mission",
      note: `[Simulasi] Menyelesaikan misi: ${mission.title}`,
    });

    const rtEntry = leaderboard.find(l => l.rt === user.rt);
    if (rtEntry) rtEntry.totalPoints += mission.reward;

    return NextResponse.json({ success: true, message: `Simulasi: ${user.name} menyelesaikan misi ${mission.title}` });
  } catch (e: unknown) {
    return NextResponse.json({ success: false, message: String(e) }, { status: 500 });
  }
}
