"use client";

import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Trophy, Medal, Users, ChevronDown, ChevronUp, Sparkles } from "lucide-react";

type LeaderboardMember = {
  id: number;
  name: string;
  points: number;
};

type LeaderboardItem = {
  rt: string;
  rw: string;
  totalPoints: number;
  memberCount: number;
  members?: LeaderboardMember[];
  rank: number;
  icon?: string;
};

export default function LeaderboardPage() {
  const { currentUser, leaderboard } = useAppContext();
  const router = useRouter();
  const [expandedRt, setExpandedRt] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser) router.push("/login");
  }, [currentUser, router]);

  if (!currentUser) return null;

  const toggleExpand = (rt: string) => {
    setExpandedRt(expandedRt === rt ? null : rt);
  };

  // Extract top 3 for the podium
  const podium = leaderboard.slice(0, 3);
  const restList = leaderboard.slice(3);

  // Re-order podium as [2nd, 1st, 3rd] for classic visual layout
  const visualPodium = [];
  if (podium[1]) visualPodium.push(podium[1]); // 2nd
  if (podium[0]) visualPodium.push(podium[0]); // 1st
  if (podium[2]) visualPodium.push(podium[2]); // 3rd

  return (
    <div className="page-container pb-28">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-kop-hero text-white rounded-b-[32px] pb-10">
        <div className="absolute top-4 left-4 z-10">
          <Link href="/dashboard" className="p-2.5 bg-white/10 rounded-xl hover:bg-white/20 transition flex items-center justify-center">
            <ArrowLeft size={18} className="text-white" />
          </Link>
        </div>
        
        <div className="text-center pt-16 px-5 relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500/20 rounded-3xl mb-4 border border-yellow-500/30 animate-float">
            <Trophy size={36} className="text-yellow-400" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Leaderboard Komunitas</h2>
          <p className="text-indigo-200 text-xs mt-1 leading-relaxed">
            Kompetisi sehat antar-RT untuk meningkatkan keaktifan gotong royong &amp; partisipasi belanja.
          </p>
        </div>

        {/* ─── CLASSIC 3D PODIUM ─── */}
        {podium.length > 0 && (
          <div className="flex justify-center items-end mt-8 px-4 gap-2 relative z-10 stagger">
            {/* 2nd place */}
            {podium[1] && (
              <div className="flex flex-col items-center flex-1 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
                <span className="text-2xl">🥈</span>
                <p className="text-xs font-bold text-white truncate max-w-[80px] mt-1">{podium[1].rt}</p>
                <p className="text-[10px] text-indigo-200 font-extrabold">{podium[1].totalPoints.toLocaleString("id-ID")} pts</p>
                <div className="w-full bg-white/10 border-t border-white/20 rounded-t-xl mt-3 flex items-center justify-center font-extrabold text-white text-base" style={{ height: 60 }}>
                  2
                </div>
              </div>
            )}

            {/* 1st place */}
            {podium[0] && (
              <div className="flex flex-col items-center flex-1 animate-fade-in-up">
                <span className="text-3xl animate-float">🥇</span>
                <p className="text-sm font-extrabold text-white truncate max-w-[90px] mt-1">{podium[0].rt}</p>
                <p className="text-xs font-extrabold text-yellow-400">{podium[0].totalPoints.toLocaleString("id-ID")} pts</p>
                <div className="w-full bg-yellow-500/20 border-t-2 border-yellow-500/40 rounded-t-2xl mt-3 flex items-center justify-center font-black text-yellow-300 text-2xl" style={{ height: 80, boxShadow: "0 -8px 24px rgba(245,158,11,0.15)" }}>
                  1
                </div>
              </div>
            )}

            {/* 3rd place */}
            {podium[2] && (
              <div className="flex flex-col items-center flex-1 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                <span className="text-2xl">🥉</span>
                <p className="text-xs font-bold text-white truncate max-w-[80px] mt-1">{podium[2].rt}</p>
                <p className="text-[10px] text-indigo-200 font-extrabold">{podium[2].totalPoints.toLocaleString("id-ID")} pts</p>
                <div className="w-full bg-white/5 border-t border-white/10 rounded-t-xl mt-3 flex items-center justify-center font-extrabold text-white text-sm" style={{ height: 45 }}>
                  3
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Ranks list */}
      <div className="px-5 mt-6">
        <div className="flex items-center gap-2 mb-3">
          <Users size={16} className="text-indigo-700" />
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Peringkat Lengkap RT</h3>
        </div>

        <div className="space-y-3">
          {leaderboard.map((entry) => {
            const isMyRt = entry.rt === currentUser.rt;
            const isExpanded = expandedRt === entry.rt;

            return (
              <div
                key={entry.rt}
                className="kop-card overflow-hidden bg-white border-gray-100"
                style={{
                  boxShadow: isMyRt ? "0 4px 20px rgba(70,60,216,0.1)" : "0 1px 3px rgba(0,0,0,0.04)",
                  borderColor: isMyRt ? "#463cd840" : "rgba(0,0,0,0.06)",
                }}
              >
                {/* Header Row */}
                <div
                  onClick={() => toggleExpand(entry.rt)}
                  className="p-4 flex items-center justify-between cursor-pointer active:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Rank Badge */}
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold bg-gray-50 text-gray-500 border border-gray-100">
                      {entry.rank === 1 ? "🥇" : entry.rank === 2 ? "🥈" : entry.rank === 3 ? "🥉" : `#${entry.rank}`}
                    </div>

                    <div>
                      <h4 className="font-extrabold text-[#3a3a3a] text-sm flex items-center gap-1.5">
                        {entry.rt}
                        {isMyRt && (
                          <span className="text-[9px] font-bold text-white bg-indigo-700 px-2 py-0.5 rounded-full uppercase tracking-wider">
                            RT Anda
                          </span>
                        )}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-medium mt-0.5">
                        {entry.memberCount} Anggota Terdaftar
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-extrabold text-[#3a3a3a] text-sm">{entry.totalPoints.toLocaleString("id-ID")} pts</p>
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Total Poin</p>
                    </div>
                    {entry.members && entry.members.length > 0 ? (
                      isExpanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />
                    ) : null}
                  </div>
                </div>

                {/* Expanded Members list */}
                {isExpanded && entry.members && (
                  <div className="bg-gray-50/50 px-4 py-3 border-t border-gray-100 space-y-2.5 animate-fade-in">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-2">Kontributor Teraktif RT</p>
                    {entry.members.map((member, idx) => (
                      <div key={member.id} className="flex items-center justify-between py-1 last:border-b-0">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-xs font-bold text-gray-400 w-4">{idx + 1}.</span>
                          <p className="text-xs font-semibold text-gray-700 truncate">{member.name}</p>
                        </div>
                        <span className="text-xs font-bold text-indigo-700">
                          {member.points.toLocaleString("id-ID")} pts
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Rules / Explanation Card */}
      <div className="px-5 mt-6 mb-2">
        <div className="kop-card p-5" style={{ background: "linear-gradient(135deg,#e8f5e9,#f0fdf4)" }}>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={16} className="text-indigo-700" />
            <h4 className="font-bold text-[#3a3a3a] text-sm">Dampak Keaktifan RT</h4>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            Peringkat dihitung berdasarkan total akumulasi Poin Partisipasi dari seluruh anggota yang terdaftar di masing-masing RT. RT dengan kontribusi teraktif akan mendapatkan <span className="font-bold text-indigo-700">prioritas usulan pembangunan fasilitas desa</span> pada RAT Pusat!
          </p>
        </div>
      </div>

      <BottomNav active="/leaderboard" />
    </div>
  );
}

function BottomNav({ active }: { active: string }) {
  const items = [
    { href: "/dashboard", icon: "🏠", label: "Beranda" },
    { href: "/belanja", icon: "🛒", label: "Belanja" },
    { href: "/misi", icon: "🎯", label: "Misi" },
    { href: "/leaderboard", icon: "🏆", label: "Ranking" },
    { href: "/profile", icon: "👤", label: "Profil" },
  ];
  return (
    <nav className="bottom-nav">
      <div className="flex justify-around items-center px-2">
        {items.map((item) => {
          const isActive = active === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all"
              style={{ minWidth: 52 }}
            >
              <span className="text-xl" style={{ filter: isActive ? "drop-shadow(0 0 8px rgba(70,60,216,0.5))" : "none", transform: isActive ? "scale(1.2)" : "scale(1)", transition: "all 0.2s" }}>
                {item.icon}
              </span>
              <span className="text-[10px] font-bold" style={{ color: isActive ? "#463cd8" : "#9ca3af" }}>
                {item.label}
              </span>
              {isActive && <div className="w-1 h-1 rounded-full bg-indigo-600" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
