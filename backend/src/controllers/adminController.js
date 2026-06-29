const users = require('../data/users');
const transactions = require('../data/transactions');
const missions = require('../data/missions');
const leaderboard = require('../data/leaderboard');
const supplyChain = require('../data/supplyChain');

// Get supply chain status
exports.getSupplyChain = (req, res) => {
    try {
        res.json({
            success: true,
            data: supplyChain
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Financial flow dashboard details
exports.getFinancials = (req, res) => {
    try {
        // Calculate incoming revenues
        const incoming = transactions
            .filter(t => t.type === 'shopping')
            .reduce((sum, t) => sum + t.amount, 0);

        // Simulated expenses/outgoings (paying farmers/producers, logistics, etc)
        const outgoing = incoming * 0.65; // Simulated 65% of revenue goes to costs
        const profit = incoming - outgoing;
        
        // SHU reserve (typically 40% of cooperative profit)
        const shuAllocated = profit * 0.40;

        res.json({
            success: true,
            data: {
                incoming,
                outgoing,
                profit,
                shuAllocated,
                transactionCount: transactions.length,
                history: transactions
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Participation metrics
exports.getParticipation = (req, res) => {
    try {
        const activeUsersCount = users.filter(u => u.points > 0).length;
        const totalMissionsCompleted = users.reduce((sum, u) => sum + (u.missionsCompleted || 0), 0);
        
        res.json({
            success: true,
            data: {
                totalMembers: users.length,
                activeMembers: activeUsersCount,
                missionsCompleted: totalMissionsCompleted,
                leaderboard
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Check for point expiration (30 days inactivity rule)
// If no transaction has been done in the last 30 mock days (since 2026-06-29), expire points
exports.checkPointExpiry = (req, res) => {
    try {
        const { userId } = req.body;
        const user = users.find(u => u.id === Number(userId));
        if (!user) {
            return res.status(404).json({ success: false, message: 'User tidak ditemukan' });
        }

        // Get user's last transaction
        const userTxs = transactions.filter(t => t.userId === user.id);
        if (userTxs.length === 0) {
            return res.json({ success: true, expired: false, message: 'Anggota belum memiliki transaksi' });
        }

        // Sort by date descending
        userTxs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        const lastTxDate = new Date(userTxs[0].date);
        
        // Simulated current time: 2026-06-29
        const simulatedNow = new Date("2026-06-29T21:00:00");
        const diffTime = Math.abs(simulatedNow.getTime() - lastTxDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Threshold of 30 days inactivity
        if (diffDays > 30 && user.points > 0) {
            const oldPoints = user.points;
            user.points = 0; // Expired
            user.tier = 1;
            user.tierName = 'Pandu Srawung';
            user.multiplier = 1.0;

            // Log point expiration transaction
            transactions.push({
                id: transactions.length + 1,
                userId: user.id,
                amount: 0,
                pointsEarned: -oldPoints,
                date: simulatedNow.toISOString(),
                type: 'shopping', // categorize as shopping/adjustment to show in history
                note: `Poin hangus otomatis karena tidak aktif selama ${diffDays} hari`
            });

            return res.json({
                success: true,
                expired: true,
                expiredPoints: oldPoints,
                user
            });
        }

        res.json({
            success: true,
            expired: false,
            message: `User aktif. Transaksi terakhir ${diffDays} hari yang lalu`
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Simulate Supply Chain advancement
exports.simulateSupplyChain = (req, res) => {
    try {
        const { id } = req.body;
        const item = supplyChain.find(p => p.id === Number(id));
        if (!item) return res.status(404).json({ success: false, message: "Produk tidak ditemukan" });

        const currentStatus = item.status;
        let nextStatus = currentStatus;

        if (currentStatus === "petani") {
            nextStatus = "koperasi";
            item.steps[1].completed = true;
            item.steps[1].date = new Date().toISOString();
        } else if (currentStatus === "koperasi") {
            nextStatus = "pasar";
            item.steps[2].completed = true;
            item.steps[2].date = new Date().toISOString();
        } else if (currentStatus === "pasar") {
            // reset cycle for demo
            nextStatus = "petani";
            item.steps[1].completed = false;
            item.steps[2].completed = false;
            item.steps[0].date = new Date().toISOString();
        }

        item.status = nextStatus;
        item.lastUpdate = new Date().toISOString();

        res.json({ success: true, data: supplyChain });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Simulate Financial Transactions (custom sales/expenses)
exports.simulateFinancial = (req, res) => {
    try {
        const { amount, type, note } = req.body;
        const parsedAmount = Number(amount);

        const newTx = {
            id: transactions.length + 1,
            userId: 1, // Default user
            amount: parsedAmount,
            pointsEarned: Math.floor(parsedAmount / 1000),
            date: new Date().toISOString(),
            type: type || 'shopping',
            note: note || 'Simulasi Transaksi'
        };

        transactions.push(newTx);
        res.json({ success: true, message: "Simulasi transaksi berhasil ditambahkan" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Simulate Member Participation (complete random mission)
exports.simulateParticipation = (req, res) => {
    try {
        const { userId, missionId } = req.body;
        const user = users.find(u => u.id === Number(userId));
        const mission = missions.find(m => m.id === Number(missionId));

        if (!user || !mission) {
            return res.status(404).json({ success: false, message: "User atau Misi tidak ditemukan" });
        }

        user.points += mission.reward;
        user.missionsCompleted = (user.missionsCompleted || 0) + 1;

        // Add transaction entry
        transactions.push({
            id: transactions.length + 1,
            userId: user.id,
            amount: 0,
            pointsEarned: mission.reward,
            date: new Date().toISOString(),
            type: 'mission',
            note: `[Simulasi] Menyelesaikan misi: ${mission.title}`
        });

        // Recalculate leaderboard points for this user's RT
        const rtEntry = leaderboard.find(l => l.rt === user.rt);
        if (rtEntry) {
            rtEntry.totalPoints += mission.reward;
        }

        res.json({ success: true, message: `Simulasi: ${user.name} menyelesaikan misi ${mission.title}` });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
