import { NextResponse } from "next/server";
import { missions } from "@/lib/data";

export async function GET() {
  try {
    const active = missions.filter(m => m.isActive);
    return NextResponse.json({ success: true, data: active, message: "Data misi berhasil diambil" });
  } catch (e: unknown) {
    return NextResponse.json({ success: false, message: String(e) }, { status: 500 });
  }
}
