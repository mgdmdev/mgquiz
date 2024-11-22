// src/routes/quizRoutes.js

const express = require("express");
const quizController = require("../controllers/quizController");

const router = express.Router();

// Routes for quizzes
router.get("/", quizController.getAllQuizzes); // Get all quizzes
router.get("/:id", quizController.getQuizById); // Get a specific quiz by ID
router.post("/generate", quizController.generateQuiz); // Generate a new quiz for an article
router.delete("/:id", quizController.deleteQuiz); // Delete a specific quiz by ID

module.exports = router;
