"use client";

import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Target, Trophy, LogOut, User, TrendingUp, Zap, Star, ArrowRight, Gift } from "lucide-react";

const TIER_CONFIG = {
  1: { badge: "🌱", icon: "🌱", color: "#16a34a", bg: "linear-gradient(135deg,#4ade80,#16a34a)", light: "#dcfce7" },
  2: { badge: "⚔️", icon: "⚔️", color: "#d97706", bg: "linear-gradient(135deg,#fbbf24,#d97706)", light: "#fef3c7" },
  3: { badge: "👑", icon: "👑", color: "#dc2626", bg: "linear-gradient(135deg,#f87171,#dc2626)", light: "#fee2e2" },
};

const NAV_ITEMS = [
  { href: "/dashboard", icon: "🏠", label: "Beranda" },
  { href: "/belanja", icon: "🛒", label: "Belanja" },
  { href: "/misi", icon: "🎯", label: "Misi" },
  { href: "/leaderboard", icon: "🏆", label: "Peringkat" },
  { href: "/profile", icon: "👤", label: "Profil" },
];

export default function DashboardPage() {
  const { currentUser, transactions, missions, leaderboard, logout } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) router.push("/login");
  }, [currentUser, router]);

  if (!currentUser) return null;

  const tier = TIER_CONFIG[currentUser.tier.level as keyof typeof TIER_CONFIG] || TIER_CONFIG[1];
  const nextTierPoints = currentUser.tier.level === 1 ? 2000 : currentUser.tier.level === 2 ? 5000 : 5000;
  const prevTierPoints = currentUser.tier.level === 1 ? 0 : currentUser.tier.level === 2 ? 2000 : 5000;
  const progressPercent = currentUser.tier.level === 3 ? 100 : Math.min(100, Math.max(0,
    ((currentUser.points - prevTierPoints) / (nextTierPoints - prevTierPoints)) * 100
  ));

  const myRtEntry = leaderboard.find(l => l.rt === currentUser.rt);
  const activeMissions = missions.filter(m => m.isActive).length;
  const myTransactions = transactions.slice(0, 5);

  // Estimasi SHU
  const totalAllPoints = 13390; // mock total
  const shuBobot = ((currentUser.points / totalAllPoints) * 100).toFixed(1);

  return (
    <div className="page-container pb-24">
      {/* ─── HERO HEADER ─── */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(145deg, #0d3318 0%, #1a5c2a 60%, #145c27 100%)", borderRadius: "0 0 32px 32px" }}>
        {/* decorative circles */}
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #fbbf24, transparent)" }} />
        <div className="absolute -bottom-6 -left-6 w-36 h-36 rounded-full opacity-10" style={{ background: "radial-gradient(circle, white, transparent)" }} />

        <div className="relative z-10 px-5 pt-12 pb-6">
          {/* Top bar */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-green-300 text-sm mb-1">Selamat datang, 👋</p>
              <h1 className="text-2xl font-extrabold text-white">{currentUser.name}</h1>
              <p className="text-green-400 text-xs mt-0.5">{currentUser.rt} · {currentUser.tierName}</p>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/profile" className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.12)" }}>
                <User size={16} className="text-white" />
              </Link>
              <button onClick={() => { logout(); router.push("/login"); }} className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.12)" }}>
                <LogOut size={16} className="text-white" />
              </button>
            </div>
          </div>

          {/* Point Card */}
          <div className="rounded-2xl p-5 mb-4" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(12px)" }}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-green-200 text-xs uppercase tracking-wider mb-1">Total Poin Partisipasi</p>
                <p className="text-4xl font-extrabold text-white animate-count-up">{currentUser.points.toLocaleString("id-ID")}</p>
                <p className="text-green-300 text-xs mt-1">≈ {shuBobot}% bobot SHU tahun ini</p>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs" style={{ background: tier.bg, color: "white" }}>
                  <span>{tier.icon}</span>
                  <span>{currentUser.tier.name}</span>
                </div>
                <p className="text-green-300 text-xs mt-1.5">{currentUser.tier.multiplier}× multiplier</p>
              </div>
            </div>

            {/* Progress Bar */}
            {currentUser.tier.level < 3 ? (
              <div>
                <div className="flex justify-between text-xs text-green-200 mb-2">
                  <span>Progress ke Tier {currentUser.tier.level + 1}</span>
                  <span>{currentUser.points.toLocaleString("id-ID")} / {nextTierPoints.toLocaleString("id-ID")}</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
                </div>
                <p className="text-green-300 text-xs mt-1.5">
                  Butuh <span className="font-bold text-yellow-300">{(nextTierPoints - currentUser.points).toLocaleString("id-ID")} poin</span> lagi untuk naik tier
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-2 p-2 rounded-xl" style={{ background: "rgba(245,158,11,0.2)" }}>
                <Star size={14} className="text-yellow-300" />
                <p className="text-yellow-200 text-xs font-semibold">Tier Tertinggi! Anda adalah Local Hero 🏆</p>
              </div>
            )}
          </div>

          {/* RT Rank pill */}
          {myRtEntry && (
            <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.08)" }}>
              <Trophy size={16} className="text-yellow-300" />
              <p className="text-green-200 text-sm">
                <span className="font-bold text-white">{currentUser.rt}</span> berada di
                <span className="font-extrabold text-yellow-300"> #{myRtEntry.rank}</span> leaderboard
              </p>
              <Link href="/leaderboard" className="ml-auto">
                <ArrowRight size={16} className="text-green-300" />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* ─── QUICK ACTIONS ─── */}
      <div className="px-5 mt-6">
        <div className="grid grid-cols-4 gap-3 stagger">
          {[
            { href: "/belanja", icon: <ShoppingCart size={22} />, label: "Belanja", color: "#1a5c2a", bg: "#dcfce7" },
            { href: "/misi", icon: <Target size={22} />, label: "Misi", color: "#d97706", bg: "#fef3c7", badge: activeMissions },
            { href: "/leaderboard", icon: <Trophy size={22} />, label: "Peringkat", color: "#7c3aed", bg: "#ede9fe" },
            { href: "/profile", icon: <User size={22} />, label: "Profil", color: "#0891b2", bg: "#e0f2fe" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="kop-card flex flex-col items-center p-3 gap-2 relative animate-fade-in-up"
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: item.bg, color: item.color }}>
                {item.icon}
              </div>
              <span className="text-xs font-semibold text-gray-700">{item.label}</span>
              {item.badge ? (
                <span className="absolute top-2 right-2 w-5 h-5 bg-red-500 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center">{item.badge}</span>
              ) : null}
            </Link>
          ))}
        </div>
      </div>

      {/* ─── STATS STRIP ─── */}
      <div className="px-5 mt-5">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Transaksi", value: transactions.length, icon: <ShoppingCart size={16} />, color: "#1a5c2a" },
            { label: "Misi Selesai", value: missions.filter(m => !m.isActive).length, icon: <Target size={16} />, color: "#d97706" },
            { label: "Bobot SHU", value: `${shuBobot}%`, icon: <Gift size={16} />, color: "#7c3aed" },
          ].map((s) => (
            <div key={s.label} className="kop-card p-4 text-center">
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full mb-2" style={{ background: `${s.color}18`, color: s.color }}>
                {s.icon}
              </div>
              <p className="text-xl font-extrabold text-gray-900">{s.value}</p>
              <p className="text-[10px] text-gray-500 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── ACTIVE MISSIONS PREVIEW ─── */}
      {activeMissions > 0 && (
        <div className="px-5 mt-5">
          <div className="kop-card p-5" style={{ background: "linear-gradient(135deg, #fefce8, #fff)" }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Zap size={18} className="text-yellow-500" />
                <h3 className="font-bold text-gray-800">Misi Aktif</h3>
                <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">{activeMissions}</span>
              </div>
              <Link href="/misi" className="text-xs font-bold text-green-700 flex items-center gap-1">
                Lihat <ArrowRight size={12} />
              </Link>
            </div>
            <div className="space-y-2">
              {missions.filter(m => m.isActive).slice(0, 2).map(m => (
                <div key={m.id} className="flex items-center justify-between py-2 border-b border-yellow-100 last:border-0">
                  <span className="text-sm text-gray-700">{m.title}</span>
                  <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">+{m.reward} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── RECENT TRANSACTIONS ─── */}
      <div className="px-5 mt-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-gray-800">Aktivitas Terakhir</h3>
          <Link href="/belanja" className="text-xs font-bold text-green-700 flex items-center gap-1">
            Belanja <ArrowRight size={12} />
          </Link>
        </div>
        <div className="kop-card overflow-hidden">
          {myTransactions.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-4xl mb-3">🛒</div>
              <p className="text-sm text-gray-500 font-medium">Belum ada transaksi</p>
              <p className="text-xs text-gray-400 mt-1">Mulai belanja untuk mengumpulkan poin!</p>
              <Link href="/belanja" className="inline-block mt-4 text-xs font-bold text-green-700 underline">Belanja sekarang →</Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {myTransactions.map((tx, i) => {
                const typeMap: Record<string, { icon: string; label: string; color: string }> = {
                  shopping: { icon: "🛒", label: "Belanja", color: "#1a5c2a" },
                  mission: { icon: "🎯", label: "Misi", color: "#d97706" },
                  referral: { icon: "🤝", label: "Referral", color: "#7c3aed" },
                };
                const t = typeMap[tx.type || "shopping"] || typeMap.shopping;

                return (
                  <div key={tx.id} className="flex items-center gap-3 px-5 py-4 animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: "#f3f4f6" }}>
                      {t.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800">{t.label}</p>
                      <p className="text-xs text-gray-400">{new Date(tx.date).toLocaleDateString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {tx.amount > 0 && <p className="text-xs text-gray-500">Rp {tx.amount.toLocaleString("id-ID")}</p>}
                      <p className="text-sm font-extrabold" style={{ color: t.color }}>+{tx.pointsEarned} pts</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ─── TIER INFO CARD ─── */}
      <div className="px-5 mt-5 mb-2">
        <div className="rounded-2xl p-5 text-white relative overflow-hidden" style={{ background: tier.bg }}>
          <div className="absolute -right-4 -top-4 text-7xl opacity-20">{tier.icon}</div>
          <p className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">Jenjang Keanggotaan</p>
          <h3 className="text-xl font-extrabold mb-1">{currentUser.tier.name}</h3>
          <p className="text-xs opacity-80">
            {currentUser.tier.level === 1 && "The Social Connector · Pandu & Srawung"}
            {currentUser.tier.level === 2 && "The Growth Champion · Agra & Satria"}
            {currentUser.tier.level === 3 && "The Ultimate Local Hero · Kamadeva Widya"}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <TrendingUp size={14} className="opacity-80" />
            <span className="text-xs opacity-80">Booster SHU <span className="font-extrabold text-white">{currentUser.tier.multiplier}×</span></span>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <BottomNav active="/dashboard" />
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
              <span className="text-[10px] font-bold" style={{ color: isActive ? "#1a5c2a" : "#9ca3af" }}>
                {item.label}
              </span>
              {isActive && <div className="w-1 h-1 rounded-full bg-green-600" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
