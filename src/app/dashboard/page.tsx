"use client";

import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Target, Trophy, LogOut } from "lucide-react";

export default function DashboardPage() {
  const { currentUser, transactions, missions, leaderboard, logout } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser, router]);

  if (!currentUser) return null;

  const nextTierPoints = currentUser.tier.level === 1 ? 2000 : currentUser.tier.level === 2 ? 5000 : 5000;
  const progressPercent = Math.min(100, Math.max(0, (currentUser.points / nextTierPoints) * 100));

  const myRtLeaderboard = leaderboard.find(l => l.rt === currentUser.rt);
  const activeMissions = missions.filter(m => m.isActive).length;
  const myTransactions = transactions.filter(t => t.userId === currentUser.id).slice(0, 5);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#F5F5F5] pb-20">
      {/* Header */}
      <div className="bg-[#1B5E20] text-white p-6 rounded-b-3xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
        <div className="flex justify-between items-start relative z-10">
          <div>
            <p className="text-white/80 text-sm">Selamat datang,</p>
            <h1 className="text-2xl font-bold">{currentUser.name}</h1>
            <p className="text-white/90 text-sm mt-1">{currentUser.rt}</p>
          </div>
          <button onClick={() => { logout(); router.push('/login'); }} className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition">
            <LogOut size={18} />
          </button>
        </div>

        <div className="mt-8 bg-white/10 p-4 rounded-xl border border-white/20 backdrop-blur-sm">
          <div className="flex justify-between items-end mb-2">
            <div>
              <p className="text-white/80 text-xs uppercase tracking-wider">Total Poin</p>
              <p className="text-3xl font-extrabold text-[#FFC107]">{currentUser.points.toLocaleString("id-ID")}</p>
            </div>
            <div className="text-right">
              <span className="inline-block bg-[#FFC107] text-[#1B5E20] text-xs font-bold px-2 py-1 rounded-md">
                {currentUser.tier.name}
              </span>
              <p className="text-white/60 text-[10px] mt-1">Multiplier: {currentUser.tier.multiplier}x</p>
            </div>
          </div>
          
          {currentUser.tier.level < 3 && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-white/80 mb-1">
                <span>Progress ke Tier {currentUser.tier.level + 1}</span>
                <span>{currentUser.points} / {nextTierPoints}</span>
              </div>
              <div className="w-full bg-black/20 rounded-full h-1.5">
                <div className="bg-[#FFC107] h-1.5 rounded-full" style={{ width: `${progressPercent}%` }}></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6 mt-2">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="bg-green-100 p-2.5 rounded-xl text-[#1B5E20]">
              <Target size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{activeMissions}</p>
              <p className="text-xs text-gray-500">Misi Aktif</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="bg-yellow-100 p-2.5 rounded-xl text-[#FFC107]">
              <Trophy size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">#{myRtLeaderboard?.rank || '-'}</p>
              <p className="text-xs text-gray-500">Ranking {currentUser.rt}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <Link href="/belanja" className="flex flex-col items-center justify-center p-3 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-[#1B5E20] transition group">
            <div className="bg-gray-50 p-3 rounded-full mb-2 group-hover:bg-[#1B5E20]/10 text-[#1B5E20]">
              <ShoppingCart size={24} />
            </div>
            <span className="text-xs font-semibold text-gray-700">Belanja</span>
          </Link>
          <Link href="/misi" className="flex flex-col items-center justify-center p-3 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-[#1B5E20] transition group">
            <div className="bg-gray-50 p-3 rounded-full mb-2 group-hover:bg-[#1B5E20]/10 text-[#1B5E20] relative">
              <Target size={24} />
              {activeMissions > 0 && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>}
            </div>
            <span className="text-xs font-semibold text-gray-700">Misi</span>
          </Link>
          <Link href="/leaderboard" className="flex flex-col items-center justify-center p-3 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-[#1B5E20] transition group">
            <div className="bg-gray-50 p-3 rounded-full mb-2 group-hover:bg-[#1B5E20]/10 text-[#1B5E20]">
              <Trophy size={24} />
            </div>
            <span className="text-xs font-semibold text-gray-700">Peringkat</span>
          </Link>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Transaksi Terakhir</h3>
          </div>
          {myTransactions.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">Belum ada transaksi</p>
          ) : (
            <div className="space-y-4">
              {myTransactions.map(tx => (
                <div key={tx.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-50 p-2 rounded-lg text-gray-500">
                      <ShoppingCart size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Belanja</p>
                      <p className="text-xs text-gray-500">{new Date(tx.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', hour: '2-digit', minute:'2-digit'})}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-800">Rp {tx.amount.toLocaleString("id-ID")}</p>
                    <p className="text-xs font-bold text-[#1B5E20]">+{tx.pointsEarned} Poin</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
