// src/middlewares/rateLimitMiddleware.js

const { RateLimiterMemory } = require("rate-limiter-flexible");

// Configure rate limiting
const rateLimiter = new RateLimiterMemory({
    points: 10, // Maximum number of requests
    duration: 1, // Per second
});

/**
 * Middleware to enforce rate limiting.
 */
const rateLimitMiddleware = (req, res, next) => {
    rateLimiter
        .consume(req.ip) // Use IP address as the key
        .then(() => {
            next(); // Allow request to proceed
        })
        .catch(() => {
            res.status(429).json({
                message: "Too many requests. Please try again later.",
            });
        });
};

module.exports = rateLimitMiddleware;