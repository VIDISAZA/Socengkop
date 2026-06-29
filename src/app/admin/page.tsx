"use client";

import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, BarChart3, TrendingUp, Users, RefreshCw, Layers, ShieldCheck, HelpCircle } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

type SupplyItem = {
  id: number;
  productName: string;
  producer: string;
  quantity: string;
  status: "petani" | "koperasi" | "pasar";
  lastUpdate: string;
  steps: { stage: string; label: string; date: string; completed: boolean }[];
};

type FinancialData = {
  incoming: number;
  outgoing: number;
  profit: number;
  shuAllocated: number;
  transactionCount: number;
  history: { id: number; userId: number; amount: number; pointsEarned: number; date: string; type?: string; note?: string }[];
};

type ParticipationData = {
  totalMembers: number;
  activeMembers: number;
  missionsCompleted: number;
  leaderboard: { rt: string; totalPoints: number }[];
};

export default function AdminPage() {
  const { currentUser } = useAppContext();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"supply" | "financials" | "participation" | "expiry">("supply");
  const [supplyChain, setSupplyChain] = useState<SupplyItem[]>([]);
  const [financials, setFinancials] = useState<FinancialData | null>(null);
  const [participation, setParticipation] = useState<ParticipationData | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulation states
  const [simulating, setSimulating] = useState(false);
  const [simAmount, setSimAmount] = useState("100000");
  const [simNote, setSimNote] = useState("Belanja Grosir Sembako");
  const [simUser, setSimUser] = useState("1");
  const [simMission, setSimMission] = useState("1");

  useEffect(() => {
    if (!currentUser) router.push("/login");
  }, [currentUser, router]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [supplyRes, finRes, partRes] = await Promise.all([
        fetch(`${API_URL}/admin/supply-chain`),
        fetch(`${API_URL}/admin/financials`),
        fetch(`${API_URL}/admin/participation`)
      ]);
      const supplyData = await supplyRes.json();
      const finData = await finRes.json();
      const partData = await partRes.json();

      if (supplyData.success) setSupplyChain(supplyData.data);
      if (finData.success) setFinancials(finData.data);
      if (partData.success) setParticipation(partData.data);
    } catch (err) {
      console.error("Gagal memuat data admin", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Simulator: Supply Chain
  const handleSimulateSupply = async (id: number) => {
    setSimulating(true);
    try {
      const res = await fetch(`${API_URL}/admin/simulate/supply-chain`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (data.success) {
        setSupplyChain(data.data);
      }
    } catch (err) {
      alert("Gagal melakukan simulasi rantai pasok");
    } finally {
      setSimulating(false);
    }
  };

  // Simulator: Financials
  const handleSimulateFinancial = async (e: React.FormEvent) => {
    e.preventDefault();
    setSimulating(true);
    try {
      const res = await fetch(`${API_URL}/admin/simulate/financial`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: simAmount, note: simNote, type: "shopping" })
      });
      const data = await res.json();
      if (data.success) {
        alert(data.message);
        fetchData();
      }
    } catch (err) {
      alert("Gagal melakukan simulasi finansial");
    } finally {
      setSimulating(false);
    }
  };

  // Simulator: Participation
  const handleSimulateParticipation = async (e: React.FormEvent) => {
    e.preventDefault();
    setSimulating(true);
    try {
      const res = await fetch(`${API_URL}/admin/simulate/participation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: simUser, missionId: simMission })
      });
      const data = await res.json();
      if (data.success) {
        alert(data.message);
        fetchData();
      }
    } catch (err) {
      alert("Gagal melakukan simulasi partisipasi");
    } finally {
      setSimulating(false);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="page-container pb-28">
      {/* Header */}
      <div className="bg-white p-4 flex items-center gap-4 sticky top-0 z-10 border-b border-gray-100">
        <Link href="/login" className="p-2 hover:bg-gray-100 rounded-xl transition">
          <ArrowLeft size={20} className="text-gray-700" />
        </Link>
        <h1 className="font-extrabold text-lg text-[#3a3a3a] flex-1">Dashboard Admin</h1>
        <button onClick={fetchData} className="p-2 hover:bg-gray-100 rounded-xl text-indigo-700 transition">
          <RefreshCw size={18} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex px-5 mt-4 overflow-x-auto gap-2 scrollbar-none">
        <button
          onClick={() => setActiveTab("supply")}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all border ${
            activeTab === "supply" ? "bg-indigo-700 text-white border-indigo-700" : "bg-white text-gray-600 border-gray-100"
          }`}
        >
          📦 Alur Barang
        </button>
        <button
          onClick={() => setActiveTab("financials")}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all border ${
            activeTab === "financials" ? "bg-indigo-700 text-white border-indigo-700" : "bg-white text-gray-600 border-gray-100"
          }`}
        >
          💰 Alur Keuangan
        </button>
        <button
          onClick={() => setActiveTab("participation")}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all border ${
            activeTab === "participation" ? "bg-indigo-700 text-white border-indigo-700" : "bg-white text-gray-600 border-gray-100"
          }`}
        >
          ⚡ Alur Partisipasi
        </button>
        <button
          onClick={() => setActiveTab("expiry")}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all border ${
            activeTab === "expiry" ? "bg-indigo-700 text-white border-indigo-700" : "bg-white text-gray-600 border-gray-100"
          }`}
        >
          ⚠️ Aturan Expiry
        </button>
      </div>

      <div className="p-5">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-10 h-10 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" style={{ borderWidth: 3 }} />
            <p className="text-xs text-gray-500">Memuat analisis koperasi...</p>
          </div>
        ) : (
          <div>
            {/* ─── TAB 1: ALUR BARANG ─── */}
            {activeTab === "supply" && (
              <div className="space-y-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-extrabold text-[#3a3a3a]">Alur Rantai Pasok Desa 🌾</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Simulasikan perjalanan barang dari Petani → Koperasi → Pasar.</p>
                  </div>
                </div>

                {supplyChain.map((item) => (
                  <div key={item.id} className="kop-card p-5 border-gray-100 bg-white">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-extrabold text-[#3a3a3a] text-sm">{item.productName}</h3>
                        <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Produsen: {item.producer} · Jumlah: {item.quantity}</p>
                      </div>
                      <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        item.status === "pasar" ? "bg-blue-100 text-blue-700" : item.status === "koperasi" ? "bg-yellow-100 text-yellow-700" : "bg-indigo-100 text-indigo-700"
                      }`}>
                        Status: {item.status}
                      </span>
                    </div>

                    {/* Progress tracker */}
                    <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100 mb-4">
                      {item.steps.map((step, idx) => (
                        <div key={idx} className="relative">
                          <div className={`absolute -left-6 top-1 w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 text-[8px] font-black ${
                            step.completed ? "bg-indigo-600 border-indigo-600 text-white" : "bg-white border-gray-300 text-gray-400"
                          }`}>
                            {step.completed ? "✓" : idx + 1}
                          </div>
                          <div>
                            <p className={`text-xs font-bold ${step.completed ? "text-[#3a3a3a]" : "text-gray-400"}`}>{step.stage}</p>
                            <p className="text-[10px] text-gray-500 mt-0.5">{step.label}</p>
                            {step.completed && <p className="text-[9px] text-gray-400 mt-0.5">Diperbarui: {new Date(step.date).toLocaleString("id-ID")}</p>}
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => handleSimulateSupply(item.id)}
                      disabled={simulating}
                      className="w-full py-2 bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold rounded-xl transition"
                    >
                      {item.status === "pasar" ? "🔄 Reset Siklus Rantai Pasok" : "➡️ Simulasikan Tahap Selanjutnya"}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* ─── TAB 2: ALUR KEUANGAN ─── */}
            {activeTab === "financials" && financials && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-extrabold text-[#3a3a3a]">Arus Kas & Bagi Hasil 💰</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Pantau transparansi sirkulasi keuangan masuk, keluar, dan alokasi dana SHU.</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="kop-card p-4 text-center bg-indigo-50 border-indigo-100">
                    <p className="text-[10px] text-indigo-800 font-bold uppercase tracking-wider mb-1">Pemasukan Total</p>
                    <p className="text-lg font-black text-indigo-900">Rp {financials.incoming.toLocaleString("id-ID")}</p>
                  </div>
                  <div className="kop-card p-4 text-center bg-red-50 border-red-100">
                    <p className="text-[10px] text-red-800 font-bold uppercase tracking-wider mb-1">Pengeluaran HPP</p>
                    <p className="text-lg font-black text-red-900">Rp {financials.outgoing.toLocaleString("id-ID")}</p>
                  </div>
                </div>

                {/* Simulator Form */}
                <div className="kop-card p-5 border-blue-100 bg-blue-50/20">
                  <h3 className="font-extrabold text-xs text-blue-900 uppercase tracking-wider mb-3">🛠️ Simulator Arus Kas Keuangan</h3>
                  <form onSubmit={handleSimulateFinancial} className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Nominal Transaksi (Rp)</label>
                      <input
                        type="number"
                        value={simAmount}
                        onChange={(e) => setSimAmount(e.target.value)}
                        className="w-full p-2 text-xs border border-gray-200 rounded-lg bg-white"
                        placeholder="Masukkan nominal"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Keterangan / Item</label>
                      <input
                        type="text"
                        value={simNote}
                        onChange={(e) => setSimNote(e.target.value)}
                        className="w-full p-2 text-xs border border-gray-200 rounded-lg bg-white"
                        placeholder="Nama transaksi"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={simulating}
                      className="w-full py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg transition"
                    >
                      Tambah Simulasi Transaksi Belanja
                    </button>
                  </form>
                </div>

                <div className="kop-card p-5">
                  <h3 className="font-extrabold text-sm text-[#3a3a3a] mb-4 flex items-center gap-2">
                    <TrendingUp size={16} className="text-indigo-700" />
                    Ikhtisar Bagi Hasil SHU
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500">Laba Bersih Koperasi:</span>
                      <span className="font-bold text-[#3a3a3a]">Rp {financials.profit.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500">Alokasi SHU Anggota (40%):</span>
                      <span className="font-extrabold text-indigo-700">Rp {financials.shuAllocated.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs border-t border-gray-100 pt-3">
                      <span className="text-gray-500">Volume Transaksi:</span>
                      <span className="font-bold text-[#3a3a3a]">{financials.transactionCount} kali belanja</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-[#3a3a3a] text-xs uppercase tracking-wider">Histori Seluruh Transaksi</h3>
                  <div className="kop-card divide-y divide-gray-50 max-h-60 overflow-y-auto">
                    {financials.history.map((tx) => (
                      <div key={tx.id} className="p-3 flex justify-between items-center text-xs">
                        <div>
                          <p className="font-bold text-[#3a3a3a]">{tx.note || (tx.type === "shopping" ? "Belanja Koperasi" : tx.type)}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{new Date(tx.date).toLocaleDateString("id-ID")}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-[#3a3a3a]">Rp {tx.amount.toLocaleString("id-ID")}</p>
                          <p className="text-[10px] text-indigo-700 font-bold">+{tx.pointsEarned} pts</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ─── TAB 3: ALUR PARTISIPASI ─── */}
            {activeTab === "participation" && participation && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-extrabold text-[#3a3a3a]">Keaktifan Komunitas ⚡</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Analisis keterlibatan warga desa dalam program gotong royong dan misi.</p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="kop-card p-3 text-center">
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Total Anggota</p>
                    <p className="text-xl font-black text-[#3a3a3a]">{participation.totalMembers}</p>
                  </div>
                  <div className="kop-card p-3 text-center">
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Aktif Belanja</p>
                    <p className="text-xl font-black text-indigo-700">{participation.activeMembers}</p>
                  </div>
                  <div className="kop-card p-3 text-center">
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Misi Selesai</p>
                    <p className="text-xl font-black text-blue-700">{participation.missionsCompleted}</p>
                  </div>
                </div>

                {/* Simulator Form */}
                <div className="kop-card p-5 border-blue-100 bg-blue-50/20">
                  <h3 className="font-extrabold text-xs text-blue-900 uppercase tracking-wider mb-3">🛠️ Simulator Partisipasi Anggota</h3>
                  <form onSubmit={handleSimulateParticipation} className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Pilih Anggota</label>
                      <select
                        value={simUser}
                        onChange={(e) => setSimUser(e.target.value)}
                        className="w-full p-2 text-xs border border-gray-200 rounded-lg bg-white"
                      >
                        <option value="1">Siti Rahayu (RT 01)</option>
                        <option value="2">Ahmad Junaedi (RT 02)</option>
                        <option value="3">Budi Santoso (RT 01)</option>
                        <option value="5">Rina Marlina (RT 03)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Klaim / Rampungkan Misi</label>
                      <select
                        value={simMission}
                        onChange={(e) => setSimMission(e.target.value)}
                        className="w-full p-2 text-xs border border-gray-200 rounded-lg bg-white"
                      >
                        <option value="1">Belanja Sembako Koperasi (+50 Poin)</option>
                        <option value="2">Ajak Tetangga Gotong Royong (+100 Poin)</option>
                        <option value="3">Bagikan Produk Desa ke WA (+30 Poin)</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      disabled={simulating}
                      className="w-full py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg transition"
                    >
                      Kirim Simulasi Aksi Anggota
                    </button>
                  </form>
                </div>

                <div className="kop-card p-5">
                  <h3 className="font-extrabold text-sm text-[#3a3a3a] mb-3 flex items-center gap-2">
                    <BarChart3 size={16} className="text-indigo-700" />
                    Poin Komulatif per RT
                  </h3>
                  <div className="space-y-3">
                    {participation.leaderboard.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-gray-700">{idx+1}. {item.rt}</span>
                        <span className="font-bold text-[#3a3a3a]">{item.totalPoints.toLocaleString("id-ID")} pts</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ─── TAB 4: ATURAN EXPIRY ─── */}
            {activeTab === "expiry" && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-extrabold text-[#3a3a3a]">Kebijakan Keaktifan & Expiry ⚠️</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Sistem mitigasi poin mati untuk memicu retensi belanja harian anggota.</p>
                </div>

                <div className="kop-card p-5 border-yellow-100 bg-yellow-50/50">
                  <div className="flex gap-3">
                    <ShieldCheck className="text-yellow-600 flex-shrink-0" size={20} />
                    <div>
                      <h4 className="font-bold text-[#3a3a3a] text-sm">Prinsip Retensi Anggota</h4>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                        Jika seorang anggota **tidak melakukan transaksi dalam 30 hari berturut-turut**, maka seluruh akumulasi Poin Partisipasi akan otomatis hangus (reset ke 0). Hal ini mendorong warga agar aktif berpartisipasi dan tidak menumpuk poin secara pasif.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="kop-card p-5">
                  <h3 className="font-bold text-[#3a3a3a] text-xs uppercase tracking-wider mb-4">Simulasi & Trigger Status</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <span>Status Sistem:</span>
                      <span className="font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">Aktif</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span>Batas Hari Inaktif:</span>
                      <span className="font-bold text-[#3a3a3a]">30 Hari</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span>Metode Pengecekan:</span>
                      <span className="font-medium text-gray-600">Otomatis saat login / transaksi</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
