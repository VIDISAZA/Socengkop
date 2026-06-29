import { NextResponse } from "next/server";
import { transactions } from "@/lib/data";

export async function GET() {
  try {
    const incoming = transactions.filter(t => t.type === "shopping").reduce((sum, t) => sum + t.amount, 0);
    const outgoing = incoming * 0.65;
    const profit = incoming - outgoing;
    const shuAllocated = profit * 0.40;
    return NextResponse.json({
      success: true,
      data: { incoming, outgoing, profit, shuAllocated, transactionCount: transactions.length, history: transactions },
    });
  } catch (e: unknown) {
    return NextResponse.json({ success: false, message: String(e) }, { status: 500 });
  }
}
