const express = require("express");
const { generateQuiz, getAllQuizzes, getQuizById, deleteQuiz } = require("../controllers/quizController");

const router = express.Router();

// Route to generate a quiz
router.post("/generate", generateQuiz);

// Route to get all quizzes
router.get("/", getAllQuizzes);

// Route to get a quiz by ID
router.get("/:id", getQuizById);

// Route to delete a quiz by ID
router.delete("/:id", deleteQuiz);

module.exports = router;
