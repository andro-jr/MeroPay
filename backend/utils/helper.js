exports.sendError = (res, error, statusCode = 401) => {
  res.status(statusCode).json({ error });
};

exports.handleNotFound = (req, res) => {
  this.sendError(res, 'Not Found', 404);
};
