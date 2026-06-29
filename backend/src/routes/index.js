const express = require('express');
const router = express.Router();

// Import controllers
const authController = require('../controllers/authController');
const memberController = require('../controllers/memberController');
const transactionController = require('../controllers/transactionController');
const missionController = require('../controllers/missionController');
const leaderboardController = require('../controllers/leaderboardController');
const productController = require('../controllers/productController');
const shuController = require('../controllers/shuController');

// ============ AUTH ROUTES ============
router.get('/users', authController.getUsers);
router.get('/user/:id', authController.getUserById);
router.get('/referral/:code', authController.getUserByReferral);

// ============ MEMBER ROUTES ============
router.get('/profile', memberController.getProfile);
router.get('/referral-code', memberController.getReferralCode);
router.get('/tiers', memberController.getTierInfo);

// ============ TRANSACTION ROUTES ============
router.post('/transaction', transactionController.addTransaction);
router.get('/transactions', transactionController.getTransactionHistory);
router.get('/points-summary', transactionController.getPointSummary);

// ============ MISSION ROUTES ============
router.get('/missions', missionController.getActiveMissions);
router.post('/mission/complete', missionController.completeMission);

// ============ LEADERBOARD ROUTES ============
router.get('/leaderboard', leaderboardController.getLeaderboard);
router.get('/leaderboard/rt/:rt', leaderboardController.getRTDetail);
router.get('/leaderboard/position', leaderboardController.getUserRTPosition);

// ============ PRODUCT ROUTES ============
router.get('/products', productController.getProducts);
router.get('/product/:id', productController.getProductById);

// ============ SHU ROUTES ============
router.get('/shu', shuController.getSHUData);
router.get('/shu/user', shuController.getUserSHU);

module.exports = router;
