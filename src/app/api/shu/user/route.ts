import { NextRequest, NextResponse } from "next/server";
import { shu, findUserById } from "@/lib/data";

// GET /api/shu/user?userId=1
export async function GET(req: NextRequest) {
  try {
    const userId = parseInt(req.nextUrl.searchParams.get("userId") || "");
    if (!userId) return NextResponse.json({ success: false, message: "Parameter userId diperlukan" }, { status: 400 });

    const user = findUserById(userId);
    if (!user) return NextResponse.json({ success: false, message: "User tidak ditemukan" }, { status: 404 });

    const userBonus = shu.memberBonus.find(b => b.userId === userId);
    if (!userBonus) return NextResponse.json({ success: false, message: "Data SHU untuk user tidak ditemukan" }, { status: 404 });

    return NextResponse.json({
      success: true,
      data: {
        user: { id: user.id, name: user.name, points: user.points, tier: user.tier, tierName: user.tierName },
        shu: { year: shu.year, totalSHU: shu.totalSHU, distribution: shu.distribution, weight: userBonus.weight, shuAmount: userBonus.shuAmount, rank: userBonus.rank },
      },
    });
  } catch (e: unknown) {
    return NextResponse.json({ success: false, message: String(e) }, { status: 500 });
  }
}
