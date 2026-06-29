# Sistem Design – SocengKOP MVP
**Hackathon Koperasi Merah Putih 2026**

---

## 1. Arsitektur Sistem (Sederhana)

Karena ini MVP untuk hackathon, arsitektur dibuat **sederhana namun scalable** untuk demo.
┌─────────────────────────────────────────────────────────┐
│ Frontend (React.js) │
│ - Tailwind CSS untuk styling │
│ - Context API untuk state management │
│ - Axios untuk HTTP request │
└─────────────────────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────┐
│ Backend (Node.js + Express) │
│ - REST API │
│ - In-memory data (untuk demo) │
│ - CORS enabled │
└─────────────────────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────┐
│ Data Layer (In-Memory) │
│ - Array of objects (users, transactions, missions) │
│ - Real-time update │
│ - Leaderboard aggregation │
└─────────────────────────────────────────────────────────┘

text

---

## 2. Komponen Sistem

| Komponen | Teknologi | Fungsi |
|----------|-----------|--------|
| **Frontend** | React.js + Tailwind | UI aplikasi, 5 halaman utama |
| **Backend API** | Node.js + Express | Endpoint REST untuk data |
| **Data Storage** | In-Memory Array | Simpan data sementara (mock) |
| **State Management** | React Context | Global state user & data |

---

## 3. Data Flow
User pilih akun di Login Page
↓

Context menyimpan user aktif
↓

Dashboard fetch data user (poin, tier, rt)
↓

User melakukan transaksi belanja
↓

Backend hitung poin = (nominal/1000) * multiplier
↓

Update total poin user
↓

Leaderboard otomatis re-agregasi
↓

UI update real-time

text

---

## 4. API Endpoints (MVP)

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/users` | Daftar semua user (untuk login) |
| GET | `/api/user/:id` | Detail user (poin, tier, rt) |
| POST | `/api/transaction` | Tambah transaksi belanja |
| POST | `/api/mission/:id/complete` | Selesaikan misi |
| GET | `/api/leaderboard/rt` | Ranking RT (5 besar) |
| GET | `/api/user/:id/transactions` | Riwayat transaksi |

---

## 5. Struktur Data (Mock)

### User
```javascript
{
  id: 1,
  name: "Siti Rahayu",
  rt: "RT 01",
  points: 1250,
  tier: 1, // 1=Pandu Srawung, 2=Agra Satria, 3=Kamadeva Widya
  multiplier: 1.0
}
Transaction
javascript
{
  id: 1,
  userId: 1,
  amount: 50000,
  pointsEarned: 50,
  date: "2026-06-29T10:00:00"
}
Mission
javascript
{
  id: 1,
  title: "🛒 Belanja Sembako",
  description: "Belanja minimal Rp50.000",
  reward: 50,
  isActive: true
}
Leaderboard RT
javascript
{
  rt: "RT 01",
  totalPoints: 5230,
  rank: 2
}
6. Perhitungan Poin & Tier
Formula Poin
text
poin = (nominal / 1000) * multiplier

Tier 1 (Pandu Srawung)  → multiplier = 1.0
Tier 2 (Agra Satria)    → multiplier = 1.4
Tier 3 (Kamadeva Widya) → multiplier = 2.0
Syarat Naik Tier
text
Tier 1 → Tier 2 : 2.000 poin
Tier 2 → Tier 3 : 5.000 poin
7. UI/UX Design
Warna
Primary: #1B5E20 (hijau tua)

Secondary: #FFC107 (emas)

Background: #F5F5F5

Halaman
Halaman	Deskripsi
Login	Pilih user dari daftar mock
Dashboard	Poin, tier, progress, misi, posisi RT
Belanja	Input nominal, hitung poin
Misi	Daftar misi dengan tombol selesaikan
Leaderboard	Ranking 5 besar RT
Profile	Detail user & referral code