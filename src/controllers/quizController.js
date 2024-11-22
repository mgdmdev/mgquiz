const mongoose = require("mongoose");
const { Quiz } = require("../models/Quiz");
const { Article } = require("../models/Article");
const openaiService = require("../services/openaiService");
const cacheService = require("../services/cacheService");

exports.generateQuiz = async (req, res) => {
    try {
        const { articleId, difficulty, numQuestions } = req.body;

        // Validate `articleId`
        if (!mongoose.Types.ObjectId.isValid(articleId)) {
            return res.status(400).json({
                message: "Invalid articleId format. Must be a valid MongoDB ObjectId.",
            });
        }

        // Check if the article exists
        const article = await Article.findById(articleId);
        if (!article) {
            return res.status(404).json({ message: "Article not found." });
        }

        // Check cache for an existing quiz
        const cachedQuiz = await cacheService.getQuizFromCache(articleId, difficulty, numQuestions);
        if (cachedQuiz) {
            return res.status(200).json({
                success: true,
                quiz: cachedQuiz,
                message: "Quiz served from cache.",
            });
        }

        // Generate a new quiz using OpenAI
        const quizData = await openaiService.generateQuiz({
            content: article.content,
            difficulty,
            numQuestions,
        });

        if (!quizData || quizData.length === 0) {
            return res.status(500).json({
                message: "Failed to generate quiz. OpenAI returned no data.",
            });
        }

        // Save the quiz to the database
        const newQuiz = new Quiz({
            articleId,
            questions: quizData,
            difficulty,
            createdAt: new Date(),
        });
        await newQuiz.save();

        // Cache the generated quiz
        await cacheService.saveQuizToCache(articleId, difficulty, numQuestions, quizData);

        // Return the generated quiz
        res.status(201).json({
            success: true,
            quiz: quizData,
            message: "Quiz generated successfully.",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "An unexpected error occurred while generating the quiz.",
        });
    }
};

exports.getQuizByArticleId = async (req, res) => {
    try {
        const { articleId } = req.params;

        // Validate `articleId`
        if (!mongoose.Types.ObjectId.isValid(articleId)) {
            return res.status(400).json({
                message: "Invalid articleId format. Must be a valid MongoDB ObjectId.",
            });
        }

        // Fetch quiz from the database
        const quiz = await Quiz.findOne({ articleId });
        if (!quiz) {
            return res.status(404).json({
                message: "No quiz found for the given articleId.",
            });
        }

        res.status(200).json({
            success: true,
            quiz,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "An unexpected error occurred while fetching the quiz.",
        });
    }
};

exports.getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            quizzes,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "An unexpected error occurred while fetching quizzes.",
        });
    }
};
