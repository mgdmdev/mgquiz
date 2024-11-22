// src/models/Quiz.js

const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema(
    {
        articleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Article",
            required: [true, "Associated article ID is required"],
        },
        difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"],
            required: [true, "Difficulty level is required"],
        },
        questions: [
            {
                question: {
                    type: String,
                    required: [true, "Question text is required"],
                },
                options: {
                    type: [String],
                    validate: {
                        validator: function (val) {
                            return val.length === 4; // Ensure exactly 4 options
                        },
                        message: "Each question must have exactly 4 options.",
                    },
                    required: [true, "Options are required"],
                },
                answer: {
                    type: String,
                    required: [true, "Correct answer is required"],
                },
            },
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
    }
);

const Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = Quiz;