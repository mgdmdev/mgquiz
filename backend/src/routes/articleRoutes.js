const express = require('express');
const { getArticles, createArticle } = require('../controllers/articleController');

const router = express.Router();

// Route to fetch all articles
router.get('/', getArticles);

// Route to create a new article
router.post('/', createArticle);

module.exports = router;
