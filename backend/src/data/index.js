// Data Master - Gabungan Semua Data
const tenant = require('./tenant');
const users = require('./users');
const transactions = require('./transactions');
const missions = require('./missions');
const leaderboard = require('./leaderboard');
const tiers = require('./tiers');
const products = require('./products');
const shu = require('./shu');

// Export gabungan
module.exports = {
    tenant,
    users,
    transactions,
    missions,
    leaderboard,
    tiers,
    products,
    shu
};

// ========== HELPER FUNCTIONS ==========

// Cari user berdasarkan ID
module.exports.findUserById = (id) => {
    return users.find(u => u.id === id);
};

// Cari user berdasarkan nomor HP
module.exports.findUserByPhone = (phone) => {
    return users.find(u => u.phone === phone);
};

// Dapatkan transaksi user
module.exports.getUserTransactions = (userId) => {
    return transactions.filter(t => t.userId === userId);
};

// Dapatkan poin user
module.exports.getUserPoints = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? user.points : 0;
};

// Dapatkan leaderboard RT
module.exports.getLeaderboard = () => {
    return [...leaderboard].sort((a, b) => a.totalPoints - b.totalPoints);
};

// Dapatkan misi aktif
module.exports.getMissions = () => {
    return missions.filter(m => m.isActive);
};

// Hitung poin dari transaksi
module.exports.calculatePoints = (amount, multiplier) => {
    return Math.floor((amount / 1000) * multiplier);
};

// Update poin user dan cek kenaikan tier
module.exports.updateUserPoints = (userId, points) => {
    const user = users.find(u => u.id === userId);
    if (!user) return null;

    user.points += points;

    // Cek apakah naik tier
    const newTier = tiers.find(t => user.points >= t.minPoints && user.points <= t.maxPoints);
    if (newTier && newTier.level > user.tier) {
        user.tier = newTier.level;
        user.tierName = newTier.name;
        user.multiplier = newTier.multiplier;
        return { user, tierUp: true, newTier };
    }

    return { user, tierUp: false };
};

// Tambah transaksi
module.exports.addTransaction = (userId, amount, items = [], type = 'shopping', note = '') => {
    const user = users.find(u => u.id === userId);
    if (!user) return null;

    const pointsEarned = module.exports.calculatePoints(amount, user.multiplier);

    const newTransaction = {
        id: transactions.length + 1,
        userId,
        amount,
        pointsEarned,
        date: new Date().toISOString(),
        items,
        type,
        note
    };

    transactions.push(newTransaction);

    // Update poin user
    const result = module.exports.updateUserPoints(userId, pointsEarned);

    return {
        transaction: newTransaction,
        user: result.user,
        tierUp: result.tierUp,
        newTier: result.newTier
    };
};

// Selesaikan misi
module.exports.completeMission = (userId, missionId) => {
    const user = users.find(u => u.id === userId);
    const mission = missions.find(m => m.id === missionId);

    if (!user || !mission || !mission.isActive) return null;

    const pointsEarned = mission.reward;
    const result = module.exports.updateUserPoints(userId, pointsEarned);

    // Catat misi selesai
    user.missionsCompleted = (user.missionsCompleted || 0) + 1;

    // Tambah transaksi misi
    const newTransaction = {
        id: transactions.length + 1,
        userId,
        amount: 0,
        pointsEarned,
        date: new Date().toISOString(),
        items: [],
        type: 'mission',
        note: `Menyelesaikan misi: ${mission.title}`
    };

    transactions.push(newTransaction);

    return {
        mission: mission,
        pointsEarned,
        user: result.user,
        tierUp: result.tierUp,
        newTier: result.newTier
    };
};
