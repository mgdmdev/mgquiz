const express = require('express');
const { createQuiz } = require('../controllers/quizController');
const rateLimitMiddleware = require('../middlewares/rateLimitMiddleware');

const router = express.Router();

// Route to create a new quiz for an article
router.post('/:articleId', rateLimitMiddleware, createQuiz);

module.exports = router;
