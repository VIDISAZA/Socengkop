const data = require('../data');

// POST tambah transaksi belanja
exports.addTransaction = (req, res) => {
    try {
        const { userId, amount, items = [] } = req.body;

        if (!userId || !amount || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: 'userId dan amount (minimal 1) diperlukan'
            });
        }

        const user = data.findUserById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User tidak ditemukan'
            });
        }

        const result = data.addTransaction(userId, amount, items);

        // Update total transaksi user
        user.totalTransactions = (user.totalTransactions || 0) + 1;
        user.totalSpent = (user.totalSpent || 0) + amount;

        res.json({
            success: true,
            data: {
                transaction: result.transaction,
                user: {
                    id: result.user.id,
                    name: result.user.name,
                    points: result.user.points,
                    tier: result.user.tier,
                    tierName: result.user.tierName,
                    multiplier: result.user.multiplier
                },
                tierUp: result.tierUp,
                newTier: result.newTier
            },
            message: 'Transaksi berhasil ditambahkan! 🎉'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan: ' + error.message
        });
    }
};

// GET riwayat transaksi user
exports.getTransactionHistory = (req, res) => {
    try {
        const userId = parseInt(req.query.userId);
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'Parameter userId diperlukan'
            });
        }

        const transactions = data.getUserTransactions(userId);

        // Urutkan dari yang terbaru
        const sorted = [...transactions].sort((a, b) =>
            new Date(b.date) - new Date(a.date)
        );

        res.json({
            success: true,
            data: sorted,
            message: 'Riwayat transaksi berhasil diambil'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan: ' + error.message
        });
    }
};

// GET ringkasan poin user
exports.getPointSummary = (req, res) => {
    try {
        const userId = parseInt(req.query.userId);
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'Parameter userId diperlukan'
            });
        }

        const user = data.findUserById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User tidak ditemukan'
            });
        }

        const transactions = data.getUserTransactions(userId);
        const shoppingTransactions = transactions.filter(t => t.type === 'shopping');
        const missionTransactions = transactions.filter(t => t.type === 'mission');
        const referralTransactions = transactions.filter(t => t.type === 'referral');

        const totalShopping = shoppingTransactions.reduce((sum, t) => sum + t.amount, 0);
        const totalPointsFromShopping = shoppingTransactions.reduce((sum, t) => sum + t.pointsEarned, 0);
        const totalPointsFromMissions = missionTransactions.reduce((sum, t) => sum + t.pointsEarned, 0);
        const totalPointsFromReferral = referralTransactions.reduce((sum, t) => sum + t.pointsEarned, 0);

        res.json({
            success: true,
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    totalPoints: user.points,
                    tier: user.tier,
                    tierName: user.tierName
                },
                summary: {
                    totalTransactions: transactions.length,
                    totalShopping: totalShopping,
                    totalPointsFromShopping,
                    totalPointsFromMissions,
                    totalPointsFromReferral,
                    missionsCompleted: user.missionsCompleted || 0
                }
            },
            message: 'Ringkasan poin berhasil diambil'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan: ' + error.message
        });
    }
};
