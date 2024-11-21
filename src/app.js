const express = require('express');
const cors = require('cors');
const articleRoutes = require('./routes/articleRoutes');
const quizRoutes = require('./routes/quizRoutes');
const rateLimitMiddleware = require('./middlewares/rateLimitMiddleware');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON payloads

// Apply Rate Limiting to specific routes
app.use('/api/quizzes', rateLimitMiddleware);

// Routes
app.use('/api/articles', articleRoutes);
app.use('/api/quizzes', quizRoutes);

// Health and Readiness Endpoints
app.get('/health', (req, res) => res.status(200).send('Healthy'));
app.get('/ready', async (req, res) => {
  try {
    // Add readiness checks, like database connectivity
    res.status(200).send('Ready');
  } catch {
    res.status(503).send('Not Ready');
  }
});

// Global Error Handler
app.use(errorMiddleware);

module.exports = app;
