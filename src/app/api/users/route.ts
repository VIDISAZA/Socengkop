import { NextResponse } from "next/server";
import { users } from "@/lib/data";

export async function GET() {
  try {
    const safeUsers = users.map(u => ({
      id: u.id, name: u.name, phone: u.phone, rt: u.rt, rw: u.rw,
      points: u.points, tier: u.tier, tierName: u.tierName,
      multiplier: u.multiplier, referralCode: u.referralCode,
      isActive: u.isActive, joinDate: u.joinDate,
    }));
    return NextResponse.json({ success: true, data: safeUsers, message: "Data user berhasil diambil" });
  } catch (e: unknown) {
    return NextResponse.json({ success: false, message: String(e) }, { status: 500 });
  }
}
