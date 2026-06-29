import { NextRequest, NextResponse } from "next/server";
import { transactions } from "@/lib/data";

export async function POST(req: NextRequest) {
  try {
    const { amount, type, note } = await req.json();
    const parsedAmount = Number(amount);
    const newTx = {
      id: transactions.length + 1, userId: 1, amount: parsedAmount,
      pointsEarned: Math.floor(parsedAmount / 1000),
      date: new Date().toISOString(), items: [], type: type || "shopping",
      note: note || "Simulasi Transaksi",
    };
    transactions.push(newTx);
    return NextResponse.json({ success: true, message: "Simulasi transaksi berhasil ditambahkan" });
  } catch (e: unknown) {
    return NextResponse.json({ success: false, message: String(e) }, { status: 500 });
  }
}
