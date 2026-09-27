const protectedUserRoute = async (req, res, next) => {
  if (req.user.flag === "member" || req.user.flag === "admin") {
    return next();
  }
  res.redirect("/");
};

module.exports = protectedUserRoute;
