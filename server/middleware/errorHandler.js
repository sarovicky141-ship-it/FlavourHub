const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  const status = error.status || error.statusCode || 500;
  const message =
    status >= 500 ? 'Internal server error.' : error.message || 'Request failed.';

  if (status >= 500) {
    console.error(error);
  }

  return res.status(status).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;
