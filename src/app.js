// src/app.js

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const rateLimitMiddleware = require("./middlewares/rateLimitMiddleware");
const errorMiddleware = require("./middlewares/errorMiddleware");
const quizRoutes = require("./routes/quizRoutes");
const articleRoutes = require("./routes/articleRoutes");

const app = express();

// Middleware
app.use(morgan("combined")); // HTTP request logging
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(helmet()); // Add security headers
app.use(express.json()); // Parse JSON request bodies
app.use(rateLimitMiddleware); // Apply rate limiting

// Routes
app.use("/api/articles", articleRoutes); // Article-related routes
app.use("/api/quizzes", quizRoutes); // Quiz-related routes

// Health Check Endpoints
app.get("/health", (req, res) => res.status(200).json({ status: "healthy" }));
app.get("/ready", (req, res) => res.status(200).json({ status: "ready" }));

// Error Handling Middleware
app.use(errorMiddleware);

module.exports = app;