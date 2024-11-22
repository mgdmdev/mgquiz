// src/models/Article.js

const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        content: {
            type: String,
            required: [true, "Content is required"],
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
        },
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    }
);

// Middleware to update the `updatedAt` field
ArticleSchema.pre("save", function (next) {
    if (this.isModified("content") || this.isModified("title")) {
        this.updatedAt = Date.now();
    }
    next();
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;