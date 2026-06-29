const data = require('../data');
exports.getLeaderboard = (req, res) => res.json({ success: true, data: data.getLeaderboard() });
exports.getRTDetail = (req, res) => res.json({ success: true, data: {} });
exports.getUserRTPosition = (req, res) => res.json({ success: true, data: {} });
