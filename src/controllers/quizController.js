// src/controllers/quizController.js

const cacheService = require("../services/cacheService");
const openaiService = require("../services/openaiService");
const Quiz = require("../models/Quiz");

/**
 * Generate a quiz for a given article.
 * @route POST /api/quizzes/generate
 */
exports.generateQuiz = async (req, res, next) => {
    try {
        const { articleId, difficulty, numQuestions } = req.body;

        if (!articleId || !difficulty || !numQuestions) {
            return res.status(400).json({ message: "Missing required fields: articleId, difficulty, numQuestions." });
        }

        // Check if quiz is already cached
        const cachedQuiz = cacheService.get(articleId);
        if (cachedQuiz) {
            return res.status(200).json(cachedQuiz);
        }

        // Check if quiz already exists in the database
        const existingQuiz = await Quiz.findOne({ articleId, difficulty });
        if (existingQuiz) {
            cacheService.set(articleId, existingQuiz);
            return res.status(200).json(existingQuiz);
        }

        // Generate a new quiz using OpenAI
        const articleContent = "Placeholder article content"; // Replace with actual article content fetch logic
        const quizData = await openaiService.generateQuiz({
            content: articleContent,
            difficulty,
            numQuestions,
        });

        if (!quizData || quizData.length === 0) {
            return res.status(500).json({ message: "Failed to generate quiz." });
        }

        // Save the quiz in the database
        const newQuiz = new Quiz({
            articleId,
            difficulty,
            questions: quizData,
        });

        const savedQuiz = await newQuiz.save();

        // Cache the new quiz
        cacheService.set(articleId, savedQuiz);

        res.status(201).json(savedQuiz);
    } catch (error) {
        console.error("Error generating quiz:", error.message);
        next(error);
    }
};

/**
 * Get all quizzes.
 * @route GET /api/quizzes
 */
exports.getAllQuizzes = async (req, res, next) => {
    try {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch (error) {
        console.error("Error fetching quizzes:", error.message);
        next(error);
    }
};

/**
 * Get a specific quiz by ID.
 * @route GET /api/quizzes/:id
 */
exports.getQuizById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const cachedQuiz = cacheService.get(id);
        if (cachedQuiz) {
            return res.status(200).json(cachedQuiz);
        }

        const quiz = await Quiz.findById(id);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found." });
        }

        cacheService.set(id, quiz);
        res.status(200).json(quiz);
    } catch (error) {
        console.error("Error fetching quiz by ID:", error.message);
        next(error);
    }
};

/**
 * Delete a quiz by ID.
 * @route DELETE /api/quizzes/:id
 */
exports.deleteQuiz = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedQuiz = await Quiz.findByIdAndDelete(id);
        if (!deletedQuiz) {
            return res.status(404).json({ message: "Quiz not found." });
        }

        // Clear cache for this quiz
        cacheService.delete(id);

        res.status(200).json({ message: "Quiz deleted successfully." });
    } catch (error) {
        console.error("Error deleting quiz:", error.message);
        next(error);
    }
};