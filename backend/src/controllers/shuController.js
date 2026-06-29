const data = require('../data');

// GET data SHU
exports.getSHUData = (req, res) => {
    try {
        const shu = data.shu;

        res.json({
            success: true,
            data: shu,
            message: 'Data SHU berhasil diambil'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan: ' + error.message
        });
    }
};

// GET perhitungan SHU untuk user tertentu
exports.getUserSHU = (req, res) => {
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

        const shu = data.shu;
        const userBonus = shu.memberBonus.find(b => b.userId === userId);

        if (!userBonus) {
            return res.status(404).json({
                success: false,
                message: 'Data SHU untuk user tidak ditemukan'
            });
        }

        res.json({
            success: true,
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    points: user.points,
                    tier: user.tier,
                    tierName: user.tierName
                },
                shu: {
                    year: shu.year,
                    totalSHU: shu.totalSHU,
                    distribution: shu.distribution,
                    weight: userBonus.weight,
                    shuAmount: userBonus.shuAmount,
                    rank: userBonus.rank
                }
            },
            message: 'Data SHU user berhasil diambil'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan: ' + error.message
        });
    }
};
