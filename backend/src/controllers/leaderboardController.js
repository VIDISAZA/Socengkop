const data = require('../data');

// GET leaderboard RT
exports.getLeaderboard = (req, res) => {
    try {
        const leaderboard = data.getLeaderboard();

        // Tambahkan rank
        const ranked = leaderboard.map((item, index) => ({
            ...item,
            rank: index + 1,
            icon: ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'][index] || '🏅'
        }));

        res.json({
            success: true,
            data: ranked,
            message: 'Leaderboard berhasil diambil'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan: ' + error.message
        });
    }
};

// GET detail RT tertentu
exports.getRTDetail = (req, res) => {
    try {
        const { rt } = req.params;

        // Cari leaderboard untuk RT tersebut
        const leaderboardItem = data.leaderboard.find(l => l.rt === rt);

        if (!leaderboardItem) {
            return res.status(404).json({
                success: false,
                message: 'RT tidak ditemukan'
            });
        }

        // Cari anggota di RT tersebut
        const members = data.users.filter(u => u.rt === rt);

        res.json({
            success: true,
            data: {
                rt: leaderboardItem.rt,
                rw: leaderboardItem.rw,
                totalPoints: leaderboardItem.totalPoints,
                memberCount: leaderboardItem.memberCount,
                rank: leaderboardItem.rank,
                icon: leaderboardItem.icon,
                members: members.map(m => ({
                    id: m.id,
                    name: m.name,
                    points: m.points,
                    tier: m.tier,
                    tierName: m.tierName
                }))
            },
            message: 'Data RT berhasil diambil'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan: ' + error.message
        });
    }
};

// GET posisi RT user
exports.getUserRTPosition = (req, res) => {
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

        const leaderboard = data.getLeaderboard();
        const userRT = leaderboard.find(l => l.rt === user.rt);

        if (!userRT) {
            return res.status(404).json({
                success: false,
                message: 'RT user tidak ditemukan di leaderboard'
            });
        }

        res.json({
            success: true,
            data: {
                rt: userRT.rt,
                rw: userRT.rw,
                totalPoints: userRT.totalPoints,
                rank: userRT.rank,
                icon: userRT.icon,
                memberCount: userRT.memberCount,
                change: userRT.change || '0'
            },
            message: 'Posisi RT berhasil diambil'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan: ' + error.message
        });
    }
};
