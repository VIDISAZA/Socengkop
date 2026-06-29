"use client";

import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TIER_CONFIG = {
  1: { badge: "🌱", label: "Pandu Srawung", color: "#16a34a", bg: "#dcfce7" },
  2: { badge: "⚔️", label: "Agra Satria", color: "#d97706", bg: "#fef3c7" },
  3: { badge: "👑", label: "Kamadeva Widya", color: "#dc2626", bg: "#fee2e2" },
};

export default function LoginPage() {
  const { users, login, isLoadingUsers } = useAppContext();
  const router = useRouter();
  const [selecting, setSelecting] = useState<number | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<keyof typeof FEATURE_DETAILS | null>(null);

  const handleLogin = async (userId: number) => {
    setSelecting(userId);
    login(userId);
    setTimeout(() => router.push("/dashboard"), 300);
  };

  return (
    <div className="page-container flex flex-col" style={{ background: "linear-gradient(160deg, #0d3318 0%, #1a5c2a 40%, #0d3318 100%)" }}>
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full" style={{ background: "radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)" }} />
        <div className="absolute top-40 -left-20 w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle, rgba(45,138,71,0.2) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full" style={{ background: "radial-gradient(circle, rgba(26,92,42,0.3) 0%, transparent 70%)" }} />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 flex-1 flex flex-col px-6 pt-16 pb-6">
        {/* Logo & Brand */}
        <div className="text-center mb-10 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-5 animate-float" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))", border: "1px solid rgba(255,255,255,0.2)" }}>
            <span className="text-4xl">🌾</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">SocengKOP</h1>
          <p className="text-green-200 text-sm font-medium mb-4">Neo-Koperasi Member Ecosystem</p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold" style={{ background: "rgba(245,158,11,0.2)", border: "1px solid rgba(245,158,11,0.4)", color: "#fbbf24" }}>
            <span>🏆</span>
            <span>Hackathon Koperasi Merah Putih 2026</span>
          </div>
        </div>

        {/* Tagline */}
        <div className="text-center mb-8 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <p className="text-white/70 text-sm leading-relaxed">
            Gamifikasi keanggotaan koperasi untuk<br />
            <span className="text-green-300 font-semibold">akselerasi partisipasi & kemakmuran bersama</span>
          </p>
        </div>

        {/* Login Card */}
        <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          <div className="rounded-3xl p-6" style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(20px)", boxShadow: "0 24px 64px rgba(0,0,0,0.3)" }}>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1 h-5 rounded-full bg-green-600" />
              <p className="text-sm font-bold text-gray-600 uppercase tracking-wider">Pilih Akun Demo</p>
            </div>

            {isLoadingUsers ? (
              <div className="flex flex-col items-center justify-center py-10 gap-3">
                <div className="w-10 h-10 border-3 border-green-200 border-t-green-600 rounded-full" style={{ borderWidth: 3, animation: "spin-slow 0.8s linear infinite" }} />
                <p className="text-sm text-gray-500">Memuat data anggota...</p>
              </div>
            ) : (
              <div className="space-y-3 stagger">
                {users.map((user) => {
                  const tier = TIER_CONFIG[user.tier.level as keyof typeof TIER_CONFIG] || TIER_CONFIG[1];
                  const isSelecting = selecting === user.id;

                  return (
                    <button
                      key={user.id}
                      onClick={() => handleLogin(user.id)}
                      disabled={selecting !== null}
                      className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200 animate-fade-in-up"
                      style={{
                        borderColor: isSelecting ? "#1a5c2a" : "transparent",
                        background: isSelecting ? "#f0fdf4" : "#f9fafb",
                        transform: isSelecting ? "scale(0.98)" : "scale(1)",
                      }}
                    >
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-extrabold text-white" style={{ background: "linear-gradient(135deg, #1a5c2a, #2d8a47)" }}>
                          {user.name.charAt(0)}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs" style={{ background: tier.bg, border: "2px solid white" }}>
                          {tier.badge}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 text-base">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.rt} · {user.points.toLocaleString("id-ID")} Poin</p>
                      </div>

                      {/* Tier Badge */}
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-lg whitespace-nowrap" style={{ background: tier.bg, color: tier.color }}>
                          {user.tier.name}
                        </span>
                        <span className="text-xs text-gray-400">{user.tier.multiplier}× poin</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Footer note */}
            <p className="text-center text-[11px] text-gray-400 mt-5">
              Mode Demo MVP · Data bersifat simulasi
            </p>
          </div>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-8 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          {Object.keys(FEATURE_DETAILS).map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFeature(f as keyof typeof FEATURE_DETAILS)}
              className="text-xs px-3 py-1.5 rounded-full font-medium transition cursor-pointer hover:bg-white/20 active:scale-95"
              style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Feature Details Modal */}
      {selectedFeature && (() => {
        const feat = FEATURE_DETAILS[selectedFeature];
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div 
              className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 animate-slide-in-bottom"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-2xl">
                  {feat.icon}
                </div>
                <div>
                  <h3 className="font-extrabold text-gray-900 text-base">{feat.title}</h3>
                  <p className="text-[10px] text-green-700 font-bold uppercase tracking-wider">{feat.subtitle}</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed mb-6">
                {feat.description}
              </p>
              <button
                onClick={() => setSelectedFeature(null)}
                className="w-full py-3 bg-green-700 hover:bg-green-800 text-white font-bold text-xs rounded-xl shadow-md transition active:scale-95"
              >
                Mengerti &amp; Tutup
              </button>
            </div>
          </div>
        );
      })()}

      {/* Bottom safe area */}
      <div className="h-8" />
    </div>
  );
}

const FEATURE_DETAILS = {
  "🎯 Gamifikasi Poin": {
    title: "Gamifikasi Poin",
    subtitle: "SHU Participation-Driven",
    description: "Semua keaktifan warga (belanja harian, partisipasi RAT) dikonversi menjadi Poin Partisipasi yang menentukan bobot pengali pembagian SHU di akhir tahun buku. Adil, produktif, dan menjaga arus kas koperasi kecil tetap sehat tanpa bakar uang!",
    icon: "🎯"
  },
  "🏆 Leaderboard RT": {
    title: "Leaderboard RT",
    subtitle: "Kompetisi Sehat Gotong Royong",
    description: "RT dengan peringkat teraktif (Top 3) di desa akan mendapatkan hak prioritas realisasi usulan pembangunan fasilitas umum RT pada Rapat Anggota Tahunan (RAT) Pusat!",
    icon: "🏆"
  },
  "🌾 SHU Transparan": {
    title: "SHU Transparan",
    subtitle: "Bagi Hasil Adil & Real-time",
    description: "Anggota dapat memantau estimasi Sisa Hasil Usaha (SHU) mereka secara real-time langsung melalui aplikasi berdasarkan kontribusi harian yang tercatat secara transparan.",
    icon: "🌾"
  },
  "🤝 Referral Gotong Royong": {
    title: "Referral Gotong Royong",
    subtitle: "Pertumbuhan Organik Komunitas",
    description: "Undang tetangga terdekat Anda untuk bergabung menjadi anggota koperasi dengan kode referral unik terverifikasi, dapatkan poin keaktifan instan segera setelah profil mereka disetujui.",
    icon: "🤝"
  }
};

