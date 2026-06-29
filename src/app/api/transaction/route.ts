import { NextRequest, NextResponse } from "next/server";
import { transactions, findUserById, calculatePoints, updateUserTier } from "@/lib/data";

// GET /api/transaction?userId=1
export async function GET(req: NextRequest) {
  try {
    const userId = parseInt(req.nextUrl.searchParams.get("userId") || "");
    if (!userId) return NextResponse.json({ success: false, message: "Parameter userId diperlukan" }, { status: 400 });

    const userTxs = transactions.filter(t => t.userId === userId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return NextResponse.json({ success: true, data: userTxs });
  } catch (e: unknown) {
    return NextResponse.json({ success: false, message: String(e) }, { status: 500 });
  }
}

// POST /api/transaction — add new transaction
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, amount, items = [] } = body;

    if (!userId || !amount || amount <= 0) {
      return NextResponse.json({ success: false, message: "userId dan amount diperlukan" }, { status: 400 });
    }

    const user = findUserById(parseInt(userId));
    if (!user) return NextResponse.json({ success: false, message: "User tidak ditemukan" }, { status: 404 });

    const pointsEarned = calculatePoints(amount, user.multiplier);
    user.points += pointsEarned;
    user.totalTransactions = (user.totalTransactions || 0) + 1;
    user.totalSpent = (user.totalSpent || 0) + amount;

    const newTx = {
      id: transactions.length + 1,
      userId: user.id,
      amount,
      pointsEarned,
      date: new Date().toISOString(),
      items,
      type: "shopping" as const,
    };
    transactions.push(newTx);

    const tierResult = updateUserTier(user);

    return NextResponse.json({
      success: true,
      data: { transaction: newTx, user: { id: user.id, name: user.name, points: user.points, tier: user.tier, tierName: user.tierName, multiplier: user.multiplier }, ...tierResult },
      message: "Transaksi berhasil ditambahkan! 🎉",
    });
  } catch (e: unknown) {
    return NextResponse.json({ success: false, message: String(e) }, { status: 500 });
  }
}
