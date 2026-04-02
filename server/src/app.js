const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const { errorHandler } = require('./middleware/errorHandler');

const scoreRoutes = require('./routes/scoreRoutes');
const sessionRoutes = require('./routes/sessionRoutes');

const app = express();

// Middleware
app.use(helmet({
    contentSecurityPolicy: false, // Ease CSP for React's inline styles/scripts in production
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API Routes
app.use('/api/scores', scoreRoutes);
app.use('/api/sessions', sessionRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'API is healthy' });
});

// Production Static Serving
if (process.env.NODE_ENV === 'production' || true) { // Defaulting to true for assignment ease
    const clientDistPath = path.join(__dirname, '../../client/dist');
    app.use(express.static(clientDistPath));

    // CATCH-ALL: Fixes the "reload" issue by sending index.html for all non-API routes
    app.get('*', (req, res) => {
        // Exclude /api routes from catch-all just in case
        if (!req.url.startsWith('/api')) {
            res.sendFile(path.join(clientDistPath, 'index.html'));
        }
    });
}

// Error handling middleware
app.use(errorHandler);

module.exports = app;
