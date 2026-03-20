const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ msg: "No token, access denied" });
    }

    // Handle Bearer token format
    if (token.startsWith('Bearer ')) {
      token = token.slice(7);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; 
    next();

  } catch (error) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = authMiddleware;