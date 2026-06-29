import { NextRequest, NextResponse } from "next/server";
import { supplyChain } from "@/lib/data";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();
    const item = supplyChain.find(p => p.id === Number(id));
    if (!item) return NextResponse.json({ success: false, message: "Produk tidak ditemukan" }, { status: 404 });

    const currentStatus = item.status;
    if (currentStatus === "petani") {
      item.status = "koperasi"; item.steps[1].completed = true; item.steps[1].date = new Date().toISOString();
    } else if (currentStatus === "koperasi") {
      item.status = "pasar"; item.steps[2].completed = true; item.steps[2].date = new Date().toISOString();
    } else {
      item.status = "petani"; item.steps[1].completed = false; item.steps[2].completed = false; item.steps[0].date = new Date().toISOString();
    }
    item.lastUpdate = new Date().toISOString();
    return NextResponse.json({ success: true, data: supplyChain });
  } catch (e: unknown) {
    return NextResponse.json({ success: false, message: String(e) }, { status: 500 });
  }
}
