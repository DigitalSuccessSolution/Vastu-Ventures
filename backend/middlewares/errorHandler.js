import env from "../config/env.js";

/**
 * Centralized error-handling middleware.
 * Catches all errors and sends consistent { success, message, errors } response.
 */
const errorHandler = (err, req, res, _next) => {
  let statusCode = err.statusCode || 500;
  
  if (statusCode >= 500) {
    console.error("Backend Error:", err);
  } else {
    console.warn(`[${statusCode}] ${err.message}`);
  }

  // Extract Razorpay error message if present
  let message = err.message || "Internal Server Error";
  if (err.error && err.error.description) {
    message = `Razorpay Error: ${err.error.description} (Check your .env API keys)`;
  }
  
  let errors = null;

  // Mongoose validation error
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";
    errors = Object.values(err.errors).map((e) => e.message);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue).join(", ");
    message = `Duplicate value for: ${field}`;
  }

  // Mongoose cast error (invalid ObjectId)
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }
  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  // Multer errors
  if (err.name === "MulterError") {
    statusCode = 400;
    message = err.message;
  }

  const response = { success: false, message };
  if (errors) response.errors = errors;
  if (env.NODE_ENV === "development") response.stack = err.stack;

  res.status(statusCode).json(response);
};

export default errorHandler;
