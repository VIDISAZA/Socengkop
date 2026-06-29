const data = require('../data');
exports.getProfile = (req, res) => {
  const user = data.findUserById(parseInt(req.query.userId));
  res.json({ success: true, data: { user, recentTransactions: data.getUserTransactions(user.id).slice(-5) } });
};
exports.getReferralCode = (req, res) => res.json({ success: true, data: {} });
exports.getTierInfo = (req, res) => res.json({ success: true, data: data.tiers });
