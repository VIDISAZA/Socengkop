const data = require('../data');

// GET profile user
exports.getProfile = (req, res) => {
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
        const recentTransactions = transactions.slice(-5).reverse();

        res.json({
            success: true,
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    phone: user.phone,
                    rt: user.rt,
                    rw: user.rw,
                    points: user.points,
                    tier: user.tier,
                    tierName: user.tierName,
                    multiplier: user.multiplier,
                    joinDate: user.joinDate,
                    referralCode: user.referralCode,
                    referredBy: user.referredBy,
                    missionsCompleted: user.missionsCompleted,
                    totalTransactions: user.totalTransactions,
                    totalSpent: user.totalSpent
                },
                recentTransactions
            },
            message: 'Profile berhasil diambil'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan: ' + error.message
        });
    }
};

// GET referral code
exports.getReferralCode = (req, res) => {
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

        res.json({
            success: true,
            data: {
                referralCode: user.referralCode,
                name: user.name,
                rt: user.rt
            },
            message: 'Kode referral berhasil diambil'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan: ' + error.message
        });
    }
};

// GET tier info
exports.getTierInfo = (req, res) => {
    try {
        const tiers = data.tiers;

        res.json({
            success: true,
            data: tiers,
            message: 'Data tier berhasil diambil'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan: ' + error.message
        });
    }
};
