// Shared in-memory data store for Next.js API routes
// Replaces the Express backend — runs entirely on Vercel (free)

// ─── USERS ───────────────────────────────────────────────────────
export const users = [
  { id: 1, name: "Siti Rahayu", phone: "081234567890", rt: "RT 01", rw: "RW 03", points: 1250, tier: { level: 1, name: "Pandu Srawung", multiplier: 1.0 }, tierName: "Pandu Srawung", multiplier: 1.0, joinDate: "2025-01-15", totalTransactions: 12, totalSpent: 1250000, referralCode: "KOP-SR001", referredBy: null, avatar: null, isActive: true, missionsCompleted: 5 },
  { id: 2, name: "Ahmad Junaedi", phone: "081234567891", rt: "RT 02", rw: "RW 02", points: 2800, tier: { level: 2, name: "Agra Satria", multiplier: 1.4 }, tierName: "Agra Satria", multiplier: 1.4, joinDate: "2024-11-01", totalTransactions: 28, totalSpent: 2800000, referralCode: "KOP-AJ002", referredBy: null, avatar: null, isActive: true, missionsCompleted: 15 },
  { id: 3, name: "Budi Santoso", phone: "081234567892", rt: "RT 01", rw: "RW 03", points: 1890, tier: { level: 1, name: "Pandu Srawung", multiplier: 1.0 }, tierName: "Pandu Srawung", multiplier: 1.0, joinDate: "2025-02-20", totalTransactions: 18, totalSpent: 1890000, referralCode: "KOP-BS003", referredBy: 1, avatar: null, isActive: true, missionsCompleted: 8 },
  { id: 4, name: "Dewi Lestari", phone: "081234567893", rt: "RT 03", rw: "RW 01", points: 4200, tier: { level: 3, name: "Kamadeva Widya", multiplier: 2.0 }, tierName: "Kamadeva Widya", multiplier: 2.0, joinDate: "2024-08-10", totalTransactions: 42, totalSpent: 4200000, referralCode: "KOP-DL004", referredBy: null, avatar: null, isActive: true, missionsCompleted: 25 },
  { id: 5, name: "Rina Marlina", phone: "081234567894", rt: "RT 03", rw: "RW 01", points: 3250, tier: { level: 2, name: "Agra Satria", multiplier: 1.4 }, tierName: "Agra Satria", multiplier: 1.4, joinDate: "2024-09-25", totalTransactions: 32, totalSpent: 3250000, referralCode: "KOP-RM005", referredBy: 4, avatar: null, isActive: true, missionsCompleted: 18 },
];

// ─── TRANSACTIONS ─────────────────────────────────────────────────
export const transactions = [
  { id: 1, userId: 1, amount: 50000, pointsEarned: 50, date: "2026-06-28T10:30:00", items: ["Beras 5kg", "Minyak Goreng 1L"], type: "shopping" },
  { id: 2, userId: 1, amount: 75000, pointsEarned: 75, date: "2026-06-27T14:15:00", items: ["Gula 2kg", "Telur 1kg"], type: "shopping" },
  { id: 6, userId: 1, amount: 30000, pointsEarned: 30, date: "2026-06-25T09:00:00", items: ["Sabun", "Sampo"], type: "shopping" },
  { id: 11, userId: 1, amount: 0, pointsEarned: 100, date: "2026-06-20T08:00:00", items: [], type: "referral", note: "Mengajak Budi Santoso bergabung" },
  { id: 3, userId: 2, amount: 100000, pointsEarned: 140, date: "2026-06-28T09:00:00", items: ["Beras 10kg", "Minyak 2L", "Gula 1kg"], type: "shopping" },
  { id: 7, userId: 2, amount: 150000, pointsEarned: 210, date: "2026-06-26T16:30:00", items: ["Daging Ayam 2kg", "Telur 2kg"], type: "shopping" },
  { id: 12, userId: 2, amount: 50000, pointsEarned: 70, date: "2026-06-24T11:00:00", items: ["Bumbu Dapur", "Mie Instan"], type: "shopping" },
  { id: 4, userId: 3, amount: 45000, pointsEarned: 45, date: "2026-06-27T11:45:00", items: ["Beras 3kg", "Telur 1/2kg"], type: "shopping" },
  { id: 8, userId: 3, amount: 60000, pointsEarned: 60, date: "2026-06-25T13:20:00", items: ["Minyak 1L", "Gula 1kg"], type: "shopping" },
  { id: 13, userId: 3, amount: 30000, pointsEarned: 30, date: "2026-06-22T10:00:00", items: ["Sabun Cuci"], type: "shopping" },
  { id: 5, userId: 4, amount: 200000, pointsEarned: 400, date: "2026-06-28T07:30:00", items: ["Beras 20kg", "Minyak 4L", "Gula 5kg", "Telur 3kg"], type: "shopping" },
  { id: 9, userId: 4, amount: 120000, pointsEarned: 240, date: "2026-06-26T08:00:00", items: ["Daging Sapi 1kg", "Sayuran"], type: "shopping" },
  { id: 14, userId: 4, amount: 0, pointsEarned: 100, date: "2026-06-15T09:00:00", items: [], type: "referral", note: "Mengajak Rina Marlina bergabung" },
  { id: 16, userId: 4, amount: 0, pointsEarned: 30, date: "2026-06-28T12:00:00", items: [], type: "mission", note: "Menyelesaikan misi: Share ke WA" },
  { id: 10, userId: 5, amount: 85000, pointsEarned: 119, date: "2026-06-27T15:00:00", items: ["Beras 5kg", "Minyak 1L", "Gula 1kg"], type: "shopping" },
  { id: 15, userId: 5, amount: 0, pointsEarned: 50, date: "2026-06-28T14:00:00", items: [], type: "mission", note: "Menyelesaikan misi: Belanja Sembako" },
];

// ─── MISSIONS ────────────────────────────────────────────────────
export const missions = [
  { id: 1, title: "🛒 Belanja Sembako", description: "Belanja kebutuhan pokok minimal Rp50.000 di koperasi", reward: 50, category: "daily", isActive: true, target: 50000, unit: "rupiah" },
  { id: 2, title: "📢 Ajak Tetangga", description: "Ajak 1 tetangga untuk bergabung menjadi anggota koperasi (via referral code)", reward: 100, category: "social", isActive: true, target: 1, unit: "orang" },
  { id: 3, title: "🔗 Share ke WA", description: "Bagikan tautan produk unggulan ke WhatsApp atau media sosial", reward: 30, category: "digital", isActive: true, target: 1, unit: "kali" },
  { id: 4, title: "⭐ Rating Produk", description: "Beri rating dan review untuk produk yang sudah dibeli", reward: 25, category: "digital", isActive: true, target: 1, unit: "produk" },
  { id: 5, title: "📊 Hadiri RAT Digital", description: "Hadiri Rapat Anggota Tahunan (RAT) secara online dan berikan voting", reward: 150, category: "special", isActive: false, target: 1, unit: "kali" },
  { id: 6, title: "🔥 Streak Belanja 7 Hari", description: "Belanja di koperasi selama 7 hari berturut-turut", reward: 200, category: "daily", isActive: true, target: 7, unit: "hari" },
];

// ─── LEADERBOARD ─────────────────────────────────────────────────
export const leaderboard = [
  { rt: "RT 03", rw: "RW 01", totalPoints: 7450, memberCount: 2, rank: 1, icon: "🥇", change: "+1" },
  { rt: "RT 01", rw: "RW 03", totalPoints: 3140, memberCount: 2, rank: 2, icon: "🥈", change: "0" },
  { rt: "RT 02", rw: "RW 02", totalPoints: 2800, memberCount: 1, rank: 3, icon: "🥉", change: "-1" },
  { rt: "RT 04", rw: "RW 01", totalPoints: 1200, memberCount: 2, rank: 4, icon: "4️⃣", change: "0" },
  { rt: "RT 05", rw: "RW 04", totalPoints: 450, memberCount: 1, rank: 5, icon: "5️⃣", change: "0" },
];

// ─── PRODUCTS ────────────────────────────────────────────────────
export const products = [
  { id: 1, name: "Beras Organik Sumberejo", price: 14000, unit: "kg", stock: 500, description: "Beras organik dari pertanian warga Desa Sumberejo, bebas pestisida", category: "Pangan", producer: "Kelompok Tani Sumberejo", origin: "Desa Sumberejo, Sleman", certifications: ["Organik", "Lokal"], rating: 4.8, totalSold: 250 },
  { id: 2, name: "Gula Kelapa Murni", price: 25000, unit: "kg", stock: 200, description: "Gula kelapa asli produksi rumah tangga, tanpa pemanis buatan", category: "Pangan", producer: "Ibu-ibu PKK Sumberejo", origin: "Desa Sumberejo, Sleman", certifications: ["Halal", "Lokal"], rating: 4.9, totalSold: 180 },
  { id: 3, name: "Kerajinan Anyaman Bambu", price: 150000, unit: "buah", stock: 50, description: "Anyaman bambu khas Sleman, dibuat oleh perajin lokal", category: "Kerajinan", producer: "Perajin Anyaman Sleman", origin: "Desa Sumberejo, Sleman", certifications: ["Lokal", "Eco-friendly"], rating: 4.7, totalSold: 35 },
  { id: 4, name: "Kopi Arabika Merapi", price: 85000, unit: "250gr", stock: 100, description: "Kopi Arabika premium dari lereng Gunung Merapi, roasted medium", category: "Minuman", producer: "Petani Kopi Merapi", origin: "Desa Sumberejo, Sleman", certifications: ["Fair Trade", "Lokal"], rating: 4.9, totalSold: 75 },
  { id: 5, name: "Madu Hutan Murni", price: 120000, unit: "500ml", stock: 75, description: "Madu hutan murni dari kawasan pegunungan, tanpa tambahan gula", category: "Kesehatan", producer: "Peternak Lebah Sumberejo", origin: "Desa Sumberejo, Sleman", certifications: ["Organik", "Halal"], rating: 4.9, totalSold: 60 },
];

// ─── SUPPLY CHAIN ─────────────────────────────────────────────────
export const supplyChain = [
  { id: 1, productName: "Beras Organik Sumberejo", producer: "Kelompok Tani Sumberejo I", quantity: "500 kg", status: "koperasi", lastUpdate: "2026-06-29T10:00:00Z", steps: [{ stage: "Petani", label: "Panen & Pengeringan selesai oleh Kelompok Tani", date: "2026-06-27T08:00:00Z", completed: true }, { stage: "Koperasi", label: "Pengemasan & Quality Control di Koperasi Desa", date: "2026-06-29T10:00:00Z", completed: true }, { stage: "Pasar", label: "Distribusi ke Warung Anggota & Toko Koperasi", date: "-", completed: false }] },
  { id: 2, productName: "Gula Kelapa Murni", producer: "PKK Dusun Sendang", quantity: "150 kg", status: "pasar", lastUpdate: "2026-06-29T08:30:00Z", steps: [{ stage: "Petani", label: "Penyadapan nira oleh penderes kelapa", date: "2026-06-25T07:00:00Z", completed: true }, { stage: "Koperasi", label: "Pengolahan gula kelapa kristal selesai", date: "2026-06-26T14:00:00Z", completed: true }, { stage: "Pasar", label: "Tersedia & terjual di pasar digital/toko fisik", date: "2026-06-29T08:30:00Z", completed: true }] },
  { id: 3, productName: "Kopi Arabika Merapi", producer: "Koperasi Tani Merapi", quantity: "200 bungkus", status: "petani", lastUpdate: "2026-06-28T16:00:00Z", steps: [{ stage: "Petani", label: "Pemetikan buah merah (Roasting check)", date: "2026-06-28T16:00:00Z", completed: true }, { stage: "Koperasi", label: "Proses hulling & pemilahan green beans", date: "-", completed: false }, { stage: "Pasar", label: "Siap didistribusikan ke Kopi Shop lokal", date: "-", completed: false }] },
];

// ─── SHU ─────────────────────────────────────────────────────────
export const shu = {
  year: 2025,
  period: "Januari - Desember 2025",
  totalSHU: 125000000,
  distribution: { members: 60, cadangan: 20, pengurus: 10, sosial: 5, pendidikan: 5 },
  memberBonus: [
    { userId: 4, name: "Dewi Lestari", tier: 3, points: 4200, weight: 0.15, shuAmount: 11250000, rank: 1 },
    { userId: 5, name: "Rina Marlina", tier: 2, points: 3250, weight: 0.12, shuAmount: 9000000, rank: 2 },
    { userId: 2, name: "Ahmad Junaedi", tier: 2, points: 2800, weight: 0.10, shuAmount: 7500000, rank: 3 },
    { userId: 3, name: "Budi Santoso", tier: 1, points: 1890, weight: 0.07, shuAmount: 5250000, rank: 4 },
    { userId: 1, name: "Siti Rahayu", tier: 1, points: 1250, weight: 0.05, shuAmount: 3750000, rank: 5 },
  ],
  pointToSHU: { formula: "Bobot SHU = (Poin User / Total Poin Seluruh Anggota) × 60% × Total SHU", totalMemberPoints: 13390, totalSHUForMembers: 75000000 },
};

// ─── TIERS CONFIG ─────────────────────────────────────────────────
export const tiers = [
  { level: 1, name: "Pandu Srawung", minPoints: 0, maxPoints: 1999, multiplier: 1.0 },
  { level: 2, name: "Agra Satria", minPoints: 2000, maxPoints: 4999, multiplier: 1.4 },
  { level: 3, name: "Kamadeva Widya", minPoints: 5000, maxPoints: 999999, multiplier: 2.0 },
];

// ─── HELPERS ─────────────────────────────────────────────────────
export function findUserById(id: number) {
  return users.find(u => u.id === id) || null;
}

export function getUserTransactions(userId: number) {
  return transactions.filter(t => t.userId === userId);
}

export function calculatePoints(amount: number, multiplier: number) {
  return Math.floor((amount / 1000) * multiplier);
}

export function updateUserTier(user: typeof users[0]) {
  const newTier = tiers.find(t => user.points >= t.minPoints && user.points <= t.maxPoints);
  if (newTier && newTier.level !== user.tier.level) {
    const tierUp = newTier.level > user.tier.level;
    user.tier = { level: newTier.level, name: newTier.name, multiplier: newTier.multiplier };
    user.tierName = newTier.name;
    user.multiplier = newTier.multiplier;
    return { tierUp, newTier };
  }
  return { tierUp: false, newTier: null };
}
