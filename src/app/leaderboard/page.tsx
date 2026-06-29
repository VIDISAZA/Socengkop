"use client";

import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Trophy, Medal } from "lucide-react";

export default function LeaderboardPage() {
  const { currentUser, leaderboard } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) router.push("/login");
  }, [currentUser, router]);

  if (!currentUser) return null;

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#F5F5F5] pb-10">
      {/* Header */}
      <div className="bg-[#1B5E20] text-white p-6 rounded-b-3xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
        <div className="flex items-center gap-4 relative z-10 mb-6">
          <Link href="/dashboard" className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="font-bold text-xl flex-1">Leaderboard RT</h1>
        </div>
        
        <div className="text-center relative z-10 pb-4">
          <div className="inline-flex items-center justify-center bg-[#FFC107]/20 p-4 rounded-full mb-3">
            <Trophy size={40} className="text-[#FFC107]" />
          </div>
          <h2 className="text-2xl font-bold">Peringkat Komunitas</h2>
          <p className="text-white/80 text-sm mt-1">Kumpulkan poin untuk mengangkat peringkat RT Anda!</p>
        </div>
      </div>

      <div className="px-4 py-6 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between text-xs font-bold text-gray-500 uppercase">
            <span>Ranking</span>
            <span>Total Poin</span>
          </div>
          
          <div className="divide-y divide-gray-100">
            {leaderboard.map((entry) => {
              const isMyRt = entry.rt === currentUser.rt;
              let rankStyle = "text-gray-500 font-bold";
              let bgStyle = "bg-white";
              
              if (entry.rank === 1) {
                rankStyle = "text-[#FFC107] font-extrabold text-xl";
                bgStyle = "bg-yellow-50/50";
              } else if (entry.rank === 2) {
                rankStyle = "text-gray-400 font-extrabold text-lg";
              } else if (entry.rank === 3) {
                rankStyle = "text-amber-700 font-extrabold text-lg";
              }

              if (isMyRt) bgStyle = "bg-[#1B5E20]/5";

              return (
                <div key={entry.rt} className={`p-4 flex items-center gap-4 transition-colors ${bgStyle}`}>
                  <div className={`w-8 text-center ${rankStyle}`}>
                    {entry.rank <= 3 ? <Medal size={24} className="mx-auto" /> : `#${entry.rank}`}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold ${isMyRt ? 'text-[#1B5E20]' : 'text-gray-800'}`}>
                      {entry.rt} {isMyRt && <span className="ml-2 text-[10px] bg-[#1B5E20] text-white px-2 py-0.5 rounded-full">RT Anda</span>}
                    </h3>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">{entry.totalPoints.toLocaleString("id-ID")}</p>
                    <p className="text-[10px] text-gray-500 uppercase">Poin</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
