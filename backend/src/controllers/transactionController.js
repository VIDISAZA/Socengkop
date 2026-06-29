const data = require('../data');
exports.addTransaction = (req, res) => {
  const { userId, amount } = req.body;
  const result = data.addTransaction(parseInt(userId), amount);
  res.json({ success: true, data: result });
};
exports.getTransactionHistory = (req, res) => res.json({ success: true, data: data.getUserTransactions(parseInt(req.query.userId)) });
exports.getPointSummary = (req, res) => res.json({ success: true, data: {} });
