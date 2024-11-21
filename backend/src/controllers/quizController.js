const Quiz = require('../models/Quiz');
const { generateQuiz } = require('../services/openaiService');
const { sendWebhook } = require('../services/webhookService');

/**
 * Create a quiz for a specific article.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function.
 */
const createQuiz = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const { content, numQuestions = 3, difficulty = 'medium' } = req.body;

    // Check if a quiz already exists for the article
    const existingQuiz = await Quiz.findOne({ articleId });
    if (existingQuiz) {
      return res.status(200).json(existingQuiz);
    }

    // Generate a quiz using OpenAI
    const quizQuestions = await generateQuiz(content, { numQuestions, difficulty });

    // Save the new quiz to the database
    const newQuiz = new Quiz({ articleId, questions: quizQuestions });
    await newQuiz.save();

    // Send webhook notification if configured
    const webhookUrl = process.env.WORDPRESS_WEBHOOK_URL;
    const webhookSecret = process.env.WEBHOOK_SECRET;
    if (webhookUrl) {
      const payload = {
        articleId,
        quizId: newQuiz._id,
        questions: quizQuestions,
      };
      await sendWebhook(webhookUrl, payload, webhookSecret);
    }

    res.status(201).json(newQuiz);
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieve all quizzes.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function.
 */
const getAllQuizzes = async (req, res, next) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieve a single quiz by ID.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function.
 */
const getQuizById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      const error = new Error('Quiz not found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(quiz);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createQuiz,
  getAllQuizzes,
  getQuizById,
};
