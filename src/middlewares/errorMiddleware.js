// src/middlewares/errorMiddleware.js

/**
 * Error-handling middleware for Express.
 * Catches errors and returns a structured JSON response.
 */
const errorMiddleware = (err, req, res, next) => {
  console.error("Error:", err.message);

  // Determine the appropriate status code
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
      message: err.message || "An unexpected error occurred.",
      stack: process.env.NODE_ENV === "production" ? null : err.stack, // Hide stack trace in production
  });
};

module.exports = errorMiddleware;