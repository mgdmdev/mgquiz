const Article = require('../models/Article');

/**
 * Create a new article.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function.
 */
const createArticle = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    // Validate input
    if (!title || !content) {
      const error = new Error('Title and content are required.');
      error.statusCode = 400;
      throw error;
    }

    // Create and save the article
    const newArticle = new Article({ title, content });
    await newArticle.save();

    res.status(201).json(newArticle);
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieve all articles.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function.
 */
const getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 }); // Sort by most recent
    res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieve a single article by ID.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function.
 */
const getArticleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const article = await Article.findById(id);

    if (!article) {
      const error = new Error('Article not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(article);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createArticle,
  getArticles,
  getArticleById,
};
