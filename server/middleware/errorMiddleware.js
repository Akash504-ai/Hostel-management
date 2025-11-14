/**
 * @desc  Middleware for handling 404 Not Found errors
 */
const notFound = (req, res, next) => {
  const error = new Error(`❌ Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * @desc  Global error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  // Prevent sending 200 if error exists
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    // Stack trace only in development
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
    // Optionally, include the route for easier debugging
    path: req.originalUrl,
  });

  // Optional: Log server-side errors in the console
  if (process.env.NODE_ENV !== "production") {
    console.error(`🚨 Error: ${err.message}\nPath: ${req.originalUrl}`);
  }
};

export { notFound, errorHandler };
