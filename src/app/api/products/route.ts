import { NextResponse } from "next/server";
import { products } from "@/lib/data";

export async function GET() {
  try {
    return NextResponse.json({ success: true, data: products, message: "Data produk berhasil diambil" });
  } catch (e: unknown) {
    return NextResponse.json({ success: false, message: String(e) }, { status: 500 });
  }
}
