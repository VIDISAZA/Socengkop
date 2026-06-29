"use client";

import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, CheckCircle } from "lucide-react";

export default function BelanjaPage() {
  const { currentUser, addTransaction } = useAppContext();
  const router = useRouter();
  const [amount, setAmount] = useState<string>("");
  const [success, setSuccess] = useState<number | null>(null);

  useEffect(() => {
    if (!currentUser) router.push("/login");
  }, [currentUser, router]);

  if (!currentUser) return null;

  const handleBelanja = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseInt(amount.replace(/\D/g, ""), 10);
    if (!numAmount || numAmount <= 0) return;

    const basePoints = Math.floor(numAmount / 1000);
    const pointsEarned = Math.floor(basePoints * currentUser.tier.multiplier);
    
    addTransaction(numAmount);
    setSuccess(pointsEarned);
    setAmount("");

    setTimeout(() => setSuccess(null), 3000);
  };

  const formatRupiah = (val: string) => {
    const numberString = val.replace(/[^,\d]/g, "").toString();
    const split = numberString.split(",");
    const sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      const separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }
    return rupiah ? rupiah : "";
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <div className="bg-white p-4 flex items-center gap-4 sticky top-0 z-10 shadow-sm">
        <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-full transition">
          <ArrowLeft size={20} className="text-gray-700" />
        </Link>
        <h1 className="font-bold text-gray-800 flex-1">Simulasi Belanja</h1>
      </div>

      <div className="p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-[#1B5E20]/10 w-16 h-16 rounded-full flex items-center justify-center text-[#1B5E20]">
              <ShoppingCart size={32} />
            </div>
          </div>
          
          <h2 className="text-center font-bold text-gray-800 mb-2">Input Pembelanjaan</h2>
          <p className="text-center text-sm text-gray-500 mb-6">Masukkan nominal belanja untuk mendapatkan poin partisipasi.</p>

          <form onSubmit={handleBelanja}>
            <div className="mb-6 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">Rp</span>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(formatRupiah(e.target.value))}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 pl-12 pr-4 text-xl font-bold text-gray-800 focus:outline-none focus:border-[#1B5E20] focus:ring-1 focus:ring-[#1B5E20] transition"
                placeholder="0"
                required
              />
            </div>

            <div className="bg-[#FFC107]/10 border border-[#FFC107]/30 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Estimasi Poin (x{currentUser.tier.multiplier}):</span>
                <span className="font-bold text-[#1B5E20]">
                  +{Math.floor(Math.floor((parseInt(amount.replace(/\D/g, "") || "0", 10)) / 1000) * currentUser.tier.multiplier)} Poin
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={!amount}
              className="w-full bg-[#1B5E20] hover:bg-[#1B5E20]/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-md transition-all active:scale-[0.98]"
            >
              Simpan Transaksi
            </button>
          </form>
        </div>
      </div>

      {/* Success Toast */}
      {success !== null && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 animate-in slide-in-from-bottom-5 fade-in duration-300 z-50">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full text-green-600">
              <CheckCircle size={24} />
            </div>
            <div>
              <p className="font-bold text-gray-800">Transaksi Berhasil!</p>
              <p className="text-sm font-bold text-[#1B5E20]">+{success} Poin partisipasi</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
