const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const rateLimitMiddleware = require("./middlewares/rateLimitMiddleware");
const errorMiddleware = require("./middlewares/errorMiddleware");
const quizRoutes = require("./routes/quizRoutes");
const articleRoutes = require("./routes/articleRoutes");

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON requests
app.use(morgan("dev")); // Log HTTP requests
app.use(rateLimitMiddleware); // Apply rate limiting middleware

// Health Check Endpoints
app.get("/health", (req, res) => {
    res.status(200).json({ status: "Healthy" });
});

app.get("/ready", (req, res) => {
    res.status(200).json({ status: "Ready" });
});

// Routes
app.use("/api/quizzes", quizRoutes); // Quiz-related routes
app.use("/api/articles", articleRoutes); // Article-related routes

// Error Middleware (for unhandled routes and errors)
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found." });
});
app.use(errorMiddleware);

module.exports = app;