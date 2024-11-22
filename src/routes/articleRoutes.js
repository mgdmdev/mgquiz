// src/routes/articleRoutes.js

const express = require("express");
const articleController = require("../controllers/articleController");

const router = express.Router();

// Routes for articles
router.get("/", articleController.getAllArticles); // Get all articles
router.get("/:id", articleController.getArticleById); // Get a single article by ID
router.post("/", articleController.createArticle); // Create a new article
router.put("/:id", articleController.updateArticle); // Update an article by ID
router.delete("/:id", articleController.deleteArticle); // Delete an article by ID

module.exports = router;