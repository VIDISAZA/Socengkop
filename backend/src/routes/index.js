const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const memberController = require('../controllers/memberController');
const transactionController = require('../controllers/transactionController');
const missionController = require('../controllers/missionController');
const leaderboardController = require('../controllers/leaderboardController');
const productController = require('../controllers/productController');
const shuController = require('../controllers/shuController');

router.get('/users', authController.getUsers);
router.get('/user/:id', authController.getUserById);
router.get('/profile', memberController.getProfile);
router.post('/transaction', transactionController.addTransaction);
router.get('/transactions', transactionController.getTransactionHistory);
router.get('/missions', missionController.getActiveMissions);
router.post('/mission/complete', missionController.completeMission);
router.get('/leaderboard', leaderboardController.getLeaderboard);

module.exports = router;
