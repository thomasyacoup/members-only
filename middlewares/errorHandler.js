const errorHandler = (err, req, res, next) => {
  const error = {
    status: err.status || 500,
    msg: err.message || "Internal Server Error",
  };
  res.render("error", { error });
};

module.exports = errorHandler;
