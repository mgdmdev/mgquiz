/**
 * Error handling middleware for Express.
 * @param {Error} err - The error object.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function.
 */
const errorMiddleware = (err, req, res, next) => {
    console.error(`Error: ${err.message}`);
  
    const statusCode = err.statusCode || 500;
    const response = {
      message: err.message || 'Internal Server Error',
    };
  
    if (process.env.NODE_ENV === 'development') {
      response.stack = err.stack;
    }
  
    res.status(statusCode).json(response);
  };
  
  module.exports = errorMiddleware;
  