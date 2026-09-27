const protectedUserRoute = async (req, res, next) => {
  if (req.user.flag === "user" || req.user.flag === "admin") {
    return next();
  }
  res.redirect("/");
};

module.exports = protectedUserRoute;
