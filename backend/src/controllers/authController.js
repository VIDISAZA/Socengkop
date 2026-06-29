const data = require('../data');
exports.getUsers = (req, res) => res.json({ success: true, data: data.users });
exports.getUserById = (req, res) => res.json({ success: true, data: data.findUserById(parseInt(req.params.id)) });
exports.getUserByReferral = (req, res) => res.json({ success: true, data: null });
