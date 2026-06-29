import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const savings = await prisma.saving.aggregate({
    where: { userId: session.user.id },
    _sum: { amount: true },
  });

  const totalSavings = savings._sum.amount || 0;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Halo, {session.user.name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-600">Total Simpanan</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            Rp {totalSavings.toLocaleString("id-ID")}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-600">Total Pinjaman</h2>
          <p className="text-3xl font-bold text-red-600 mt-2">
            Rp 0
          </p>
        </div>
      </div>
    </div>
  );
}
