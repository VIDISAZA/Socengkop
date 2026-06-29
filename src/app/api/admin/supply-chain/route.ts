import { NextResponse } from "next/server";
import { supplyChain } from "@/lib/data";

export async function GET() {
  try {
    return NextResponse.json({ success: true, data: supplyChain });
  } catch (e: unknown) {
    return NextResponse.json({ success: false, message: String(e) }, { status: 500 });
  }
}
