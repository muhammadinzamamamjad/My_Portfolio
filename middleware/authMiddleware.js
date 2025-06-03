const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send("Access denied");

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch {
    res.status(400).send("Invalid token");
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).send("Admins only");
  next();
};
