const tenant = require('./tenant');
const users = require('./users');
const transactions = require('./transactions');
const missions = require('./missions');
const leaderboard = require('./leaderboard');
const tiers = require('./tiers');

module.exports = { tenant, users, transactions, missions, leaderboard, tiers };

module.exports.findUserById = (id) => users.find(u => u.id === id);
module.exports.getUserTransactions = (userId) => transactions.filter(t => t.userId === userId);
module.exports.getLeaderboard = () => [...leaderboard].sort((a, b) => b.totalPoints - a.totalPoints);
module.exports.getMissions = () => missions.filter(m => m.isActive);

module.exports.addTransaction = (userId, amount, items = []) => {
  const user = users.find(u => u.id === userId);
  const pointsEarned = Math.floor((amount / 1000) * user.multiplier);
  const newTx = { id: transactions.length + 1, userId, amount, pointsEarned, date: new Date().toISOString(), items, type: 'shopping' };
  transactions.push(newTx);
  user.points += pointsEarned;
  user.totalTransactions += 1;
  user.totalSpent += amount;
  return { transaction: newTx, user, tierUp: false, newTier: null };
};
