"use client";

import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Target } from "lucide-react";

export default function MisiPage() {
  const { currentUser, missions, completeMission } = useAppContext();
  const router = useRouter();
  const [success, setSuccess] = useState<number | null>(null);

  useEffect(() => {
    if (!currentUser) router.push("/login");
  }, [currentUser, router]);

  if (!currentUser) return null;

  const handleComplete = (id: number, reward: number) => {
    completeMission(id);
    setSuccess(reward);
    setTimeout(() => setSuccess(null), 3000);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <div className="bg-white p-4 flex items-center gap-4 sticky top-0 z-10 shadow-sm">
        <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-full transition">
          <ArrowLeft size={20} className="text-gray-700" />
        </Link>
        <h1 className="font-bold text-gray-800 flex-1">Misi Harian</h1>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800">Selesaikan & Kumpulkan Poin!</h2>
          <p className="text-sm text-gray-500">Misi diperbarui setiap hari. Semakin aktif, semakin banyak poin.</p>
        </div>

        <div className="space-y-4">
          {missions.length === 0 || missions.every(m => !m.isActive) ? (
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-100">
              <div className="inline-block bg-green-50 p-4 rounded-full text-green-500 mb-4">
                <CheckCircle size={32} />
              </div>
              <h3 className="font-bold text-gray-800 mb-1">Hebat!</h3>
              <p className="text-sm text-gray-500">Semua misi hari ini sudah diselesaikan.</p>
            </div>
          ) : (
            missions.map(mission => (
              <div key={mission.id} className={`bg-white rounded-2xl p-5 border transition-all ${mission.isActive ? 'border-gray-100 shadow-sm' : 'border-gray-100 opacity-50 bg-gray-50'}`}>
                <div className="flex gap-4">
                  <div className={`mt-1 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${mission.isActive ? 'bg-[#FFC107]/20 text-[#FFC107]' : 'bg-green-100 text-green-600'}`}>
                    {mission.isActive ? <Target size={20} /> : <CheckCircle size={20} />}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold ${mission.isActive ? 'text-gray-800' : 'text-gray-500 line-through'}`}>{mission.title}</h3>
                    <p className="text-xs text-gray-500 mt-1 mb-3">{mission.description}</p>
                    
                    {mission.isActive ? (
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#1B5E20]">+{mission.reward} Poin</span>
                        <button
                          onClick={() => handleComplete(mission.id, mission.reward)}
                          className="bg-[#1B5E20] hover:bg-[#1B5E20]/90 text-white text-xs font-bold py-2 px-4 rounded-lg transition active:scale-95"
                        >
                          Selesaikan
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-xs font-bold text-green-600">
                        Selesai <CheckCircle size={12} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
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
              <p className="font-bold text-gray-800">Misi Selesai!</p>
              <p className="text-sm font-bold text-[#1B5E20]">+{success} Poin partisipasi</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
