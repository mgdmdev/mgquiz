const Quiz = require("../models/Quiz");
const Article = require("../models/Article");
const openaiService = require("../services/openaiService");
const cacheService = require("../services/cacheService"); // In-memory cache service

/**
 * Generate a quiz for an article
 * @route POST /api/quizzes/generate
 */
const generateQuiz = async (req, res) => {
    try {
        const { articleId, difficulty, numQuestions } = req.body;

        // Validate required fields
        if (!articleId || !difficulty || !numQuestions) {
            return res.status(400).json({
                message: "All fields (articleId, difficulty, numQuestions) are required.",
            });
        }

        // Validate difficulty level
        const validDifficulties = ["easy", "medium", "hard"];
        if (!validDifficulties.includes(difficulty.toLowerCase())) {
            return res.status(400).json({
                message: `Invalid difficulty level. Choose one of: ${validDifficulties.join(", ")}.`,
            });
        }

        // Check in-memory cache first
        const cacheKey = `${articleId}-${difficulty}`;
        const cachedQuiz = cacheService.get(cacheKey);
        if (cachedQuiz) {
            console.log(`Cache hit for key: ${cacheKey}`);
            return res.status(200).json(cachedQuiz);
        }

        // Validate article existence
        const article = await Article.findById(articleId);
        if (!article) {
            return res.status(404).json({
                message: "Article not found.",
            });
        }

        // Check database for cached quiz
        const dbCachedQuiz = await Quiz.findOne({ articleId, difficulty }).lean();
        if (dbCachedQuiz) {
            console.log(`Database cache hit for articleId: ${articleId}, difficulty: ${difficulty}`);
            cacheService.set(cacheKey, dbCachedQuiz); // Update in-memory cache
            return res.status(200).json(dbCachedQuiz);
        }

        // Generate a new quiz using OpenAI
        const quizData = await openaiService.generateQuiz(article.content, difficulty, numQuestions);

        // Save the generated quiz to the database
        const newQuiz = await Quiz.create({
            articleId,
            difficulty,
            questions: quizData,
        });

        // Cache the newly generated quiz in memory
        cacheService.set(cacheKey, newQuiz);

        return res.status(201).json(newQuiz);
    } catch (error) {
        console.error("Error generating quiz:", error.message || error.stack);
        res.status(500).json({
            message: "Failed to generate quiz. Please try again later.",
        });
    }
};