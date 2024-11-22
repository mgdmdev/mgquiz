// src/controllers/articleController.js

const Article = require("../models/Article");
const cacheService = require("../services/cacheService");

/**
 * Get all articles.
 * @route GET /api/articles
 */
exports.getAllArticles = async (req, res, next) => {
    try {
        const cachedArticles = cacheService.get("articles");
        if (cachedArticles) {
            return res.status(200).json(cachedArticles);
        }

        const articles = await Article.find();
        cacheService.set("articles", articles);

        res.status(200).json(articles);
    } catch (error) {
        console.error("Error fetching articles:", error.message);
        next(error);
    }
};

/**
 * Get a single article by ID.
 * @route GET /api/articles/:id
 */
exports.getArticleById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const cachedArticle = cacheService.get(id);
        if (cachedArticle) {
            return res.status(200).json(cachedArticle);
        }

        const article = await Article.findById(id);
        if (!article) {
            return res.status(404).json({ message: "Article not found." });
        }

        cacheService.set(id, article);

        res.status(200).json(article);
    } catch (error) {
        console.error("Error fetching article by ID:", error.message);
        next(error);
    }
};

/**
 * Create a new article.
 * @route POST /api/articles
 */
exports.createArticle = async (req, res, next) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required." });
        }

        const newArticle = new Article({ title, content });
        const savedArticle = await newArticle.save();

        // Clear cache for articles list to reflect the new addition
        cacheService.delete("articles");

        res.status(201).json(savedArticle);
    } catch (error) {
        console.error("Error creating article:", error.message);
        next(error);
    }
};

/**
 * Update an article by ID.
 * @route PUT /api/articles/:id
 */
exports.updateArticle = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        if (!title && !content) {
            return res.status(400).json({ message: "At least one field (title or content) is required." });
        }

        const updatedArticle = await Article.findByIdAndUpdate(
            id,
            { title, content },
            { new: true, runValidators: true }
        );

        if (!updatedArticle) {
            return res.status(404).json({ message: "Article not found." });
        }

        // Update the cache
        cacheService.set(id, updatedArticle);
        cacheService.delete("articles");

        res.status(200).json(updatedArticle);
    } catch (error) {
        console.error("Error updating article:", error.message);
        next(error);
    }
};

/**
 * Delete an article by ID.
 * @route DELETE /api/articles/:id
 */
exports.deleteArticle = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedArticle = await Article.findByIdAndDelete(id);
        if (!deletedArticle) {
            return res.status(404).json({ message: "Article not found." });
        }

        // Clear cache
        cacheService.delete(id);
        cacheService.delete("articles");

        res.status(200).json({ message: "Article deleted successfully." });
    } catch (error) {
        console.error("Error deleting article:", error.message);
        next(error);
    }
};