import os

files = {}

files["backend/package.json"] = """{
  "name": "socengkop-backend",
  "version": "1.0.0",
  "description": "Backend API untuk SocengKOP MVP - Hackathon Koperasi Merah Putih",
  "main": "src/app.js",
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "morgan": "^1.10.0",
    "helmet": "^7.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}"""

files["backend/.env"] = """PORT=5000
NODE_ENV=development"""

files["backend/src/data/tenant.js"] = """const tenant = {
  id: "kop-001",
  name: "Koperasi Desa Makmur Sejahtera",
  alias: "Kopdes Makmur",
  type: "KUD (Koperasi Unit Desa)",
  address: {
    village: "Desa Sumberejo",
    district: "Kecamatan Ngemplak",
    regency: "Kabupaten Sleman",
    province: "DI Yogyakarta",
    postalCode: "55584"
  },
  established: "2015-03-10",
  status: "Aktif",
  members: 150,
  totalAssets: 350000000,
  logo: "/images/kopdes-makmur.png",
  contact: {
    phone: "0274-123456",
    email: "kopdesmakmur@gmail.com"
  }
};
module.exports = tenant;"""

files["backend/src/data/users.js"] = """const users = [
  { id: 1, name: "Siti Rahayu", phone: "081234567890", rt: "RT 01", rw: "RW 03", points: 1250, tier: 1, tierName: "Pandu Srawung", multiplier: 1.0, joinDate: "2025-01-15", totalTransactions: 12, totalSpent: 1250000, referralCode: "KOP-SR001", referredBy: null, avatar: "/avatars/siti.jpg", isActive: true, missionsCompleted: 5 },
  { id: 2, name: "Ahmad Junaedi", phone: "081234567891", rt: "RT 02", rw: "RW 02", points: 2800, tier: 2, tierName: "Agra Satria", multiplier: 1.4, joinDate: "2024-11-01", totalTransactions: 28, totalSpent: 2800000, referralCode: "KOP-AJ002", referredBy: null, avatar: "/avatars/ahmad.jpg", isActive: true, missionsCompleted: 15 },
  { id: 3, name: "Budi Santoso", phone: "081234567892", rt: "RT 01", rw: "RW 03", points: 1890, tier: 1, tierName: "Pandu Srawung", multiplier: 1.0, joinDate: "2025-02-20", totalTransactions: 18, totalSpent: 1890000, referralCode: "KOP-BS003", referredBy: 1, avatar: "/avatars/budi.jpg", isActive: true, missionsCompleted: 8 },
  { id: 4, name: "Dewi Lestari", phone: "081234567893", rt: "RT 03", rw: "RW 01", points: 4200, tier: 3, tierName: "Kamadeva Widya", multiplier: 2.0, joinDate: "2024-08-10", totalTransactions: 42, totalSpent: 4200000, referralCode: "KOP-DL004", referredBy: null, avatar: "/avatars/dewi.jpg", isActive: true, missionsCompleted: 25 },
  { id: 5, name: "Rina Marlina", phone: "081234567894", rt: "RT 03", rw: "RW 01", points: 3250, tier: 2, tierName: "Agra Satria", multiplier: 1.4, joinDate: "2024-09-25", totalTransactions: 32, totalSpent: 3250000, referralCode: "KOP-RM005", referredBy: 4, avatar: "/avatars/rina.jpg", isActive: true, missionsCompleted: 18 }
];
module.exports = users;"""

files["backend/src/data/transactions.js"] = """const transactions = [
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
module.exports = transactions;"""

files["backend/src/data/missions.js"] = """const missions = [
  { id: 1, title: "🛒 Belanja Sembako", description: "Belanja kebutuhan pokok minimal Rp50.000", reward: 50, icon: "shopping_bag", category: "daily", isActive: true, target: 50000, unit: "rupiah" },
  { id: 2, title: "📢 Ajak Tetangga", description: "Ajak 1 tetangga untuk bergabung", reward: 100, icon: "group_add", category: "social", isActive: true, target: 1, unit: "orang" },
  { id: 3, title: "🔗 Share ke WA", description: "Bagikan tautan produk unggulan", reward: 30, icon: "share", category: "digital", isActive: true, target: 1, unit: "kali" },
  { id: 4, title: "⭐ Rating Produk", description: "Beri rating dan review", reward: 25, icon: "star", category: "digital", isActive: true, target: 1, unit: "produk" },
  { id: 5, title: "📊 Hadiri RAT Digital", description: "Hadiri Rapat Anggota Tahunan (RAT)", reward: 150, icon: "event", category: "special", isActive: false, target: 1, unit: "kali" },
  { id: 6, title: "🔥 Streak Belanja 7 Hari", description: "Belanja di koperasi selama 7 hari berturut-turut", reward: 200, icon: "local_fire_department", category: "daily", isActive: true, target: 7, unit: "hari" }
];
module.exports = missions;"""

files["backend/src/data/leaderboard.js"] = """const leaderboardRT = [
  { rt: "RT 03", rw: "RW 01", totalPoints: 7450, memberCount: 2, members: [{ id: 4, name: "Dewi Lestari", points: 4200 }, { id: 5, name: "Rina Marlina", points: 3250 }], rank: 1, icon: "🥇", change: "+1" },
  { rt: "RT 01", rw: "RW 03", totalPoints: 3140, memberCount: 2, members: [{ id: 1, name: "Siti Rahayu", points: 1250 }, { id: 3, name: "Budi Santoso", points: 1890 }], rank: 2, icon: "🥈", change: "0" },
  { rt: "RT 02", rw: "RW 02", totalPoints: 2800, memberCount: 1, members: [{ id: 2, name: "Ahmad Junaedi", points: 2800 }], rank: 3, icon: "🥉", change: "-1" },
  { rt: "RT 04", rw: "RW 01", totalPoints: 1200, memberCount: 2, members: [{ id: 6, name: "Marni", points: 700 }, { id: 7, name: "Slamet", points: 500 }], rank: 4, icon: "4️⃣", change: "0" },
  { rt: "RT 05", rw: "RW 04", totalPoints: 450, memberCount: 1, members: [{ id: 8, name: "Poniran", points: 450 }], rank: 5, icon: "5️⃣", change: "0" }
];
module.exports = leaderboardRT;"""

files["backend/src/data/tiers.js"] = """const tiers = [
  { level: 1, name: "Pandu Srawung", shortName: "Pandu", minPoints: 0, maxPoints: 1999, multiplier: 1.0 },
  { level: 2, name: "Agra Satria", shortName: "Satria", minPoints: 2000, maxPoints: 4999, multiplier: 1.4 },
  { level: 3, name: "Kamadeva Widya", shortName: "Kamadeva", minPoints: 5000, maxPoints: Infinity, multiplier: 2.0 }
];
module.exports = tiers;"""

files["backend/src/data/products.js"] = "module.exports = [];"
files["backend/src/data/shu.js"] = "module.exports = {};"

files["backend/src/data/index.js"] = """const tenant = require('./tenant');
const users = require('./users');
const transactions = require('./transactions');
const missions = require('./missions');
const leaderboard = require('./leaderboard');
const tiers = require('./tiers');

module.exports = { tenant, users, transactions, missions, leaderboard, tiers };

module.exports.findUserById = (id) => users.find(u => u.id === id);
module.exports.getUserTransactions = (userId) => transactions.filter(t => t.userId === userId);
module.exports.getLeaderboard = () => [...leaderboard].sort((a, b) => b.totalPoints - a.totalPoints);
module.exports.getMissions = () => missions.filter(m => m.isActive);

module.exports.addTransaction = (userId, amount, items = []) => {
  const user = users.find(u => u.id === userId);
  const pointsEarned = Math.floor((amount / 1000) * user.multiplier);
  const newTx = { id: transactions.length + 1, userId, amount, pointsEarned, date: new Date().toISOString(), items, type: 'shopping' };
  transactions.push(newTx);
  user.points += pointsEarned;
  user.totalTransactions += 1;
  user.totalSpent += amount;
  return { transaction: newTx, user, tierUp: false, newTier: null };
};
"""

files["backend/src/controllers/authController.js"] = """const data = require('../data');
exports.getUsers = (req, res) => res.json({ success: true, data: data.users });
exports.getUserById = (req, res) => res.json({ success: true, data: data.findUserById(parseInt(req.params.id)) });
exports.getUserByReferral = (req, res) => res.json({ success: true, data: null });
"""

files["backend/src/controllers/memberController.js"] = """const data = require('../data');
exports.getProfile = (req, res) => {
  const user = data.findUserById(parseInt(req.query.userId));
  res.json({ success: true, data: { user, recentTransactions: data.getUserTransactions(user.id).slice(-5) } });
};
exports.getReferralCode = (req, res) => res.json({ success: true, data: {} });
exports.getTierInfo = (req, res) => res.json({ success: true, data: data.tiers });
"""

files["backend/src/controllers/transactionController.js"] = """const data = require('../data');
exports.addTransaction = (req, res) => {
  const { userId, amount } = req.body;
  const result = data.addTransaction(parseInt(userId), amount);
  res.json({ success: true, data: result });
};
exports.getTransactionHistory = (req, res) => res.json({ success: true, data: data.getUserTransactions(parseInt(req.query.userId)) });
exports.getPointSummary = (req, res) => res.json({ success: true, data: {} });
"""

files["backend/src/controllers/missionController.js"] = """const data = require('../data');
exports.getActiveMissions = (req, res) => res.json({ success: true, data: data.getMissions() });
exports.completeMission = (req, res) => res.json({ success: true, data: {} });
"""

files["backend/src/controllers/leaderboardController.js"] = """const data = require('../data');
exports.getLeaderboard = (req, res) => res.json({ success: true, data: data.getLeaderboard() });
exports.getRTDetail = (req, res) => res.json({ success: true, data: {} });
exports.getUserRTPosition = (req, res) => res.json({ success: true, data: {} });
"""

files["backend/src/controllers/productController.js"] = "exports.getProducts = (req, res) => res.json({success: true}); exports.getProductById = (req, res) => res.json({success: true});"
files["backend/src/controllers/shuController.js"] = "exports.getSHUData = (req, res) => res.json({success:true}); exports.getUserSHU = (req, res) => res.json({success:true});"

files["backend/src/routes/index.js"] = """const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const memberController = require('../controllers/memberController');
const transactionController = require('../controllers/transactionController');
const missionController = require('../controllers/missionController');
const leaderboardController = require('../controllers/leaderboardController');
const productController = require('../controllers/productController');
const shuController = require('../controllers/shuController');

router.get('/users', authController.getUsers);
router.get('/user/:id', authController.getUserById);
router.get('/profile', memberController.getProfile);
router.post('/transaction', transactionController.addTransaction);
router.get('/transactions', transactionController.getTransactionHistory);
router.get('/missions', missionController.getActiveMissions);
router.post('/mission/complete', missionController.completeMission);
router.get('/leaderboard', leaderboardController.getLeaderboard);

module.exports = router;
"""

files["backend/src/app.js"] = """const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const routes = require('./routes');
app.use('/api', routes);

app.get('/', (req, res) => res.json({ name: 'SocengKOP API', status: 'Running' }));

app.listen(PORT, () => {
  console.log(`🚀 SocengKOP Backend running on http://localhost:${PORT}`);
});
"""

files["backend/README.md"] = "# SocengKOP Backend API"

for path, content in files.items():
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        f.write(content)
    print(f"Created {path}")

