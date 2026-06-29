const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
const routes = require('./routes');
app.use('/api', routes);

// Root route
app.get('/', (req, res) => {
    res.json({
        name: 'SocengKOP API',
        version: '1.0.0',
        status: 'Running',
        endpoints: {
            users: '/api/users',
            profile: '/api/profile?userId=1',
            transactions: '/api/transactions?userId=1',
            missions: '/api/missions',
            leaderboard: '/api/leaderboard',
            products: '/api/products',
            shu: '/api/shu'
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint tidak ditemukan'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server: ' + err.message
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 SocengKOP Backend running on http://localhost:${PORT}`);
    console.log(`📊 API Documentation: http://localhost:${PORT}/`);
    console.log(`👥 Users: http://localhost:${PORT}/api/users`);
    console.log(`🏆 Leaderboard: http://localhost:${PORT}/api/leaderboard`);
});
