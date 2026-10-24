const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const bookingRoutes = require('./routes/bookingRoutes');
const menuRoutes = require('./routes/menuRoutes');
const { testConnection } = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const allowedOrigins = [process.env.FRONTEND_URL].filter(Boolean);

if (process.env.NODE_ENV !== 'production') {
  allowedOrigins.push('http://localhost:5173', 'http://127.0.0.1:5173');
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      const error = new Error('Origin not allowed by CORS.');
      error.status = 403;
      callback(error);
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '10kb' }));

app.get('/api/health', async (req, res) => {
  try {
    await testConnection();
    return res.json({
      success: true,
      server: 'ok',
      database: 'connected',
    });
  } catch (error) {
    console.error('Database health check failed:', error);
    return res.status(503).json({
      success: false,
      server: 'ok',
      database: 'disconnected',
      message: 'Database connection failed',
    });
  }
});

app.use('/api', bookingRoutes);
app.use('/api', menuRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use(errorHandler);

module.exports = app;
