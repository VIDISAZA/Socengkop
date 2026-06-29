const data = require('../data');

// GET semua user (untuk login)
exports.getUsers = (req, res) => {
    try {
        const users = data.users.map(u => ({
            id: u.id,
            name: u.name,
            phone: u.phone,
            rt: u.rt,
            points: u.points,
            tier: u.tier,
            tierName: u.tierName,
            avatar: u.avatar,
            referralCode: u.referralCode
        }));

        res.json({
            success: true,
            data: users,
            message: 'Data user berhasil diambil'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan: ' + error.message
        });
    }
};

// GET detail user by ID
exports.getUserById = (req, res) => {
    try {
        const { id } = req.params;
        const user = data.findUserById(parseInt(id));

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User tidak ditemukan'
            });
        }

        // Hitung progress ke tier berikutnya
        const currentTier = data.tiers.find(t => t.level === user.tier);
        const nextTier = data.tiers.find(t => t.level === user.tier + 1);

        let progress = 100;
        let nextTierName = null;
        let nextTierPoints = null;

        if (nextTier) {
            const pointsInCurrentTier = user.points - currentTier.minPoints;
            const pointsNeeded = nextTier.minPoints - currentTier.minPoints;
            progress = Math.min(100, Math.floor((pointsInCurrentTier / pointsNeeded) * 100));
            nextTierName = nextTier.name;
            nextTierPoints = nextTier.minPoints;
        }

        res.json({
            success: true,
            data: {
                ...user,
                progress,
                nextTierName,
                nextTierPoints,
                currentTierInfo: currentTier
            },
            message: 'Data user berhasil diambil'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan: ' + error.message
        });
    }
};

// GET user by referral code
exports.getUserByReferral = (req, res) => {
    try {
        const { code } = req.params;
        const user = data.users.find(u => u.referralCode === code);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Kode referral tidak ditemukan'
            });
        }

        res.json({
            success: true,
            data: {
                id: user.id,
                name: user.name,
                rt: user.rt,
                referralCode: user.referralCode
            },
            message: 'Data referral berhasil diambil'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan: ' + error.message
        });
    }
};
