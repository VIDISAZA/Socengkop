const data = require('../data');

// GET daftar misi aktif
exports.getActiveMissions = (req, res) => {
    try {
        const missions = data.getMissions();

        res.json({
            success: true,
            data: missions,
            message: 'Data misi berhasil diambil'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan: ' + error.message
        });
    }
};

// POST selesaikan misi
exports.completeMission = (req, res) => {
    try {
        const { userId, missionId } = req.body;

        if (!userId || !missionId) {
            return res.status(400).json({
                success: false,
                message: 'userId dan missionId diperlukan'
            });
        }

        const result = data.completeMission(userId, missionId);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'User atau misi tidak ditemukan, atau misi tidak aktif'
            });
        }

        res.json({
            success: true,
            data: {
                mission: result.mission,
                pointsEarned: result.pointsEarned,
                user: {
                    id: result.user.id,
                    name: result.user.name,
                    points: result.user.points,
                    tier: result.user.tier,
                    tierName: result.user.tierName
                },
                tierUp: result.tierUp,
                newTier: result.newTier
            },
            message: `Misi "${result.mission.title}" berhasil diselesaikan! +${result.pointsEarned} poin 🎉`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan: ' + error.message
        });
    }
};
