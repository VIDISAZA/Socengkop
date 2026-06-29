const transactions = [
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
  { id: 15, userId: 5, amount: 0, pointsEarned: 50, date: "2026-06-28T14:00:00", items: [], type: "mission", note: "Menyelesaikan misi: Belanja Sembako" }
];
module.exports = transactions;