const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  // Get token from Authorization header
  const token = req.headers.authorization?.split(" ")[1]; 
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, "secretkey"); 
    req.userId = decoded.id; // <-- attach userId to request
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = auth;
