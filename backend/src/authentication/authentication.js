const jwt = require("jsonwebtoken");

const ROLE = {
  ADMIN: "admin",
  USER: "user",
};

const verifyToken = (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    console.log("No token provided");
    return res
      .status(401)
      .json({ message: "Unauthorized: You need to log in first" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.json({ message: "Token not verified please login again." });
    }
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
    };
    next();
  });
};

function authRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(401).json({ message: "Not allowed" });
    }
    next();
  };
}

module.exports = {
  authRole,
  isAuthenticated: verifyToken,
};
