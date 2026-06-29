const data = require('../data');
exports.getActiveMissions = (req, res) => res.json({ success: true, data: data.getMissions() });
exports.completeMission = (req, res) => res.json({ success: true, data: {} });
