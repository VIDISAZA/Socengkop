"use client";

import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, User, Copy, Check, Gift, Shield, HelpCircle, Star, LogOut, ChevronRight } from "lucide-react";

type SHUData = {
  year: number;
  totalSHU: number;
  distribution: {
    members: number;
    cadangan: number;
    pengurus: number;
    sosial: number;
    pendidikan: number;
  };
  weight: number;
  shuAmount: number;
  rank: number;
};

const TIER_INFO = [
  {
    level: 1,
    name: "Pandu Srawung",
    philosophy: "Pandu (Perintis/Penunjuk) & Srawung (Seni membaur/bersosialisasi)",
    badge: "🌱",
    multiplier: "1.0×",
    bg: "linear-gradient(135deg,#e8f5e9,#c8e6c9)",
    color: "#2e7d32",
    perks: ["Akses dasar koperasi", "Poin standar 1.0×", "Misi harian"],
  },
  {
    level: 2,
    name: "Agra Satria",
    philosophy: "Agra (Puncak tertinggi) & Satria (Ksatria pembela kemakmuran warga)",
    badge: "⚔️",
    multiplier: "1.4×",
    bg: "linear-gradient(135deg,#fff8e1,#ffecb3)",
    color: "#f57f17",
    perks: ["Booster poin 1.4×", "Akses promo khusus", "Prioritas pelayanan", "Misi khusus"],
  },
  {
    level: 3,
    name: "Kamadeva Widya",
    philosophy: "Kamadeva (Simbol cinta/keharmonisan komunal) & Widya (Kebijaksanaan)",
    badge: "👑",
    multiplier: "2.0×",
    bg: "linear-gradient(135deg,#ffebee,#ffcdd2)",
    color: "#c62828",
    perks: ["Super booster 2.0×", "Hak prioritas Rapat Pusat", "Penghargaan tahunan", "Mentor anggota baru"],
  },
];

export default function ProfilePage() {
  const { currentUser, logout } = useAppContext();
  const router = useRouter();

  const [copied, setCopied] = useState(false);
  const [shuData, setShuData] = useState<SHUData | null>(null);
  const [loadingSHU, setLoadingSHU] = useState(true);

  useEffect(() => {
    if (!currentUser) router.push("/login");
  }, [currentUser, router]);

  useEffect(() => {
    if (!currentUser) return;

    const fetchSHU = async () => {
      try {
        const apiUrl = "/api";
        const res = await fetch(`${apiUrl}/shu/user?userId=${currentUser.id}`);
        const data = await res.json();
        if (data.success) {
          setShuData(data.data.shu);
        }
      } catch (err) {
        console.warn("Gagal mengambil data SHU, menggunakan simulasi lokal.");
        // Fallback local simulation based on user id
        const simulatedSHU: Record<number, SHUData> = {
          1: { year: 2025, totalSHU: 125000000, distribution: { members: 60, cadangan: 20, pengurus: 10, sosial: 5, pendidikan: 5 }, weight: 0.05, shuAmount: 3750000, rank: 5 },
          2: { year: 2025, totalSHU: 125000000, distribution: { members: 60, cadangan: 20, pengurus: 10, sosial: 5, pendidikan: 5 }, weight: 0.10, shuAmount: 7500000, rank: 3 },
          3: { year: 2025, totalSHU: 125000000, distribution: { members: 60, cadangan: 20, pengurus: 10, sosial: 5, pendidikan: 5 }, weight: 0.07, shuAmount: 5250000, rank: 4 },
          4: { year: 2025, totalSHU: 125000000, distribution: { members: 60, cadangan: 20, pengurus: 10, sosial: 5, pendidikan: 5 }, weight: 0.15, shuAmount: 11250000, rank: 1 },
          5: { year: 2025, totalSHU: 125000000, distribution: { members: 60, cadangan: 20, pengurus: 10, sosial: 5, pendidikan: 5 }, weight: 0.12, shuAmount: 9000000, rank: 2 },
        };
        setShuData(simulatedSHU[currentUser.id] || simulatedSHU[1]);
      } finally {
        setLoadingSHU(false);
      }
    };
    fetchSHU();
  }, [currentUser]);

  if (!currentUser) return null;

  const handleCopy = () => {
    // Mock referral code
    const code = `KOP-${currentUser.name.split(" ").map(n => n.charAt(0)).join("").toUpperCase()}${currentUser.id.toString().padStart(3, "0")}`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getReferralCode = () => {
    return `KOP-${currentUser.name.split(" ").map(n => n.charAt(0)).join("").toUpperCase()}${currentUser.id.toString().padStart(3, "0")}`;
  };

  return (
    <div className="page-container pb-28">
      {/* Header */}
      <div className="bg-white p-4 flex items-center gap-4 sticky top-0 z-10 border-b border-gray-100">
        <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-xl transition">
          <ArrowLeft size={20} className="text-gray-700" />
        </Link>
        <h1 className="font-extrabold text-lg text-[#3a3a3a] flex-1">Profil Anggota</h1>
        <button
          onClick={() => {
            logout();
            router.push("/login");
          }}
          className="p-2 hover:bg-red-50 text-red-600 rounded-xl transition"
        >
          <LogOut size={18} />
        </button>
      </div>

      <div className="p-5 space-y-6">
        {/* User Card info */}
        <div className="kop-card p-5 flex gap-4 items-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-700 text-white font-black text-2xl flex items-center justify-center">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-extrabold text-[#3a3a3a] text-base">{currentUser.name}</h3>
            <p className="text-xs text-gray-400 font-medium">Bergabung sejak: 2025</p>
            <span className="text-[10px] font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full inline-block mt-2">
              {currentUser.rt} · {currentUser.tierName}
            </span>
          </div>
        </div>

        {/* ─── REFERRAL CARD ─── */}
        <div className="kop-card p-5" style={{ background: "linear-gradient(135deg, #1a1464 0%, #463cd8 100%)", color: "white" }}>
          <div className="flex items-center gap-2 mb-3">
            <Gift size={18} className="text-yellow-400 animate-float" />
            <h4 className="font-bold text-sm text-white">Kode Referral Gotong Royong</h4>
          </div>
          <p className="text-[11px] text-indigo-200 mb-4 leading-relaxed">
            Undang tetangga terdekat Anda untuk bergabung. Dapatkan poin keaktifan instan segera setelah profil mereka terverifikasi!
          </p>

          <div className="bg-white/10 rounded-xl p-3 flex items-center justify-between border border-white/15">
            <code className="font-mono font-bold text-sm tracking-wider">{getReferralCode()}</code>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs font-bold bg-white text-indigo-800 px-3.5 py-2 rounded-lg hover:bg-gray-100 transition active:scale-95"
            >
              {copied ? (
                <>
                  <Check size={14} /> Copied
                </>
              ) : (
                <>
                  <Copy size={14} /> Salin
                </>
              )}
            </button>
          </div>
        </div>

        {/* ─── SHU ESTIMATOR ─── */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-indigo-700" />
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Simulasi Sisa Hasil Usaha (SHU)</h3>
          </div>

          <div className="kop-card p-5">
            {loadingSHU ? (
              <div className="flex flex-col items-center justify-center py-10 gap-2">
                <div className="w-8 h-8 border-3 border-indigo-200 border-t-indigo-600 rounded-full" style={{ borderWidth: 3, animation: "spin-slow 0.8s linear infinite" }} />
                <p className="text-xs text-gray-400">Menghitung SHU...</p>
              </div>
            ) : shuData ? (
              <div>
                <div className="flex justify-between items-start mb-4 border-b border-gray-100 pb-3">
                  <div>
                    <h4 className="font-extrabold text-[#3a3a3a] text-sm">Estimasi SHU Anggota {shuData.year}</h4>
                    <p className="text-[10px] text-gray-400 font-medium">Berdasarkan kontribusi poin partisipasi aktif</p>
                  </div>
                  <span className="text-[10px] font-black text-white bg-yellow-500 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Peringkat #{shuData.rank}
                  </span>
                </div>

                <div className="text-center py-4 bg-gray-50 rounded-2xl border border-gray-100 mb-4">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Estimasi Payout Bonus Anda</p>
                  <p className="text-3xl font-black text-indigo-700">Rp {shuData.shuAmount.toLocaleString("id-ID")}</p>
                  <p className="text-[10px] text-gray-400 font-semibold mt-1">Bobot Share: {(shuData.weight * 100).toFixed(1)}%</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Total SHU Koperasi Desa:</span>
                    <span className="font-bold text-[#3a3a3a]">Rp {shuData.totalSHU.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Alokasi Bagian Anggota ({shuData.distribution.members}%):</span>
                    <span className="font-bold text-[#3a3a3a]">Rp {((shuData.totalSHU * shuData.distribution.members) / 100).toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Formula SHU:</span>
                    <span className="font-mono text-[9px] bg-gray-100 px-1 py-0.5 rounded text-gray-700">
                      (Poin User / Total Poin Anggota) × SHU Alokasi
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-red-500">Gagal menghitung SHU.</p>
            )}
          </div>
        </div>

        {/* ─── LEAGUE TIER GUIDE ─── */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Star size={16} className="text-indigo-700" />
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Liga Pahlawan Lokal (Vernacular League)</h3>
          </div>

          <div className="space-y-3">
            {TIER_INFO.map((tier) => {
              const isCurrent = currentUser.tier.level === tier.level;
              return (
                <div
                  key={tier.level}
                  className="kop-card p-5 relative overflow-hidden"
                  style={{
                    background: isCurrent ? tier.bg : "white",
                    border: isCurrent ? `1px solid ${tier.color}30` : "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <div className="absolute right-4 top-4 text-4xl opacity-15">{tier.badge}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{tier.badge}</span>
                    <h4 className="font-extrabold text-[#3a3a3a] text-sm">{tier.name}</h4>
                    {isCurrent && (
                      <span className="text-[9px] font-black text-white bg-indigo-700 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Aktif
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-400 leading-relaxed font-semibold italic mb-3">
                    {tier.philosophy}
                  </p>
                  
                  {/* Perks list */}
                  <div className="space-y-1.5">
                    {tier.perks.map((perk, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-gray-400" style={{ background: tier.color }} />
                        <span className="text-xs text-gray-600 font-medium">{perk}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Bobot Pengali</span>
                    <span className="text-sm font-extrabold" style={{ color: tier.color }}>{tier.multiplier}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <BottomNav active="/profile" />
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
