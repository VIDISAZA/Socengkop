"use client";

import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const { users, login, isLoadingUsers } = useAppContext();
  const router = useRouter();

  const handleLogin = (userId: number) => {
    login(userId);
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F5F5] p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center mb-8">
          <div className="inline-block bg-[#1B5E20]/10 p-4 rounded-2xl mb-4">
            <span className="text-4xl">🌾</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#1B5E20] mb-2">SocengKOP</h1>
          <p className="text-gray-500">Platform Koperasi Modern &amp; Gamifikasi</p>
          <div className="mt-2 inline-block bg-[#FFC107]/20 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full">
            🏆 Hackathon Koperasi Merah Putih 2026
          </div>
        </div>

        {isLoadingUsers ? (
          <div className="flex flex-col items-center justify-center py-10 gap-3 text-gray-500">
            <Loader2 size={32} className="animate-spin text-[#1B5E20]" />
            <p className="text-sm">Memuat data anggota...</p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-center text-sm font-semibold text-gray-500 mb-4">Pilih akun untuk masuk</p>
            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => handleLogin(user.id)}
                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-[#1B5E20] hover:bg-[#1B5E20]/5 transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#1B5E20]/10 rounded-full flex items-center justify-center text-[#1B5E20] font-bold text-lg">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 group-hover:text-[#1B5E20]">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.rt} • {user.points.toLocaleString("id-ID")} Poin</p>
                  </div>
                </div>
                <div className={`font-semibold text-xs px-2 py-1 rounded-full ${user.tier.level === 3 ? 'bg-red-100 text-red-600' : user.tier.level === 2 ? 'bg-[#FFC107]/20 text-yellow-700' : 'bg-green-100 text-[#1B5E20]'}`}>
                  {user.tier.name}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
