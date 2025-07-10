module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    // User is logged in
    return next();
  } else {
    // Not authenticated
    return res.status(401).json({ message: "Not authorized. Please login." });
  }
};
