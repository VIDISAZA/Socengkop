"use client";

import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Target, Sparkles, Share2, Award, Zap } from "lucide-react";

export default function MisiPage() {
  const { currentUser, missions, completeMission } = useAppContext();
  const router = useRouter();
  const [success, setSuccess] = useState<{ title: string; reward: number } | null>(null);

  useEffect(() => {
    if (!currentUser) router.push("/login");
  }, [currentUser, router]);

  if (!currentUser) return null;

  const handleComplete = async (id: number, title: string, reward: number) => {
    await completeMission(id);
    setSuccess({ title, reward });
    setTimeout(() => setSuccess(null), 3000);
  };

  const getMissionIcon = (icon?: string) => {
    switch (icon) {
      case "shopping_bag": return "🛒";
      case "group_add": return "📢";
      case "share": return "🔗";
      case "star": return "⭐";
      case "event": return "📊";
      case "local_fire_department": return "🔥";
      default: return "🎯";
    }
  };

  const activeMissions = missions.filter((m) => m.isActive);
  const completedMissions = missions.filter((m) => !m.isActive);

  return (
    <div className="page-container pb-28">
      {/* Header */}
      <div className="bg-white p-4 flex items-center gap-4 sticky top-0 z-10 border-b border-gray-100">
        <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-xl transition">
          <ArrowLeft size={20} className="text-gray-700" />
        </Link>
        <h1 className="font-extrabold text-lg text-[#3a3a3a] flex-1">Misi Partisipasi</h1>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-yellow-50 text-yellow-700 border border-yellow-100">
          <Sparkles size={12} />
          <span>{currentUser.points.toLocaleString("id-ID")} Pts</span>
        </div>
      </div>

      <div className="p-5">
        {/* Intro */}
        <div className="mb-6">
          <h2 className="text-xl font-extrabold text-gray-950">Akselerasi Gotong Royong 🌾</h2>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            Selesaikan misi keaktifan di bawah ini untuk mendapatkan Poin Partisipasi. Poin Anda secara langsung meningkatkan bagi hasil keuntungan (SHU) Anda di akhir tahun.
          </p>
        </div>

        {/* Tab / Section Title: Misi Tersedia */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-yellow-500" />
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Misi Aktif Hari Ini</h3>
          </div>

          {activeMissions.length === 0 ? (
            <div className="kop-card p-8 text-center bg-indigo-50/50 border-indigo-100">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-100 rounded-full text-indigo-600 mb-4 animate-float">
                <CheckCircle size={28} />
              </div>
              <h3 className="font-bold text-[#3a3a3a] mb-1">Semua Misi Selesai!</h3>
              <p className="text-xs text-gray-500">Anda telah merampungkan semua misi partisipasi hari ini. Kembali besok untuk tantangan baru!</p>
            </div>
          ) : (
            <div className="space-y-3 stagger">
              {activeMissions.map((mission) => (
                <div key={mission.id} className="kop-card p-5 border-gray-100 shadow-sm relative overflow-hidden bg-white">
                  <div className="flex gap-4">
                    {/* Mission Icon Badge */}
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-2xl flex-shrink-0 border border-gray-100">
                      {getMissionIcon(mission.icon)}
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase bg-yellow-100 text-yellow-800">
                          {mission.category || "Umum"}
                        </span>
                        {mission.reward >= 100 && (
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase bg-red-100 text-red-700 flex items-center gap-0.5">
                            <Award size={8} /> High Reward
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-[#3a3a3a] text-sm">{mission.title}</h4>
                      <p className="text-xs text-gray-500 mt-1 mb-4 leading-relaxed">{mission.description}</p>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-extrabold text-indigo-700">+{mission.reward} Poin</span>
                          <span className="text-[10px] text-gray-400 font-medium">SHU</span>
                        </div>
                        <button
                          onClick={() => handleComplete(mission.id, mission.title, mission.reward)}
                          className="bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-sm transition-all active:scale-95"
                        >
                          Klaim Poin
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Section Title: Misi Selesai */}
          {completedMissions.length > 0 && (
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-indigo-600" />
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Misi Selesai ({completedMissions.length})</h3>
              </div>

              <div className="space-y-3 opacity-60">
                {completedMissions.map((mission) => (
                  <div key={mission.id} className="kop-card p-4 bg-gray-50/50 border-gray-200">
                    <div className="flex gap-4 items-center">
                      <div className="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center text-xl flex-shrink-0 text-gray-500">
                        ✔️
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-600 text-sm line-through">{mission.title}</h4>
                        <p className="text-xs text-gray-400 mt-0.5">Reward {mission.reward} poin berhasil ditambahkan</p>
                      </div>
                      <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 px-2 py-1 rounded-lg">
                        +{mission.reward} Pts
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Success Toast Claim */}
      {success !== null && (
        <div className="toast">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 flex-shrink-0 animate-bounce">
              <Sparkles size={28} />
            </div>
            <div>
              <p className="font-extrabold text-[#3a3a3a] text-sm">Misi Berhasil Diselesaikan! 🎉</p>
              <p className="text-xs font-bold text-[#463cd8] mt-0.5">
                +{success.reward.toLocaleString("id-ID")} Pts ditambahkan untuk &quot;{success.title}&quot;
              </p>
            </div>
          </div>
        </div>
      )}

      <BottomNav active="/misi" />
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
              <span className="text-xl" style={{ filter: isActive ? "drop-shadow(0 0 8px rgba(26,92,42,0.5))" : "none", transform: isActive ? "scale(1.2)" : "scale(1)", transition: "all 0.2s" }}>
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
